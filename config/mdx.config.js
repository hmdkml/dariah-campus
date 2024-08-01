/** @typedef {import('@mdx-js/mdx').CompileOptions} CompileOptions */
/** @typedef {import('@/config/i18n.config.js').Locale} Locale */

import withSyntaxHighlighter from "@shikijs/rehype";
import withHeadingIds from "rehype-slug";
import withFrontmatter from "remark-frontmatter";
import withGfm from "remark-gfm";
import withMdxFrontmatter from "remark-mdx-frontmatter";
import withTypographicQuotes from "remark-smartypants";

import { withCustomHeadingIds } from "../lib/content/with-custom-heading-ids.js";
import { config as syntaxHighlighterConfig } from "./syntax-highlighter.config.js";

/** @type {(locale: Locale) => Promise<CompileOptions>} */
export async function createMdxConfig(_locale) {
	/** @type {CompileOptions} */
	const config = {
		remarkPlugins: [withFrontmatter, withMdxFrontmatter, withGfm, withTypographicQuotes],
		rehypePlugins: [
			withCustomHeadingIds,
			withHeadingIds,
			[withSyntaxHighlighter, syntaxHighlighterConfig],
		],
	};

	return Promise.resolve(config);
}
