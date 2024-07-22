import { Callout } from "@/components/content/callout";
import { Card } from "@/components/content/card";
import { Disclosure } from "@/components/content/disclosure";
import { DownloadLink } from "@/components/content/download-link";
import { Embed } from "@/components/content/embed";
import { Figure } from "@/components/content/figure";
import { Footnote } from "@/components/content/footnote";
import { Grid, GridItem } from "@/components/content/grid";
import {
	Quiz,
	QuizChoice,
	QuizChoiceAnswer,
	QuizChoiceQuestion,
	QuizErrorMessage,
	QuizSuccessMessage,
} from "@/components/content/quiz";
import { Tab, Tabs } from "@/components/content/tabs";
import { Video } from "@/components/content/video";
import { Link } from "@/components/link";

// FIXME: get rid of them! // TODO: Grid has different interface
const legacyComponents = {
	Flex: Grid,
	Panel: Callout,
	SideNote: Callout,
	Youtube: Video,
	YouTube: Video,
};

const components = {
	a: Link,
	Callout,
	Card,
	Disclosure,
	DownloadLink,
	Embed,
	Figure,
	Footnote,
	Grid,
	GridItem,
	Quiz,
	QuizChoice,
	QuizChoiceAnswer,
	QuizChoiceQuestion,
	QuizErrorMessage,
	QuizSuccessMessage,
	Tab,
	Tabs,
	Video,
};

declare global {
	type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
	return components;
}
