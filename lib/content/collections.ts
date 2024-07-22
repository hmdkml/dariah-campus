import { collection, fields } from "@keystatic/core";

import { createAssetPaths } from "@/lib/content/create-asset-paths";
import { createCollection } from "@/lib/content/create-collection";
import { createComponents } from "@/lib/content/create-components";
import { createPaths } from "@/lib/content/create-paths";
import { createPreviewUrl } from "@/lib/content/create-preview-url";

export const curricula = createCollection((locale) => {
	const { assetPath, contentPath } = createPaths("/resources/curricula/", locale);

	return collection({
		label: "Curricula",
		path: contentPath,
		slugField: "title",
		format: { contentField: "content" },
		previewUrl: createPreviewUrl("/resources/curricula/{slug}"),
		entryLayout: "content",
		columns: ["title"],
		schema: {
			title: fields.slug({
				name: {
					label: "Title",
					validation: { isRequired: true },
				},
			}),
			locale: fields.select({
				label: "Language",
				options: [
					{ label: "German", value: "de" },
					{ label: "English", value: "en" },
				],
				defaultValue: "en",
			}),
			publicationDate: fields.date({
				label: "Publication date",
				validation: { isRequired: true },
				defaultValue: { kind: "today" },
			}),
			version: fields.text({
				label: "Version",
				defaultValue: "1.0.0",
			}),
			// authors: fields.multiRelationship({
			// 	label: "Authors",
			// 	validation: { length: { min: 1 } },
			// 	collection: "people",
			// }),
			editors: fields.multiRelationship({
				label: "Editors",
				// validation: { length: { min: 0 } },
				collection: "people",
			}),
			// contributors: fields.multiRelationship({
			// 	label: "Contributors",
			// 	// validation: { length: { min: 0 } },
			// 	collection: "people",
			// }),
			tags: fields.multiRelationship({
				label: "Tags",
				validation: { length: { min: 1 } },
				collection: "tags",
			}),
			sources: fields.multiRelationship({
				label: "Sources",
				validation: { length: { min: 1 } },
				collection: "sources",
			}),
			featuredImage: fields.image({
				label: "Featured image",
				// validation: { isRequired: false },
				...createAssetPaths(assetPath),
			}),
			license: fields.text({
				label: "License",
				validation: { isRequired: true },
				defaultValue: "CC BY 4.0",
			}),
			// tableOfContents: fields.checkbox({
			// 	label: "Table of contents",
			// 	defaultValue: true,
			// }),
			summary: fields.object(
				{
					title: fields.text({
						label: "Summary title",
						// validation: { isRequired: false },
					}),
					content: fields.text({
						label: "Summary",
						validation: { isRequired: true },
						multiline: true,
					}),
				},
				{
					label: "Summary",
				},
			),
			resources: fields.array(
				fields.conditional(
					fields.select({
						label: "Collection",
						options: [
							{ label: "Events", value: "events" },
							{ label: "External resources", value: "externalResources" },
							{ label: "Hosted resources", value: "hostedResources" },
							{ label: "Pathfinders", value: "pathfinders" },
						],
						defaultValue: "hostedResources",
					}),
					{
						events: fields.relationship({
							label: "Resource",
							collection: "events",
							validation: { isRequired: true },
						}),
						externalResources: fields.relationship({
							label: "Resource",
							collection: "externalResources",
							validation: { isRequired: true },
						}),
						hostedResources: fields.relationship({
							label: "Resource",
							collection: "hostedResources",
							validation: { isRequired: true },
						}),
						pathfinders: fields.relationship({
							label: "Resource",
							collection: "pathfinders",
							validation: { isRequired: true },
						}),
					},
				),
				{
					label: "Resources",
					itemLabel(props) {
						return `${props.value.value ?? ""} (${props.discriminant})`;
					},
					validation: { length: { min: 1 } },
				},
			),
			content: fields.mdx({
				label: "Content",
				options: {
					image: createAssetPaths(assetPath),
				},
				components: createComponents(assetPath),
			}),
		},
	});
});

