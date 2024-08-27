/** @typedef {import("hast").Root} Root */
/** @typedef {import("mdast-util-mdx-jsx")} */

import { toString } from "hast-util-to-string";
import { SKIP, visit } from "unist-util-visit";

export function withIframeTitles() {
	return function transformer(/** @type {Root} */ tree) {
		const name = "_title";

		visit(tree, "mdxJsxFlowElement", (node) => {
			if (node.name == null) return undefined;

			if (!["Embed", "Video", "VideoCard"].includes(node.name)) return undefined;

			const title = node.attributes.find((attribute) => {
				return attribute.type === "mdxJsxAttribute" && attribute.name === name;
			});

			if (title != null) return undefined;

			node.attributes.push({
				type: "mdxJsxAttribute",
				name,
				value: toString(node),
			});

			return SKIP;
		});
	};
}
