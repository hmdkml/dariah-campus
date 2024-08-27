import type { ReactNode } from "react";

import type { calloutKinds } from "@/lib/content/create-components";

type CalloutKind = (typeof calloutKinds)[number]["value"];

interface CalloutProps {
	children: ReactNode;
	kind: CalloutKind;
	title?: string;
}

export function Callout(props: CalloutProps): ReactNode {
	return null;
}
