import type { ReactNode } from "react";

import type { videoProviders } from "@/lib/content/create-components";

type VideoProvider = (typeof videoProviders)[number]["value"];

interface VideoProps {
	provider: VideoProvider;
	id: string;
	startTime?: number;
	/** Added by `with-iframe-titles` plugin. */
	_title?: string;
}

export function Video(props: VideoProps): ReactNode {
	return null;
}
