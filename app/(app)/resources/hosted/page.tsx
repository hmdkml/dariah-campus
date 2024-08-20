import type { Metadata, ResolvingMetadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { MainContent } from "@/components/main-content";
import { PageTitle } from "@/components/ui/page-title";
import { createCollectionResource } from "@/lib/content/create-resource";

interface HostedResourcesPageProps extends EmptyObject {}

export async function generateMetadata(
	_props: HostedResourcesPageProps,
	_parent: ResolvingMetadata,
): Promise<Metadata> {
	const t = await getTranslations("HostedResourcesPage");

	const metadata: Metadata = {
		title: t("meta.title"),
	};

	return metadata;
}

export default async function HostedResourcesPage(
	_props: HostedResourcesPageProps,
): Promise<Awaited<ReactNode>> {
	const locale = await getLocale();
	const t = await getTranslations("HostedResourcesPage");

	const entries = await createCollectionResource("hostedResources", locale).all();

	return (
		<MainContent className="container py-8">
			<PageTitle>{t("title")}</PageTitle>
			<pre>{JSON.stringify(entries, null, 2)}</pre>
		</MainContent>
	);
}
