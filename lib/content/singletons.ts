import { fields, singleton } from "@keystatic/core";

import { createAssetPaths } from "@/lib/content/create-asset-paths";
import { createPaths } from "@/lib/content/create-paths";
import { createPreviewUrl } from "@/lib/content/create-preview-url";
import { createSingleton } from "@/lib/content/create-singleton";

const videoProviders = [{ label: "YouTube", value: "youtube" }] as const;

export const indexPage = createSingleton((locale) => {
	const { assetPath, contentPath } = createPaths("/content/index-page/", locale);

	return singleton({
		label: "Home page",
		path: contentPath,
		format: { data: "json" },
		previewUrl: createPreviewUrl("/"),
		entryLayout: "form",
		schema: {
			hero: fields.object({
				title: fields.text({
					label: "Title",
					validation: { isRequired: true },
				}),
				leadIn: fields.text({
					label: "Lead in",
					validation: { isRequired: true },
				}),
				image: fields.image({
					label: "Image",
					validation: { isRequired: true },
					...createAssetPaths(assetPath),
				}),
			}),
			browse: fields.object({
				title: fields.text({
					label: "Title",
					validation: { isRequired: true },
				}),
				leadIn: fields.text({
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
							page: fields.relationship({
								label: "Page",
								validation: { isRequired: true },
								collection: "pages",
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
					},
				),
			}),
			support: fields.object({
				title: fields.text({
					label: "Title",
					validation: { isRequired: true },
				}),
				leadIn: fields.text({
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
					},
				),
			}),
			faq: fields.object({
				title: fields.text({
					label: "Title",
					validation: { isRequired: true },
				}),
				leadIn: fields.text({
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
					},
				),
			}),
			videos: fields.object({
				title: fields.text({
					label: "Title",
					validation: { isRequired: true },
				}),
				leadIn: fields.text({
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
					},
				),
			}),
			team: fields.object({
				title: fields.text({
					label: "Title",
					validation: { isRequired: true },
				}),
				leadIn: fields.text({
					label: "Lead in",
					validation: { isRequired: true },
				}),
				members: fields.array(
					fields.object(
						{
							name: fields.text({
								label: "Name",
								validation: { isRequired: true },
							}),
							role: fields.text({
								label: "Role",
								validation: { isRequired: true },
							}),
							image: fields.image({
								label: "Image",
								validation: { isRequired: true },
								...createAssetPaths(assetPath),
							}),
						},
						{
							label: "Team member",
						},
					),
					{
						label: "Team members",
						itemLabel(props) {
							return props.fields.name.value;
						},
					},
				),
			}),
		},
	});
});

export const metadata = createSingleton((locale) => {
	const { contentPath } = createPaths("/content/metadata/", locale);

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
						validation: { isRequired: true },
					}),
					site: fields.text({
						label: "Site",
						validation: { isRequired: true },
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

export const navigation = createSingleton((locale) => {
	const { contentPath } = createPaths("/content/navigation/", locale);

	return singleton({
		label: "Navigation",
		path: contentPath,
		format: { data: "json" },
		entryLayout: "form",
		schema: {
			links: fields.array(
				fields.object(
					{
						label: fields.text({
							label: "Label",
							validation: { isRequired: true },
						}),
						page: fields.relationship({
							label: "Page",
							validation: { isRequired: true },
							collection: "pages",
						}),
					},
					{
						label: "Link",
					},
				),
				{
					label: "Links",
					itemLabel(props) {
						return props.fields.label.value;
					},
				},
			),
		},
	});
});
