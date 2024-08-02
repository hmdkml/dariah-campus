/** @typedef {import("@mdx-js/mdx").CompileOptions} CompileOptions */
/** @typedef {import("retext-smartypants").Options} TypographicOptions */
/** @typedef {import("@/config/i18n.config.js").Locale} Locale */

import withSyntaxHighlighter from "@shikijs/rehype";
import withHeadingIds from "rehype-slug";
import withFrontmatter from "remark-frontmatter";
import withGfm from "remark-gfm";
import withMdxFrontmatter from "remark-mdx-frontmatter";
import withTypographicQuotes from "remark-smartypants";

import { withCustomHeadingIds } from "../lib/content/with-custom-heading-ids.js";
import { withFootnotes } from "../lib/content/with-footnotes.js";
import { config as syntaxHighlighterConfig } from "./syntax-highlighter.config.js";

/** @type {Record<Locale, TypographicOptions>} */
const typography = {
	en: {
		openingQuotes: { double: "“", single: "‘" },
		closingQuotes: { double: "”", single: "’" },
	},
};

/** @type {(locale: Locale) => Promise<CompileOptions>} */
export async function createMdxConfig(locale) {
	/** @type {CompileOptions} */
	const config = {
		remarkPlugins: [
			withFrontmatter,
			withMdxFrontmatter,
			withGfm,
			withFootnotes,
			[withTypographicQuotes, typography[locale]],
		],
		remarkRehypeOptions: {},
		rehypePlugins: [
			withCustomHeadingIds,
			withHeadingIds,
			[withSyntaxHighlighter, syntaxHighlighterConfig],
		],
	};

	return Promise.resolve(config);
}
