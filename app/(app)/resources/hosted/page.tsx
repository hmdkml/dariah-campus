import type { Metadata, ResolvingMetadata } from "next";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { MainContent } from "@/components/main-content";
import { PageTitle } from "@/components/ui/page-title";
import { createReader } from "@/lib/content/create-reader";

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
	const t = await getTranslations("HostedResourcesPage");

	const reader = createReader();
	const entries = await reader.collections.hostedResources.all({ resolveLinkedFiles: true });

	return (
		<MainContent className="container py-8">
			<PageTitle>{t("title")}</PageTitle>
			<pre>{JSON.stringify(entries, null, 2)}</pre>
		</MainContent>
	);
}
