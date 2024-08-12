import { Callout } from "@/components/content/callout";
import { Card } from "@/components/content/card";
import { Disclosure } from "@/components/content/disclosure";
import { DownloadLink } from "@/components/content/download-link";
import { Embed } from "@/components/content/embed";
import { Figure } from "@/components/content/figure";
import { Grid, GridItem } from "@/components/content/grid";
import {
	Quiz,
	QuizChoice,
	QuizChoiceAnswer,
	QuizChoiceQuestion,
	QuizErrorMessage,
	QuizSuccessMessage,
} from "@/components/content/quiz";
import { ResourceLink } from "@/components/content/resource-link";
import { Tab, Tabs } from "@/components/content/tabs";
import { Tweet } from "@/components/content/tweet";
import { Video } from "@/components/content/video";
import { VideoCard } from "@/components/content/video-card";
import { Image } from "@/components/image";
import { Link } from "@/components/link";

const components = {
	a: Link,
	Callout,
	Card,
	Disclosure,
	DownloadLink,
	Embed,
	Figure,
	Grid,
	GridItem,
	img: Image,
	Quiz,
	QuizChoice,
	QuizChoiceAnswer,
	QuizChoiceQuestion,
	QuizErrorMessage,
	QuizSuccessMessage,
	ResourceLink,
	Tab,
	Tabs,
	Tweet,
	Video,
	VideoCard,
};

declare global {
	type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
	return components;
}
