import type { Metadata, ResolvingMetadata } from "next";
import type { ReactNode } from "react";

import { MainContent } from "@/components/main-content";
import { PageTitle } from "@/components/ui/page-title";
import { createReader } from "@/lib/content/create-reader";

interface EventPageProps {
	params: {
		id: string;
	};
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<Pick<EventPageProps["params"], "id">>> {
	const reader = createReader();
	const ids = await reader.collections.events.list();

	return ids.map((id) => {
		return { id };
	});
}

export async function generateMetadata(
	props: EventPageProps,
	_parent: ResolvingMetadata,
): Promise<Metadata> {
	const { params } = props;

	const { id } = params;

	const reader = createReader();
	const entry = await reader.collections.events.readOrThrow(id, { resolveLinkedFiles: true });

	const metadata: Metadata = {
		title: entry.title,
	};

	return metadata;
}

export default async function EventPage(props: EventPageProps): Promise<Awaited<ReactNode>> {
	const { params } = props;

	const { id } = params;

	const reader = createReader();
	const entry = await reader.collections.events.readOrThrow(id, { resolveLinkedFiles: true });

	return (
		<MainContent className="container py-8">
			<PageTitle>{entry.title}</PageTitle>
		</MainContent>
	);
}