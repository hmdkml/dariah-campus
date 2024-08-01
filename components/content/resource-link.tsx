import type { ReactNode } from "react";

import { Link } from "@/components/link";

interface ResourceLinkProps {
	children: ReactNode;
	resource: {
		discriminant: "curricula" | "events" | "externalResources" | "hostedResources" | "pathfinders";
		value: string;
	};
}

export function ResourceLink(props: ResourceLinkProps): ReactNode {
	const { children, resource } = props;

	const href = `/resources/${resource.discriminant}/${resource.value}`;

	return <Link href={href}>{children}</Link>;
}
