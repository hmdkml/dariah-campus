import type { ReactNode } from "react";

import type { videoProviders } from "@/lib/content/create-components";

type VideoProvider = (typeof videoProviders)[number]["value"];

interface VideoCardProps {
	title: string;
	subtitle: string;
	image: string;
	provider: VideoProvider;
	id: string;
	startTime?: number;
	/** Added by `with-iframe-titles` plugin. */
	_title?: string;
}

export function VideoCard(props: VideoCardProps): ReactNode {
	return null;
}