export const events = createCollection((locale) => {
	const { assetPath, contentPath } = createPaths("/resources/events/", locale);

	return collection({
		label: "Events",
		path: contentPath,
		slugField: "title",
		format: { contentField: "content" },
		previewUrl: createPreviewUrl("/resources/events/{slug}"),
		entryLayout: "form",
		columns: ["title"],
		schema: {
			title: fields.slug({
				name: {
					label: "Title",
					validation: { isRequired: true },
				},
			}),
			locale: fields.select({
				label: "Language",
				options: [
					{ label: "German", value: "de" },
					{ label: "English", value: "en" },
				],
				defaultValue: "en",
			}),
			publicationDate: fields.date({
				label: "Publication date",
				validation: { isRequired: true },
				defaultValue: { kind: "today" },
			}),
			version: fields.text({
				label: "Version",
				defaultValue: "1.0.0",
			}),
			authors: fields.multiRelationship({
				label: "Authors",
				validation: { length: { min: 1 } },
				collection: "people",
			}),
			// editors: fields.multiRelationship({
			// 	label: "Editors",
			// 	// validation: { length: { min: 0 } },
			// 	collection: "people",
			// }),
			// contributors: fields.multiRelationship({
			// 	label: "Contributors",
			// 	// validation: { length: { min: 0 } },
			// 	collection: "people",
			// }),
			tags: fields.multiRelationship({
				label: "Tags",
				validation: { length: { min: 1 } },
				collection: "tags",
			}),
			sources: fields.multiRelationship({
				label: "Sources",
				validation: { length: { min: 1 } },
				collection: "sources",
			}),
			featuredImage: fields.image({
				label: "Featured image",
				// validation: { isRequired: false },
				...createAssetPaths(assetPath),
			}),
			license: fields.text({
				label: "License",
				validation: { isRequired: true },
				defaultValue: "CC BY 4.0",
			}),
			tableOfContents: fields.checkbox({
				label: "Table of contents",
				defaultValue: true,
			}),
			attachments: fields.array(
				fields.file({
					label: "Attachment",
					validation: { isRequired: true },
					...createAssetPaths(assetPath),
				}),
				{
					label: "Attachments",
					// validation: { length: { min: 0 } },
				},
			),
			summary: fields.object(
				{
					title: fields.text({
						label: "Summary title",
						// validation: { isRequired: false },
					}),
					content: fields.text({
						label: "Summary",
						validation: { isRequired: true },
						multiline: true,
					}),
				},
				{
					label: "Summary",
				},
			),
			content: fields.mdx({
				label: "Content",
				options: {
					image: createAssetPaths(assetPath),
				},
				components: createComponents(assetPath),
			}),
			sessions: fields.array(
				fields.object(
					{
						title: fields.text({
							label: "Title",
							validation: { isRequired: true },
						}),
						speakers: fields.multiRelationship({
							label: "Speakers",
							validation: { length: { min: 1 } },
							collection: "people",
						}),
						attachments: fields.array(
							fields.file({
								label: "Attachment",
								validation: { isRequired: true },
								...createAssetPaths(assetPath),
							}),
							{
								label: "Attachments",
								// validation: { length: { min: 0 } },
							},
						),
						content: fields.mdx({
							label: "Content",
							options: {
								image: createAssetPaths(assetPath),
							},
							components: createComponents(assetPath),
						}),
					},
					{
						label: "Session",
					},
				),
				{
					label: "Sessions",
					itemLabel(props) {
						return props.fields.title.value;
					},
					validation: { length: { min: 1 } },
				},
			),
		},
	});
});

export const externalResources = createCollection((locale) => {
	const { assetPath, contentPath } = createPaths("/resources/external/", locale);

	return collection({
		label: "External resources",
		path: contentPath,
		slugField: "title",
		format: { contentField: "content" },
		previewUrl: createPreviewUrl("/resources/external/{slug}"),
		entryLayout: "content",
		columns: ["title"],
		schema: {
			title: fields.slug({
				name: {
					label: "Title",
					validation: { isRequired: true },
				},
			}),
			locale: fields.select({
				label: "Language",
				options: [
					{ label: "German", value: "de" },
					{ label: "English", value: "en" },
				],
				defaultValue: "en",
			}),
			publicationDate: fields.date({
				label: "Publication date",
				validation: { isRequired: true },
				defaultValue: { kind: "today" },
			}),
			version: fields.text({
				label: "Version",
				defaultValue: "1.0.0",
			}),
			authors: fields.multiRelationship({
				label: "Authors",
				validation: { length: { min: 1 } },
				collection: "people",
			}),
			editors: fields.multiRelationship({
				label: "Editors",
				// validation: { length: { min: 0 } },
				collection: "people",
			}),
			contributors: fields.multiRelationship({
				label: "Contributors",
				// validation: { length: { min: 0 } },
				collection: "people",
			}),
			tags: fields.multiRelationship({
				label: "Tags",
				validation: { length: { min: 1 } },
				collection: "tags",
			}),
			sources: fields.multiRelationship({
				label: "Sources",
				validation: { length: { min: 1 } },
				collection: "sources",
			}),
			featuredImage: fields.image({
				label: "Featured image",
				// validation: { isRequired: false },
				...createAssetPaths(assetPath),
			}),
			license: fields.text({
				label: "License",
				validation: { isRequired: true },
				defaultValue: "CC BY 4.0",
			}),
			tableOfContents: fields.checkbox({
				label: "Table of contents",
				defaultValue: true,
			}),
			summary: fields.object(
				{
					title: fields.text({
						label: "Summary title",
						// validation: { isRequired: false },
					}),
					content: fields.text({
						label: "Summary",
						validation: { isRequired: true },
						multiline: true,
					}),
				},
				{
					label: "Summary",
				},
			),
			remote: fields.object(
				{
					publicationDate: fields.date({
						label: "Publication date",
						validation: { isRequired: true },
						// defaultValue: { kind: "today" },
					}),
					url: fields.url({
						label: "URL",
						validation: { isRequired: true },
					}),
					publisher: fields.text({
						label: "Publisher",
						validation: { isRequired: true },
					}),
				},
				{
					label: "Remote host",
				},
			),
			contentType: fields.select({
				label: "Content type",
				options: [
					{ label: "Audio", value: "audio" },
					{ label: "Slides", value: "slides" },
					{ label: "Training module", value: "training-module" },
					{ label: "Video", value: "video" },
					{ label: "Webinar recording", value: "webinar-recording" },
					{ label: "Website", value: "website" },
				],
				defaultValue: "training-module",
			}),
			content: fields.mdx({
				label: "Content",
				options: {
					image: createAssetPaths(assetPath),
				},
				components: createComponents(assetPath),
			}),
		},
	});
});

