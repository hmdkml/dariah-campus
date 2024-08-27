import type { ReactNode } from "react";

import type { gridVariants } from "@/lib/content/create-components";

type GridVariant = (typeof gridVariants)[number]["value"];

interface GridProps {
	children: ReactNode;
	variant: GridVariant;
}

export function Grid(props: GridProps): ReactNode {
	return null;
}

interface GridItemProps {
	children: ReactNode;
}

export function GridItem(props: GridItemProps): ReactNode {
	return null;
}
