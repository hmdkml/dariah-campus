import { isNonEmptyString, pick } from "@acdh-oeaw/lib";
import { fields, NotEditable } from "@keystatic/core";
import {
	type ContentComponent,
	mark,
	repeating,
	wrapper,
} from "@keystatic/core/content-components";
import {
	CaptionsIcon,
	DownloadIcon,
	ExpandIcon,
	GridIcon,
	ImageIcon,
	InfoIcon,
	MessageCircleQuestionIcon,
	SquareIcon,
	SuperscriptIcon,
	VideoIcon,
} from "lucide-react";

import { createAssetPaths } from "@/lib/content/create-asset-paths";

const components = {
	Callout() {
		return wrapper({
			label: "Callout",
			description: "A panel with additional information.",
			icon: <InfoIcon />,
			schema: {
				kind: fields.select({
					label: "Kind",
					/** @see https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts */
					options: [
						{ label: "Caution", value: "caution" },
						{ label: "Important", value: "important" },
						{ label: "Note", value: "note" },
						{ label: "Tip", value: "tip" },
						{ label: "Warning", value: "warning" },
					],
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
				url: fields.url({
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
				url: fields.url({
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
					options: [
						{
							label: "Two columns",
							value: "two-columns",
						},
						{
							label: "Three columns",
							value: "three-columns",
						},
						{
							label: "Four columns",
							value: "four-columns",
						},
						{
							label: "Two columns, right is 2x as wide",
							value: "one-two-columns",
						},
						{
							label: "Two columns, right is 3x as wide",
							value: "one-three-columns",
						},
						{
							label: "Two columns, right is 4x as wide",
							value: "one-four-columns",
						},
					],
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
	Video() {
		return wrapper({
			label: "Video",
			description: "A YouTube video.",
			icon: <VideoIcon />,
			schema: {
				provider: fields.select({
					label: "Provider",
					options: [
						{ label: "Nakala", value: "nakala" },
						{ label: "University of Helsinki", value: "uni-helsinki" },
						{ label: "Vimeo", value: "vimeo" },
						{ label: "YouTube", value: "youtube" },
					],
					defaultValue: "youtube",
				}),
				id: fields.text({
					label: "Video identifier",
					description: "The YouTube video id.",
					validation: { isRequired: true },
				}),
				startTime: fields.number({
					label: "Start time",
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