export const hostedResources = createCollection((locale) => {
	const { assetPath, contentPath } = createPaths("/resources/hosted/", locale);

	return collection({
		label: "Hosted resources",
		path: contentPath,
		slugField: "title",
		format: { contentField: "content" },
		previewUrl: createPreviewUrl("/resources/hosted/{slug}"),
		entryLayout: "content",
		columns: ["title"],
		schema: {
			title: fields.slug({
				name: {
					label: "Title",
					validation: { isRequired: true },
				},
			}),
			locale: fields.select({
				label: "Language",
				options: [
					{ label: "German", value: "de" },
					{ label: "English", value: "en" },
				],
				defaultValue: "en",
			}),
			publicationDate: fields.date({
				label: "Publication date",
				validation: { isRequired: true },
				defaultValue: { kind: "today" },
			}),
			version: fields.text({
				label: "Version",
				defaultValue: "1.0.0",
			}),
			authors: fields.multiRelationship({
				label: "Authors",
				validation: { length: { min: 1 } },
				collection: "people",
			}),
			editors: fields.multiRelationship({
				label: "Editors",
				// validation: { length: { min: 0 } },
				collection: "people",
			}),
			contributors: fields.multiRelationship({
				label: "Contributors",
				// validation: { length: { min: 0 } },
				collection: "people",
			}),
			tags: fields.multiRelationship({
				label: "Tags",
				validation: { length: { min: 1 } },
				collection: "tags",
			}),
			sources: fields.multiRelationship({
				label: "Sources",
				validation: { length: { min: 1 } },
				collection: "sources",
			}),
			featuredImage: fields.image({
				label: "Featured image",
				// validation: { isRequired: false },
				...createAssetPaths(assetPath),
			}),
			license: fields.text({
				label: "License",
				validation: { isRequired: true },
				defaultValue: "CC BY 4.0",
			}),
			tableOfContents: fields.checkbox({
				label: "Table of contents",
				defaultValue: true,
			}),
			summary: fields.object(
				{
					title: fields.text({
						label: "Summary title",
						// validation: { isRequired: false },
					}),
					content: fields.text({
						label: "Summary",
						validation: { isRequired: true },
						multiline: true,
					}),
				},
				{
					label: "Summary",
				},
			),
			content: fields.mdx({
				label: "Content",
				options: {
					image: createAssetPaths(assetPath),
				},
				components: createComponents(assetPath),
			}),
		},
	});
});

