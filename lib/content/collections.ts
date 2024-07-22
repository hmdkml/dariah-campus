import { collection, fields } from "@keystatic/core";

import { createAssetPaths } from "@/lib/content/create-asset-paths";
import { createCollection } from "@/lib/content/create-collection";
import { createComponents } from "@/lib/content/create-components";
import { createPaths } from "@/lib/content/create-paths";
import { createPreviewUrl } from "@/lib/content/create-preview-url";

export const curricula = createCollection((locale) => {
	const { assetPath, contentPath } = createPaths("/content/curricula/", locale);

	return collection({
		label: "Curricula",
		path: contentPath,
		slugField: "title",
		format: { contentField: "content" },
		previewUrl: createPreviewUrl("/curricula/{slug}"),
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
			summary: fields.object(
				{
					title: fields.text({
						label: "Summary title",
						validation: { isRequired: false },
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
			authors: fields.multiRelationship({
				label: "Authors",
				validation: { length: { min: 1 } },
				collection: "people",
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

export const events = createCollection((locale) => {
	const { assetPath, contentPath } = createPaths("/content/events/", locale);

	return collection({
		label: "Events",
		path: contentPath,
		slugField: "title",
		format: { contentField: "content" },
		previewUrl: createPreviewUrl("/events/{slug}"),
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
			summary: fields.object(
				{
					title: fields.text({
						label: "Summary title",
						validation: { isRequired: false },
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
						authors: fields.multiRelationship({
							label: "Authors",
							validation: { length: { min: 1 } },
							collection: "people",
						}),
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

export const people = createCollection((locale) => {
	const { assetPath, contentPath } = createPaths("/content/people/", locale);

	return collection({
		label: "People",
		path: contentPath,
		slugField: "name",
		format: { contentField: "content" },
		previewUrl: createPreviewUrl("/people/{slug}"),
		entryLayout: "content",
		columns: ["name"],
		schema: {
			name: fields.slug({
				name: {
					label: "Name",
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

export const resources = createCollection((locale) => {
	const { assetPath, contentPath } = createPaths("/content/resources/", locale);

	return collection({
		label: "Resources",
		path: contentPath,
		slugField: "title",
		format: { contentField: "content" },
		previewUrl: createPreviewUrl("/resources/{slug}"),
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
			version: fields.text({
				label: "Version",
				defaultValue: "1.0.0",
			}),
			publicationDate: fields.date({
				label: "Publication date",
				validation: { isRequired: true },
				defaultValue: { kind: "today" },
			}),
			authors: fields.multiRelationship({
				label: "Authors",
				validation: { length: { min: 1 } },
				collection: "people",
			}),
			summary: fields.object(
				{
					title: fields.text({
						label: "Summary title",
						validation: { isRequired: false },
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
