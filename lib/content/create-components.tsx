import { pick } from "@acdh-oeaw/lib";
import { fields } from "@keystatic/core";
import { type ContentComponent, wrapper } from "@keystatic/core/content-components";
import { ImageIcon } from "lucide-react";

import { createAssetPaths } from "@/lib/content/create-asset-paths";

const components = {
	Figure(assetPath) {
		return wrapper({
			label: "Figure",
			description: "An image with caption.",
			icon: <ImageIcon />,
			schema: {
				src: fields.image({
					label: "Image",
					...createAssetPaths(assetPath),
					validation: { isRequired: true },
				}),
				alt: fields.text({
					label: "Image description for screen readers",
					// validation: { isRequired: false },
				}),
			},
		});
	},
} satisfies Record<string, (assetPath: `/${string}/`) => ContentComponent>;

export function createComponents(
	assetPath: `/${string}/`,
	include?: Array<keyof typeof components>,
) {
	const _components = include ? pick(components, include) : components;

	return Object.fromEntries(
		Object.entries(_components).map(([key, value]) => {
			return [key, value(assetPath)];
		}),
	);
}
