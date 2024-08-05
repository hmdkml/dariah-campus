import type { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";

export const schema = {
	name: "dariah-campus",
	fields: [
		{ name: "title", type: "string" },
		{ name: "summary", type: "string" },
		{ name: "authors", type: "string[]", facet: true },
		{ name: "tags", type: "string[]", facet: true },
		{ name: "publication_year", type: "int32", facet: true },
	],
	default_sorting_field: "publication_year",
} satisfies CollectionCreateSchema;
