import { join } from "node:path";

import { createUrl } from "@acdh-oeaw/lib";
import { glob } from "fast-glob";
import type { MetadataRoute } from "next";

import { env } from "@/config/env.config";
import { createReader } from "@/lib/content/create-reader";

const baseUrl = env.NEXT_PUBLIC_APP_BASE_URL;

/**
 * Google supports up to 50.000 entries per sitemap file. Apps which need more that that can use
 * `generateSitemaps` to generate multiple sitemap files.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#generating-a-sitemap-using-code-js-ts
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-sitemaps
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const paths = await glob("./**/page.tsx", { cwd: join(process.cwd(), "app", "(app)") });

	const routes: Array<string> = [];

	paths.forEach((path) => {
		const route = path.slice(0, -"/page.tsx".length);

		if (route === "[...404]") return;

		const segments = [];

		for (const segment of route.split("/")) {
			/** Dynamic routes. */
			if (segment.startsWith("[") && segment.endsWith("]")) return;

			/** Route groups. */
			if (segment.startsWith("(") && segment.endsWith(")")) continue;

			segments.push(segment);
		}

		routes.push(segments.join("/"));
	});

	const entries = routes.map((pathname) => {
		return {
			url: String(createUrl({ baseUrl, pathname })),
			/**
			 * Only add `lastmod` when the publication date is actually known.
			 * Don't use the build date instead.
			 */
			// lastModified: new Date(),
		};
	});

	const reader = createReader();
	const curricula = await reader.collections.curricula.all();
	const resources = await reader.collections.resources.all();

	curricula.forEach((curriculum) => {
		const pathname = `/curricula/${curriculum.slug}`;

		entries.push({
			url: String(createUrl({ baseUrl, pathname })),
			// lastModified: new Date(curriculum.entry.publishDate),
		});
	});

	resources.forEach((resource) => {
		const pathname = `/resources/${resource.slug}`;

		entries.push({
			url: String(createUrl({ baseUrl, pathname })),
			// lastModified: new Date(resource.entry.publishDate),
		});
	});

	return entries;
}
