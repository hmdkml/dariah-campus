import type { ReactNode } from "react";

interface EmbedProps {
	children: ReactNode;
	src: string;
	/** Added by `with-iframe-titles` plugin. */
	_title: string;
}

export function Embed(props: EmbedProps): ReactNode {
	return null;
}
