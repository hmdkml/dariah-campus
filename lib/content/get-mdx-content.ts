import "server-only";

import { run } from "@mdx-js/mdx";
import type { MDXModule } from "mdx/types";
import { cache } from "react";
import * as runtime from "react/jsx-runtime";

import type { Locale } from "@/config/i18n.config";
import { createMdxProcessor } from "@/lib/content/create-mdx-processor";
import type { Toc } from "@/lib/content/with-table-of-contents";
import { useMDXComponents } from "@/mdx-components";

interface MdxContent<T extends Record<string, unknown>> extends MDXModule {
	/** Added by `remark-mdx-frontmatter`. */
	frontmatter: T;
	/** Added by `@/lib/content/with-table-of-contents`. */
	tableOfContents: Toc;
}

export const getMdxContent = cache(async function getMdxContent<T extends Record<string, unknown>>(
	code: string,
	locale: Locale,
	baseUrl: URL,
): Promise<MdxContent<T>> {
	const processor = await createMdxProcessor(locale);
	const file = await processor.process(code);

	// @ts-expect-error Upstream type issue.
	return run(file, { ...runtime, baseUrl, useMDXComponents });
});
