import { isNonEmptyString, pick } from "@acdh-oeaw/lib";
import { fields, NotEditable } from "@keystatic/core";
import {
	block,
	type ContentComponent,
	inline,
	mark,
	repeating,
	wrapper,
} from "@keystatic/core/content-components";
import {
	BookTextIcon,
	CaptionsIcon,
	DownloadIcon,
	ExpandIcon,
	GridIcon,
	HeadingIcon,
	ImageIcon,
	InfoIcon,
	MessageCircleQuestionIcon,
	SquareIcon,
	SuperscriptIcon,
	TwitterIcon,
	VideoIcon,
} from "lucide-react";
import { Tweet } from "react-tweet";

import type { Locale } from "@/config/i18n.config";
import { createAssetPaths } from "@/lib/content/create-asset-paths";

/** @see https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts */
const calloutKinds = [
	{ label: "Caution", value: "caution" },
	{ label: "Important", value: "important" },
	{ label: "Note", value: "note" },
	{ label: "Tip", value: "tip" },
	{ label: "Warning", value: "warning" },
] as const;

const gridVariants = [
	{ label: "Two columns", value: "two-columns" },
	{ label: "Three columns", value: "three-columns" },
	{ label: "Four columns", value: "four-columns" },
	{ label: "Two columns, right is 2x as wide", value: "one-two-columns" },
	{ label: "Two columns, right is 3x as wide", value: "one-three-columns" },
	{ label: "Two columns, right is 4x as wide", value: "one-four-columns" },
] as const;

const videoProviders = [
	{ label: "Nakala", value: "nakala" },
	{ label: "University of Helsinki", value: "uni-helsinki" },
	{ label: "Vimeo", value: "vimeo" },
	{ label: "YouTube", value: "youtube" },
] as const;

