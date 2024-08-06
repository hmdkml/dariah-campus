/** @typedef {import("@mdx-js/mdx").CompileOptions} CompileOptions */
/** @typedef {import("hast").ElementContent} ElementContent */
/** @typedef {import("retext-smartypants").Options} TypographicOptions */
/** @typedef {import("@/config/i18n.config.js").Locale} Locale */

// import "server-only";

import withSyntaxHighlighter from "@shikijs/rehype";
import { getTranslations } from "next-intl/server";
import withHeadingIds from "rehype-slug";
import withFrontmatter from "remark-frontmatter";
import withGfm from "remark-gfm";
import withMdxFrontmatter from "remark-mdx-frontmatter";
import withTypographicQuotes from "remark-smartypants";

import { withCustomHeadingIds } from "../lib/content/with-custom-heading-ids.js";
import { withFootnotes } from "../lib/content/with-footnotes.js";
import { withImageImports } from "../lib/content/with-image-imports.js";
import {
	withMdxTableOfContents,
	withTableOfContents,
} from "../lib/content/with-table-of-contents.js";
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
	// const locale = await getLocale()
	const t = await getTranslations();

	/** @type {CompileOptions} */
	const config = {
		remarkPlugins: [
			withFrontmatter,
			withMdxFrontmatter,
			withGfm,
			withFootnotes,
			[withTypographicQuotes, typography[locale]],
		],
		remarkRehypeOptions: {
			/** @see https://github.com/syntax-tree/mdast-util-to-hast/blob/13.0.0/lib/footer.js#L81 */
			footnoteBackContent(_, rereferenceIndex) {
				/** @type {Array<ElementContent>} */
				const result = [{ type: "text", value: "↩" }];

				if (rereferenceIndex > 1) {
					result.push({
						type: "element",
						tagName: "sup",
						properties: {},
						children: [{ type: "text", value: String(rereferenceIndex) }],
					});
				}

				return result;
			},
			/** @see https://github.com/syntax-tree/mdast-util-to-hast/blob/13.0.0/lib/footer.js#L108 */
			footnoteBackLabel(referenceIndex, rereferenceIndex) {
				return t("mdx.footnoteBackLabel", {
					reference:
						String(referenceIndex + 1) +
						(rereferenceIndex > 1 ? `-${String(rereferenceIndex)}` : ""),
				});
			},
			footnoteLabel: t("mdx.footnotes"),
			footnoteLabelProperties: { className: ["sr-only"] },
			footnoteLabelTagName: "h2",
		},
		rehypePlugins: [
			withCustomHeadingIds,
			withHeadingIds,
			withTableOfContents,
			withMdxTableOfContents,
			[withSyntaxHighlighter, syntaxHighlighterConfig],
			withImageImports,
		],
	};

	return Promise.resolve(config);
}
