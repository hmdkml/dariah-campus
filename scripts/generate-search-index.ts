import { assert, keyByToMap, log } from "@acdh-oeaw/lib";
import { createReader } from "@keystatic/core/reader";
import { Client as TypesenseClient } from "typesense";

import { env } from "@/config/env.config";
import { schema } from "@/config/search.config";
import config from "@/keystatic.config";

async function generate() {
	assert(env.NEXT_PUBLIC_TYPESENSE_URL, "Missing typesense url.");
	assert(env.TYPESENSE_ADMIN_API_KEY, "Missing typesense admin key.");

	const client = new TypesenseClient({
		apiKey: env.TYPESENSE_ADMIN_API_KEY,
		connectionTimeoutSeconds: 2,
		nodes: [{ url: env.NEXT_PUBLIC_TYPESENSE_URL }],
	});

	await client.collections().create(schema);

	// id not exists search key, create search key

	const reader = createReader(process.cwd(), config).collections;

	function byId<T extends { slug: string }>(values: Array<T>): Map<string, T> {
		return keyByToMap(values, (value) => {
			return value.slug;
		});
	}

	const peopleById = byId(await reader.people.all({ resolveLinkedFiles: true }));
	const tagsById = byId(await reader.tags.all({ resolveLinkedFiles: true }));
	// const sourcesById = byId(await reader.sources.all({ resolveLinkedFiles: true }));

	const curricula = await reader.curricula.all({ resolveLinkedFiles: true });
	const events = await reader.events.all({ resolveLinkedFiles: true });
	const externalResources = await reader.externalResources.all({ resolveLinkedFiles: true });
	const hostedResources = await reader.hostedResources.all({ resolveLinkedFiles: true });
	const pathfinders = await reader.pathfinders.all({ resolveLinkedFiles: true });

	function createDocument(entry: {
		pathname: string;
		title: string;
		summary: string;
		authors: Array<string>;
		tags: Array<string>;
		publicationDate: string;
	}) {
		return {
			pathname: entry.pathname,
			title: entry.title,
			summary: entry.summary,
			authors: entry.authors.map((id) => {
				const person = peopleById.get(id);
				assert(person, `Unknown person "${id}".`);
				return person.entry.name;
			}),
			tags: entry.tags.map((id) => {
				const tag = tagsById.get(id);
				assert(tag, `Unknown tag "${id}".`);
				return tag.entry.name;
			}),
			publication_year: new Date(entry.publicationDate).getUTCFullYear(),
		};
	}

	for (const { entry, slug } of curricula) {
		await client
			.collections(schema.name)
			.documents()
			.create(
				createDocument({
					pathname: `/resources/curricula/${slug}`,
					title: entry.title,
					summary: entry.summary.content,
					authors: entry.editors,
					tags: entry.tags,
					publicationDate: entry.publicationDate,
				}),
			);
	}

	for (const { entry, slug } of events) {
		await client
			.collections(schema.name)
			.documents()
			.create(
				createDocument({
					pathname: `/resources/events/${slug}`,
					title: entry.title,
					summary: entry.summary.content,
					authors: entry.authors,
					tags: entry.tags,
					publicationDate: entry.publicationDate,
				}),
			);
	}

	for (const { entry, slug } of externalResources) {
		await client
			.collections(schema.name)
			.documents()
			.create(
				createDocument({
					pathname: `/resources/external/${slug}`,
					title: entry.title,
					summary: entry.summary.content,
					authors: entry.authors,
					tags: entry.tags,
					publicationDate: entry.publicationDate,
				}),
			);
	}

	for (const { entry, slug } of hostedResources) {
		await client
			.collections(schema.name)
			.documents()
			.create(
				createDocument({
					pathname: `/resources/hosted/${slug}`,
					title: entry.title,
					summary: entry.summary.content,
					authors: entry.authors,
					tags: entry.tags,
					publicationDate: entry.publicationDate,
				}),
			);
	}

	for (const { entry, slug } of pathfinders) {
		await client
			.collections(schema.name)
			.documents()
			.create(
				createDocument({
					pathname: `/resources/pathfinders/${slug}`,
					title: entry.title,
					summary: entry.summary.content,
					authors: entry.authors,
					tags: entry.tags,
					publicationDate: entry.publicationDate,
				}),
			);
	}
}

generate()
	.then(() => {
		log.success("Successfully generated search index.");
	})
	.catch((error: unknown) => {
		log.error("Failed to generate search index.\n", String(error));
	});
