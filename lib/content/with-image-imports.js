/** @typedef {import("estree").ImportDeclaration} ImportDeclaration */
/** @typedef {import("estree").Program} Program */
/** @typedef {import("hast").Root} Root */
/** @typedef {import("mdast-util-mdx-jsx")} */

import { join } from "node:path/posix";

import { visit } from "unist-util-visit";

const publicPath = "@/public/";

export function withImageImports() {
	return function transformer(/** @type {Root} */ tree) {
		/** @type {Array<string>} */
		const paths = [];

		visit(tree, (node) => {
			function getImagePath() {
				let src = null;

				if (node.type === "element" && node.tagName === "img") {
					src = node.properties.src;
				}

				if (node.type === "mdxJsxFlowElement" && node.name === "Figure") {
					src = node.attributes.find((attribute) => {
						return attribute.type === "mdxJsxAttribute" && attribute.name === "src";
					})?.value;
				}

				if (typeof src === "string") {
					if (src.startsWith("/")) return join(publicPath, src);
					if (src.startsWith("./")) return src;
				}

				return null;
			}

			const path = getImagePath();

			if (path != null) {
				paths.push(path);
			}
		});

		function createName(/** @type {number} */ index) {
			return `__image${String(index)}`;
		}

		tree.children.unshift({
			type: "mdxjsEsm",
			value: paths
				.map((path, index) => {
					return `import ${createName(index)} from "${path}";`;
				})
				.join("\n"),
			data: {
				estree: createProgram(
					paths.map((path, index) => {
						return createImportDeclaration(createName(index), path);
					}),
				),
			},
		});
	};
}

function createProgram(/** @type {Program["body"]} */ body) {
	/** @type {Program} */
	const tree = {
		type: "Program",
		sourceType: "module",
		body,
	};

	return tree;
}

function createImportDeclaration(/** @type {string} */ name, /** @type {string} */ path) {
	/** @type {ImportDeclaration} */
	const tree = {
		type: "ImportDeclaration",
		specifiers: [
			{
				type: "ImportDefaultSpecifier",
				local: {
					type: "Identifier",
					name,
				},
			},
		],
		source: {
			type: "Literal",
			value: path,
		},
	};

	return tree;
}
