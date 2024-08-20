import { fields, singleton } from "@keystatic/core";

import { createAssetPaths } from "@/lib/content/create-asset-paths";
import { createSingletonPaths } from "@/lib/content/create-paths";
import { createPreviewUrl } from "@/lib/content/create-preview-url";
import { createSingleton } from "@/lib/content/create-singleton";
import { twitterHandle } from "@/lib/content/validation";

const videoProviders = [{ label: "YouTube", value: "youtube" }] as const;

export const indexPage = createSingleton((locale) => {
	const { assetPath, contentPath } = createSingletonPaths("/index-page/", locale);

	return singleton({
		label: "Home page",
		path: contentPath,
		format: { data: "json" },
		previewUrl: createPreviewUrl("/"),
		entryLayout: "form",
		schema: {
			hero: fields.object(
				{
					title: fields.text({
						label: "Title",
						validation: { isRequired: true },
					}),
					lead: fields.text({
						label: "Lead in",
						validation: { isRequired: true },
						multiline: true,
					}),
					image: fields.image({
						label: "Image",
						validation: { isRequired: true },
						...createAssetPaths(assetPath),
					}),
				},
				{
					label: "Hero section",
				},
			),
			browse: fields.object(
				{
					title: fields.text({
						label: "Title",
						validation: { isRequired: true },
					}),
					lead: fields.text({
						label: "Lead in",
						validation: { isRequired: true },
					}),
					cards: fields.array(
						fields.object(
							{
								title: fields.text({
									label: "Title",
									validation: { isRequired: true },
								}),
								subtitle: fields.text({
									label: "Subtitle",
									validation: { isRequired: true },
								}),
								image: fields.image({
									label: "Image",
									validation: { isRequired: true },
									...createAssetPaths(assetPath),
								}),
								href: fields.url({
									label: "URL",
									validation: { isRequired: true },
								}),
							},
							{
								label: "Card",
							},
						),
						{
							label: "Cards",
							itemLabel(props) {
								return props.fields.title.value;
							},
							validation: { length: { min: 1 } },
						},
					),
				},
				{
					label: "Browse section",
				},
			),
			support: fields.object(
				{
					title: fields.text({
						label: "Title",
						validation: { isRequired: true },
					}),
					lead: fields.text({
						label: "Lead in",
						validation: { isRequired: true },
					}),
					cards: fields.array(
						fields.object(
							{
								title: fields.text({
									label: "Title",
									validation: { isRequired: true },
								}),
								subtitle: fields.text({
									label: "Subtitle",
									validation: { isRequired: true },
								}),
								image: fields.image({
									label: "Image",
									validation: { isRequired: true },
									...createAssetPaths(assetPath),
								}),
								video: fields.object(
									{
										provider: fields.select({
											label: "Provider",
											options: videoProviders,
											defaultValue: "youtube",
										}),
										id: fields.text({
											label: "Video identifier",
											validation: { isRequired: true },
										}),
									},
									{
										label: "Video",
									},
								),
							},
							{
								label: "Card",
							},
						),
						{
							label: "Cards",
							itemLabel(props) {
								return props.fields.title.value;
							},
							validation: { length: { min: 1 } },
						},
					),
				},
				{
					label: "Support section",
				},
			),
			faq: fields.object(
				{
					title: fields.text({
						label: "Title",
						validation: { isRequired: true },
					}),
					lead: fields.text({
						label: "Lead in",
						validation: { isRequired: true },
					}),
					entries: fields.array(
						fields.object(
							{
								question: fields.text({
									label: "Question",
									validation: { isRequired: true },
								}),
								answer: fields.mdx({
									label: "Answer",
									// validation: { isRequired: true }
								}),
							},
							{
								label: "Entry",
							},
						),
						{
							label: "Entries",
							itemLabel(props) {
								return props.fields.question.value;
							},
							validation: { length: { min: 1 } },
						},
					),
				},
				{
					label: "FAQ section",
				},
			),
			videos: fields.object(
				{
					title: fields.text({
						label: "Title",
						validation: { isRequired: true },
					}),
					lead: fields.text({
						label: "Lead in",
						validation: { isRequired: true },
					}),
					cards: fields.array(
						fields.object(
							{
								title: fields.text({
									label: "Title",
									validation: { isRequired: true },
								}),
								subtitle: fields.text({
									label: "Subtitle",
									validation: { isRequired: true },
								}),
								image: fields.image({
									label: "Image",
									validation: { isRequired: true },
									...createAssetPaths(assetPath),
								}),
								video: fields.object(
									{
										provider: fields.select({
											label: "Provider",
											options: videoProviders,
											defaultValue: "youtube",
										}),
										id: fields.text({
											label: "Video identifier",
											validation: { isRequired: true },
										}),
									},
									{
										label: "Video",
									},
								),
							},
							{
								label: "Card",
							},
						),
						{
							label: "Cards",
							itemLabel(props) {
								return props.fields.title.value;
							},
							validation: { length: { min: 1 } },
						},
					),
				},
				{
					label: "Videos section",
				},
			),
			team: fields.object(
				{
					title: fields.text({
						label: "Title",
						validation: { isRequired: true },
					}),
					lead: fields.text({
						label: "Lead in",
						validation: { isRequired: true },
					}),
					members: fields.array(
						fields.object(
							{
								person: fields.relationship({
									label: "Person",
									validation: { isRequired: true },
									collection: "people",
								}),
								role: fields.text({
									label: "Role",
									validation: { isRequired: true },
								}),
							},
							{
								label: "Team member",
							},
						),
						{
							label: "Team members",
							itemLabel(props) {
								return props.fields.person.value ?? "Unknown";
							},
							validation: { length: { min: 1 } },
						},
					),
				},
				{
					label: "Team section",
				},
			),
		},
	});
});

