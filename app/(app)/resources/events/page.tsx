import type { Metadata, ResolvingMetadata } from "next";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { MainContent } from "@/components/main-content";
import { PageTitle } from "@/components/ui/page-title";
import { createReader } from "@/lib/content/create-reader";

interface EventsPageProps extends EmptyObject {}

export async function generateMetadata(
	_props: EventsPageProps,
	_parent: ResolvingMetadata,
): Promise<Metadata> {
	const t = await getTranslations("EventsPage");

	const metadata: Metadata = {
		title: t("meta.title"),
	};

	return metadata;
}

export default async function EventsPage(_props: EventsPageProps): Promise<Awaited<ReactNode>> {
	const t = await getTranslations("EventsPage");

	const reader = createReader();
	const entries = await reader.collections.events.all({ resolveLinkedFiles: true });

	return (
		<MainContent className="container py-8">
			<PageTitle>{t("title")}</PageTitle>
		</MainContent>
	);
}
