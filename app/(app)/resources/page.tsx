import type { Metadata, ResolvingMetadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { MainContent } from "@/components/main-content";
import { PageTitle } from "@/components/ui/page-title";
import { createCollectionResource } from "@/lib/content/create-resource";
import { sortByPublicationDate } from "@/lib/content/sort-by-publication-date";

interface ResourcesPageProps extends EmptyObject {}

export async function generateMetadata(
	_props: ResourcesPageProps,
	_parent: ResolvingMetadata,
): Promise<Metadata> {
	const t = await getTranslations("ResourcesPage");

	const metadata: Metadata = {
		title: t("meta.title"),
	};

	return metadata;
}

export default async function ResourcesPage(
	_props: ResourcesPageProps,
): Promise<Awaited<ReactNode>> {
	const locale = await getLocale();
	const t = await getTranslations("ResourcesPage");

	const collections = ["events", "externalResources", "hostedResources", "pathfinders"] as const;

	const entries = (
		await Promise.all(
			collections.map((id) => {
				return createCollectionResource(id, locale).all();
			}),
		)
	).flat();

	const sortedEntries = sortByPublicationDate(entries);

	return (
		<MainContent className="container py-8">
			<PageTitle>{t("title")}</PageTitle>
			<pre>{JSON.stringify(sortedEntries, null, 2)}</pre>
		</MainContent>
	);
}
