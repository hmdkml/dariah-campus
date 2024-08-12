import type { ReactNode } from "react";
import { Tweet as StaticTweet } from "react-tweet";

interface TweetProps {
	id: string;
}

export function Tweet(props: TweetProps): ReactNode {
	const { id } = props;

	return <StaticTweet id={id} />;
}