export const metadata = createSingleton((locale) => {
	const { contentPath } = createSingletonPaths("/metadata/", locale);

	return singleton({
		label: "Metadata",
		path: contentPath,
		format: { data: "json" },
		entryLayout: "form",
		schema: {
			title: fields.text({
				label: "Title",
				validation: { isRequired: true },
			}),
			description: fields.text({
				label: "Description",
				validation: { isRequired: true },
			}),
			twitter: fields.object(
				{
					creator: fields.text({
						label: "Creator",
						validation: { isRequired: true, pattern: twitterHandle },
					}),
					site: fields.text({
						label: "Site",
						validation: { isRequired: true, pattern: twitterHandle },
					}),
				},
				{
					label: "Twitter",
				},
			),
			manifest: fields.object(
				{
					name: fields.text({
						label: "Name",
						validation: { isRequired: true },
					}),
					"short-name": fields.text({
						label: "Short name",
						validation: { isRequired: true },
					}),
					description: fields.text({
						label: "Description",
						validation: { isRequired: true },
					}),
				},
				{
					label: "Webmanifest",
				},
			),
		},
	});
});

const links = {
	link: fields.object(
		{
			label: fields.text({
				label: "Label",
				validation: { isRequired: true },
			}),
			href: fields.url({
				label: "URL",
				validation: { isRequired: true },
			}),
		},
		{
			label: "Link",
		},
	),
	page: fields.object(
		{
			label: fields.text({
				label: "Label",
				validation: { isRequired: true },
			}),
			id: fields.relationship({
				label: "Page",
				validation: { isRequired: true },
				collection: "pages",
			}),
		},
		{
			label: "Page",
		},
	),
	separator: fields.empty(),
};

export const navigation = createSingleton((locale) => {
	const { contentPath } = createSingletonPaths("/navigation/", locale);

	return singleton({
		label: "Navigation",
		path: contentPath,
		format: { data: "json" },
		entryLayout: "form",
		schema: {
			links: fields.blocks(
				{
					link: {
						label: "Link",
						itemLabel(props) {
							return `${props.fields.label.value} (Link)`;
						},
						schema: links.link,
					},
					separator: {
						label: "Separator",
						schema: links.separator,
					},
					menu: {
						label: "Menu",
						itemLabel(props) {
							return `${props.fields.label.value} (Menu)`;
						},
						schema: fields.object(
							{
								label: fields.text({
									label: "Label",
									validation: { isRequired: true },
								}),
								links: fields.blocks(
									{
										link: {
											label: "Link",
											itemLabel(props) {
												return props.fields.label.value;
											},
											schema: links.link,
										},
										separator: {
											label: "Separator",
											schema: links.separator,
										},
									},
									{
										label: "Links",
										validation: { length: { min: 1 } },
									},
								),
							},
							{
								label: "Menu",
							},
						),
					},
				},
				{
					label: "Links",
					validation: { length: { min: 1 } },
				},
			),
		},
	});
});