export const pathfinders = createCollection((locale) => {
	const { assetPath, contentPath } = createPaths("/resources/pathfinders/", locale);

	return collection({
		label: "Pathfinders",
		path: contentPath,
		slugField: "title",
		format: { contentField: "content" },
		previewUrl: createPreviewUrl("/resources/pathfinders/{slug}"),
		entryLayout: "content",
		columns: ["title"],
		schema: {
			title: fields.slug({
				name: {
					label: "Title",
					validation: { isRequired: true },
				},
			}),
			locale: fields.select({
				label: "Language",
				options: [
					{ label: "German", value: "de" },
					{ label: "English", value: "en" },
				],
				defaultValue: "en",
			}),
			publicationDate: fields.date({
				label: "Publication date",
				validation: { isRequired: true },
				defaultValue: { kind: "today" },
			}),
			version: fields.text({
				label: "Version",
				defaultValue: "1.0.0",
			}),
			authors: fields.multiRelationship({
				label: "Authors",
				validation: { length: { min: 1 } },
				collection: "people",
			}),
			editors: fields.multiRelationship({
				label: "Editors",
				// validation: { length: { min: 0 } },
				collection: "people",
			}),
			contributors: fields.multiRelationship({
				label: "Contributors",
				// validation: { length: { min: 0 } },
				collection: "people",
			}),
			tags: fields.multiRelationship({
				label: "Tags",
				validation: { length: { min: 1 } },
				collection: "tags",
			}),
			sources: fields.multiRelationship({
				label: "Sources",
				validation: { length: { min: 1 } },
				collection: "sources",
			}),
			featuredImage: fields.image({
				label: "Featured image",
				// validation: { isRequired: false },
				...createAssetPaths(assetPath),
			}),
			license: fields.text({
				label: "License",
				validation: { isRequired: true },
				defaultValue: "CC BY 4.0",
			}),
			tableOfContents: fields.checkbox({
				label: "Table of contents",
				defaultValue: true,
			}),
			summary: fields.object(
				{
					title: fields.text({
						label: "Summary title",
						// validation: { isRequired: false },
					}),
					content: fields.text({
						label: "Summary",
						validation: { isRequired: true },
						multiline: true,
					}),
				},
				{
					label: "Summary",
				},
			),
			content: fields.mdx({
				label: "Content",
				options: {
					image: createAssetPaths(assetPath),
				},
				components: createComponents(assetPath),
			}),
		},
	});
});

export const people = createCollection((locale) => {
	const { assetPath, contentPath } = createPaths("/people/", locale);

	return collection({
		label: "People",
		path: contentPath,
		slugField: "name",
		format: { contentField: "description" },
		previewUrl: createPreviewUrl("/people/{slug}"),
		entryLayout: "form",
		columns: ["name"],
		schema: {
			name: fields.slug({
				name: {
					label: "Name",
					validation: { isRequired: true },
				},
			}),
			image: fields.image({
				label: "Image",
				// validation: { isRequired: false },
				...createAssetPaths(assetPath),
			}),
			orcid: fields.text({
				label: "ORCID",
				// validation: { isRequired: false },
			}),
			email: fields.text({
				label: "Email",
				// validation: { isRequired: false },
			}),
			website: fields.url({
				label: "Website",
				// validation: { isRequired: false },
			}),
			twitter: fields.text({
				label: "Twitter",
				// validation: { isRequired: false },
			}),
			mastodon: fields.text({
				label: "Mastodon",
				// validation: { isRequired: false },
			}),
			linkedIn: fields.text({
				label: "LinkedIn",
				// validation: { isRequired: false },
			}),
			description: fields.mdx({
				label: "Description",
				options: {
					image: createAssetPaths(assetPath),
				},
				components: createComponents(assetPath),
			}),
		},
	});
});

export const sources = createCollection((locale) => {
	const { assetPath, contentPath } = createPaths("/sources/", locale);

	return collection({
		label: "Sources",
		path: contentPath,
		slugField: "name",
		format: { contentField: "description" },
		previewUrl: createPreviewUrl("/sources/{slug}"),
		entryLayout: "form",
		columns: ["name"],
		schema: {
			name: fields.slug({
				name: {
					label: "Name",
					validation: { isRequired: true },
				},
			}),
			image: fields.image({
				label: "Image",
				validation: { isRequired: true },
				...createAssetPaths(assetPath),
			}),
			description: fields.mdx({
				label: "Description",
				options: {
					image: createAssetPaths(assetPath),
				},
				components: createComponents(assetPath),
			}),
		},
	});
});

export const tags = createCollection((locale) => {
	const { assetPath, contentPath } = createPaths("/tags/", locale);

	return collection({
		label: "Tags",
		path: contentPath,
		slugField: "name",
		format: { contentField: "description" },
		previewUrl: createPreviewUrl("/tags/{slug}"),
		entryLayout: "form",
		columns: ["name"],
		schema: {
			name: fields.slug({
				name: {
					label: "Name",
					validation: { isRequired: true },
				},
			}),
			description: fields.mdx({
				label: "Description",
				options: {
					image: createAssetPaths(assetPath),
				},
				components: createComponents(assetPath),
			}),
		},
	});
});

export const documentation = createCollection((locale) => {
	const { assetPath, contentPath } = createPaths("/documentation/", locale);

	return collection({
		label: "Documentation",
		path: contentPath,
		slugField: "title",
		format: { contentField: "content" },
		previewUrl: createPreviewUrl("/documentation/{slug}"),
		entryLayout: "content",
		columns: ["title"],
		schema: {
			title: fields.slug({
				name: {
					label: "Title",
					validation: { isRequired: true },
				},
			}),
			content: fields.mdx({
				label: "Content",
				options: {
					image: createAssetPaths(assetPath),
				},
				components: createComponents(assetPath),
			}),
		},
	});
});
