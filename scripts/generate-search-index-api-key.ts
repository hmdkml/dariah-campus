import { log } from "@acdh-oeaw/lib";

import { schema } from "@/config/search.config";
import { createAdminSearchClient } from "@/lib/search/create-admin-search-client";

async function generate() {
	const client = createAdminSearchClient();

	const key = await client.keys().create({
		description: "DARIAH-Campus",
		actions: ["documents:search"],
		collections: [schema.name],
	});

	return key;
}

generate()
	.then((key) => {
		log.success("Successfully generated api key for search index.\n", key);
	})
	.catch((error: unknown) => {
		log.error("Failed to generate api key for search index.\n", String(error));
	});
