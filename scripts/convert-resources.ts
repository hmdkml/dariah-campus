import { cp, mkdir, readdir, writeFile } from "fs/promises";
import { extname, join } from "path";
import { read } from "to-vfile";
import { matter } from "vfile-matter";
import * as YAML from "yaml";

const baseFolder = join(process.cwd(), "content");
const folder = join(baseFolder, "posts");

const outputBaseFolder = join(process.cwd(), ".content");

async function createOutputFolder(type: string) {
	const outputFolder = join(outputBaseFolder, "resources", type);
	await mkdir(outputFolder, { recursive: true });
	return { outputFolder };
}

async function createAssetsFolder(type: string) {
	const assetsFolder = `/assets/content/en/resources/${type}/`;
	const assetsOutputBaseFolder = join(outputBaseFolder, "public");
	const assetsOutputFolder = join(assetsOutputBaseFolder, assetsFolder);
	await mkdir(assetsOutputFolder, { recursive: true });
	return { assetsFolder, assetsOutputFolder };
}

for (const entry of await readdir(folder, { withFileTypes: true })) {
	if (entry.isFile()) continue;

	const vfile = await read(join(folder, entry.name, "index.mdx"));
	matter(vfile, { strip: true });
	const data = vfile.data.matter as Record<string, any>;

	const title = data.title;
	const summary = {
		title: data.shortTitle,
		content: data.abstract,
	};
	const locale = data.lang;
	const publicationDate = data.date;
	const version = data.version;
	const authors = data.authors;
	const editors = data.editors;
	const contributors = data.contributors;
	const tags = data.tags;
	const sources = data.categories; // FIXME: multiple?
	const domain = data.domain;
	const targetGroup = data.targetGroup;
	const contentType = ["event", "pathfinder"].includes(data.type) ? undefined : data.type;
	const license = data.licence === "ccby-4.0" ? "CC BY 4.0" : data.licence;
	const tableOfContents = data.toc || false;
	let image = data.featuredImage;
	let remote;

	const type =
		"remote" in data && data.remote.date
			? "external"
			: data.categories.includes("dariah-pathfinders")
			? "pathfinders"
			: data.draft === true
			? "drafts"
			: "hosted";
	const { outputFolder } = await createOutputFolder(type);
	const { assetsOutputFolder, assetsFolder } = await createAssetsFolder(type);

	if (type === "external") {
		remote = {
			publicationDate: data.remote.date,
			url: data.remote.url,
			publisher: data.remote.publisher,
		};
	}

	if (image != null && image !== "") {
		let fileName = image.replace(/^images\//, "");
		const ext = extname(fileName);
		fileName = entry.name + "/image" + ext;
		await cp(join(folder, entry.name, image), join(assetsOutputFolder, fileName), {
			recursive: true,
			force: true,
		});
		image = assetsFolder + fileName;
	}

	const meta = Object.fromEntries(
		Object.entries({
			title,
			locale,
			publicationDate,
			version,
			authors,
			editors,
			contributors,
			tags,
			sources,
			featuredImage: image,
			license,
			tableOfContents,
			summary,
			contentType,
			remote,
		}).filter((k, v) => {
			return v != null && v !== "";
		}),
	);

	const outputPath = join(outputFolder, entry.name);
	await mkdir(outputPath, { recursive: true });

	const output = `---\n${YAML.stringify(meta)}\n---\n${String(vfile)}`;

	await writeFile(join(outputPath, "index.mdx"), output, { encoding: "utf-8" });
}