const components = {
	Callout() {
		return wrapper({
			label: "Callout",
			description: "A panel with additional information.",
			icon: <InfoIcon />,
			schema: {
				kind: fields.select({
					label: "Kind",
					options: calloutKinds,
					defaultValue: "note",
				}),
				title: fields.text({
					label: "Title",
					// validation: { isRequired: false },
				}),
			},
			ContentView(props) {
				const { children, value } = props;
				return (
					<aside>
						{isNonEmptyString(value.title) ? (
							<NotEditable>
								<strong>{value.title}</strong>
							</NotEditable>
						) : null}
						{children}
					</aside>
				);
			},
		});
	},
	Card() {
		return wrapper({
			label: "Card",
			description: "A card.",
			icon: <SquareIcon />,
			schema: {
				title: fields.text({
					label: "Title",
					validation: { isRequired: true },
				}),
				href: fields.url({
					label: "URL",
					validation: { isRequired: true },
				}),
			},
			ContentView(props) {
				const { children, value } = props;
				return (
					<aside>
						{isNonEmptyString(value.title) ? (
							<NotEditable>
								<strong>{value.title}</strong>
							</NotEditable>
						) : null}
						{children}
					</aside>
				);
			},
		});
	},
	Disclosure() {
		return wrapper({
			label: "Disclosure",
			description: "An expandable panel.",
			icon: <ExpandIcon />,
			schema: {
				title: fields.text({
					label: "Title",
					validation: { isRequired: true },
				}),
			},
		});
	},
	DownloadLink(assetPath) {
		return mark({
			label: "Download link",
			icon: <DownloadIcon />,
			className: "underline decoration-dotted",
			schema: {
				href: fields.file({
					label: "File",
					...createAssetPaths(assetPath),
					validation: { isRequired: true },
				}),
			},
		});
	},
	Embed() {
		return wrapper({
			label: "Embed",
			description: "Another website, embedded via iframe.",
			icon: <VideoIcon />,
			schema: {
				src: fields.url({
					label: "URL",
					description: "The URL of the iframe.",
					validation: { isRequired: true },
				}),
			},
		});
	},
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
	Footnote() {
		return mark({
			label: "Footnote",
			icon: <SuperscriptIcon />,
			className: "underline decoration-dotted align-super text-sm",
			schema: {},
		});
	},
	Grid() {
		return repeating({
			label: "Grid",
			description: "A grid layout.",
			icon: <GridIcon />,
			children: ["GridItem"],
			schema: {
				variant: fields.select({
					label: "Variant",
					options: gridVariants,
					defaultValue: "two-columns",
				}),
			},
		});
	},
	GridItem() {
		return wrapper({
			label: "Grid item",
			description: "A grid cell.",
			icon: <GridIcon />,
			forSpecificLocations: true,
			schema: {},
		});
	},
	HeadingId() {
		return inline({
			label: "Heading ID",
			description: "A custom heading id as a link target.",
			icon: <HeadingIcon />,
			schema: {
				id: fields.text({
					label: "Identifier",
					validation: { isRequired: true },
				}),
			},
			ContentView(props) {
				return <span className="opacity-50">#{props.value.id}</span>;
			},
		});
	},
	Quiz() {
		return repeating({
			label: "Quiz",
			description: "An interactive quiz.",
			icon: <MessageCircleQuestionIcon />,
			children: ["QuizChoice"],
			validation: { children: { min: 1 } },
			schema: {},
		});
	},
	QuizChoice() {
		return repeating({
			label: "Choice quiz",
			description: "A single or multiple choice quiz.",
			icon: <MessageCircleQuestionIcon />,
			forSpecificLocations: true,
			children: [
				"QuizChoiceQuestion",
				"QuizChoiceAnswer",
				"QuizSuccessMessage",
				"QuizErrorMessage",
			],
			validation: { children: { min: 1 } },
			schema: {
				variant: fields.select({
					label: "Variant",
					options: [
						{ label: "Single choice", value: "single" },
						{ label: "Multiple choice", value: "multiple" },
					],
					defaultValue: "multiple",
				}),
				buttonLabel: fields.text({
					label: "Button label",
					description: "Custom label for 'Check answer' button.",
					// validation: { isRequired: fields },
				}),
			},
		});
	},
	QuizChoiceAnswer() {
		return wrapper({
			label: "Answer",
			description: "An answer in a single/multiple choice quiz.",
			icon: <MessageCircleQuestionIcon />,
			forSpecificLocations: true,
			schema: {
				kind: fields.select({
					label: "Kind",
					options: [
						{ label: "Correct", value: "correct" },
						{ label: "Incorrect", value: "incorrect" },
					],
					defaultValue: "incorrect",
				}),
			},
			ContentView(props) {
				return (
					<div>
						<NotEditable>
							{props.value.kind === "correct" ? "Correct" : "Incorrect"} answer:
						</NotEditable>
						{props.children}
					</div>
				);
			},
		});
	},
	QuizChoiceQuestion() {
		return wrapper({
			label: "Question",
			description: "A question in a single/multiple choice quiz.",
			icon: <MessageCircleQuestionIcon />,
			forSpecificLocations: true,
			schema: {},
		});
	},
	QuizErrorMessage() {
		return wrapper({
			label: "Quiz error message",
			description: "Help text for incorrect answers.",
			icon: <MessageCircleQuestionIcon />,
			forSpecificLocations: true,
			schema: {},
		});
	},
	QuizSuccessMessage() {
		return wrapper({
			label: "Quiz success message",
			description: "Help text for correct answers.",
			icon: <MessageCircleQuestionIcon />,
			forSpecificLocations: true,
			schema: {},
		});
	},
	ResourceLink(_assetPath, _locale) {
		return mark({
			label: "Resource link",
			icon: <BookTextIcon />,
			tag: "a",
			schema: {
				resource: fields.conditional(
					fields.select({
						label: "Collection",
						options: [
							{ label: "Curricula", value: "curricula" },
							{ label: "Events", value: "events" },
							{ label: "External resources", value: "externalResources" },
							{ label: "Hosted resources", value: "hostedResources" },
							{ label: "Pathfinders", value: "pathfinders" },
						],
						defaultValue: "hostedResources",
					}),
					{
						curricula: fields.relationship({
							label: "Resource",
							collection: "curricula",
							validation: { isRequired: true },
						}),
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
			},
		});
	},
	Tab() {
		return wrapper({
			label: "Tab",
			description: "A tab.",
			icon: <CaptionsIcon />,
			forSpecificLocations: true,
			schema: {
				title: fields.text({
					label: "Title",
					validation: { isRequired: true },
				}),
			},
		});
	},
	Tabs() {
		return repeating({
			label: "Tabs",
			description: "Multiple tabs.",
			icon: <CaptionsIcon />,
			children: ["Tab"],
			schema: {},
		});
	},
	Tweet() {
		return block({
			label: "Tweet",
			description: "A tweet.",
			icon: <TwitterIcon />,
			schema: {
				id: fields.text({
					label: "ID",
					validation: { isRequired: true },
				}),
			},
			ContentView(props) {
				return (
					<NotEditable>
						<Tweet id={props.value.id} />
					</NotEditable>
				);
			},
		});
	},
	Video() {
		return wrapper({
			label: "Video",
			description: "A YouTube video.",
			icon: <VideoIcon />,
			schema: {
				provider: fields.select({
					label: "Provider",
					options: videoProviders,
					defaultValue: "youtube",
				}),
				id: fields.text({
					label: "Video identifier",
					validation: { isRequired: true },
				}),
				startTime: fields.number({
					label: "Start time",
					// validation: { isRequired: false },
				}),
			},
		});
	},
	VideoCard() {
		return block({
			label: "Video card",
			description: "A YouTube video.",
			icon: <VideoIcon />,
			schema: {
				title: fields.text({
					label: "Title",
					validation: { isRequired: true },
				}),
				subtitle: fields.text({
					label: "Subtitle",
					validation: { isRequired: true },
				}),
				provider: fields.select({
					label: "Provider",
					options: videoProviders,
					defaultValue: "youtube",
				}),
				id: fields.text({
					label: "Video identifier",
					validation: { isRequired: true },
				}),
				startTime: fields.number({
					label: "Start time",
					// validation: { isRequired: false },
				}),
				image: fields.image({
					label: "image",
					validation: { isRequired: true },
				}),
			},
		});
	},
} satisfies Record<string, (assetPath: `/${string}/`, locale: Locale) => ContentComponent>;

export function createComponents(
	assetPath: `/${string}/`,
	locale: Locale,
	include?: Array<keyof typeof components>,
) {
	const _components = include ? pick(components, include) : components;

	return Object.fromEntries(
		Object.entries(_components).map(([key, value]) => {
			return [key, value(assetPath, locale)];
		}),
	);
}

export const headingLevels = [2, 3, 4, 5] as const;
