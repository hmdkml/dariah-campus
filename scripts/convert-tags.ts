import { mkdir, readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";
import * as YAML from "yaml";

const baseFolder = join(process.cwd(), "content");
const folder = join(baseFolder, "tags");

const outputBaseFolder = join(process.cwd(), ".content");
const outputFolder = join(outputBaseFolder, "tags");
await mkdir(outputFolder, { recursive: true });

for (const entry of await readdir(folder, { withFileTypes: true })) {
	if (entry.isDirectory()) continue;

	const fileContent = await readFile(join(folder, entry.name), { encoding: "utf-8" });
	const data = YAML.parse(fileContent);

	const name = data.name;
	const description = data.description.endsWith(".") ? data.description : data.description + ".";

	const output = `---\nname: ${name}\n---\n${description}\n`;

	const outputPath = join(outputFolder, entry.name.replace(/\.ya?ml$/, ""));
	await mkdir(outputPath, { recursive: true });
	await writeFile(join(outputPath, "index.mdx"), output, { encoding: "utf-8" });
}
