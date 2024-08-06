import { assert } from "@acdh-oeaw/lib";
import { Client as TypesenseClient } from "typesense";

import { env } from "@/config/env.config";

export function createAdminSearchClient(): TypesenseClient {
	assert(env.NEXT_PUBLIC_TYPESENSE_URL, "Missing typesense url.");
	assert(env.TYPESENSE_API_KEY, "Missing typesense admin key.");

	const client = new TypesenseClient({
		apiKey: env.TYPESENSE_API_KEY,
		connectionTimeoutSeconds: 2,
		nodes: [{ url: env.NEXT_PUBLIC_TYPESENSE_URL }],
	});

	return client;
}
