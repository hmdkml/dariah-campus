import { cp, mkdir, readdir, readFile, writeFile } from "fs/promises";
import { extname, join } from "path";
import * as YAML from "yaml";

const baseFolder = join(process.cwd(), "content");
const folder = join(baseFolder, "people");

const outputBaseFolder = join(process.cwd(), ".content");
const outputFolder = join(outputBaseFolder, "people");
await mkdir(outputFolder, { recursive: true });

const assetsFolder = "/assets/content/en/people/";
const assetsOutputBaseFolder = join(outputBaseFolder, "public");
const assetsOutputFolder = join(assetsOutputBaseFolder, assetsFolder);
await mkdir(assetsOutputFolder, { recursive: true });

for (const entry of await readdir(folder, { withFileTypes: true })) {
	if (entry.isDirectory()) continue;

	const fileContent = await readFile(join(folder, entry.name), { encoding: "utf-8" });
	const data = YAML.parse(fileContent);

	const firstName = data.firstName;
	const lastName = data.lastName;
	const name = [firstName, lastName].filter(Boolean).join(" ");
	const title = data.title;
	let image = data.avatar;
	const email = data.email;
	const orcid = data.orcid?.startsWith("https://orcid.org/")
		? data.orcid.slice("https://orcid.org/".length)
		: data.orcid;
	const website = data.website;
	const twitter = data.twitter;
	const description = data.description?.endsWith(".")
		? data.description
		: data.description?.length > 0
		? data.description + "."
		: "";

	if (image != null && image !== "") {
		let fileName = image.replace(/^images\//, "");
		const ext = extname(fileName);
		fileName = entry.name + "/image" + ext;
		await cp(join(folder, image), join(assetsOutputFolder, fileName), {
			recursive: true,
			force: true,
		});
		image = assetsFolder + fileName;
	}

	const meta = Object.entries({ name, image, orcid, email, website, twitter })
		.filter(([, value]) => value != null && value !== "")
		.map(([key, value]) => `${key}: ${value}`);
	const output = `---\n${meta.join("\n")}\n---\n${
		description.length ? description + "\n" : description
	}`;

	const outputPath = join(outputFolder, entry.name.replace(/\.ya?ml$/, ""));
	await mkdir(outputPath, { recursive: true });
	await writeFile(join(outputPath, "index.mdx"), output, { encoding: "utf-8" });
}
