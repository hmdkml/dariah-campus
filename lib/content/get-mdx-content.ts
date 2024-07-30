import "server-only"

import { run } from "@mdx-js/mdx";
import type { MDXModule } from "mdx/types";
import { cache } from "react";
import * as runtime from "react/jsx-runtime";

import type { Locale } from "@/config/i18n.config";
import { createMdxProcessor } from "@/lib/content/create-mdx-processor";
import { useMDXComponents } from "@/mdx-components";

export const getMdxContent = cache(async function getMdxContent(code: string, locale: Locale): Promise<MDXModule> {
	const processor = await createMdxProcessor(locale);
	const file = await processor.process(code);

	// @ts-expect-error Upstream type issue.
	return run(file, { ...runtime, useMDXComponents });
});
