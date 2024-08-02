/** @typedef {import("hast").Root} Root */
/** @typedef {import("mdast-util-mdx-jsx")} */
/** @typedef {import("mdast-util-mdx-jsx").MdxJsxAttribute} MdxJsxAttribute */
/** @typedef {import("mdast-util-mdx-jsx").MdxJsxFlowElementHast} MdxJsxFlowElementHast */
/** @typedef {import("mdast-util-mdx-jsx").MdxJsxTextElementHast} MdxJsxTextElementHast */

import { SKIP, visit } from "unist-util-visit";

export function withFootnotes() {
	return function transformer(/** @type {Root} */ tree) {
		let count = 1;

		/** @type {MdxJsxTextElementHast[]} */
		const footnotes = [];

		visit(tree, "mdxJsxTextElement", (node, index, parent) => {
			if (node.name !== "Footnote") return undefined;

			/** @type {MdxJsxAttribute} */
			const countAttribute = {
				type: "mdxJsxAttribute",
				name: "count",
				value: String(count),
			};

			/** @type {MdxJsxTextElementHast} */
			const reference = {
				type: "mdxJsxTextElement",
				name: "FootnoteReference",
				attributes: [countAttribute],
				children: [],
			};

			/** @type {MdxJsxTextElementHast} */
			const content = {
				type: "mdxJsxTextElement",
				name: "FootnoteContent",
				attributes: [countAttribute],
				children: node.children,
			};

			// @ts-expect-error Parent node exists.
			parent.children.splice(index, 1, reference);
			footnotes.push(content);

			count++;

			return SKIP;
		});

		if (footnotes.length > 0) {
			/** @type {MdxJsxFlowElementHast} */
			const section = {
				type: "mdxJsxFlowElement",
				name: "FootnotesSection",
				attributes: [],
				children: footnotes,
			};

			tree.children.push(section);
		}
	};
}
