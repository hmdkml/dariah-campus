import type { Metadata, ResolvingMetadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { MainContent } from "@/components/main-content";
import { PageTitle } from "@/components/ui/page-title";

interface SourcesPageProps extends EmptyObject {}

export async function generateMetadata(
	_props: SourcesPageProps,
	_parent: ResolvingMetadata,
): Promise<Metadata> {
	const t = await getTranslations("SourcesPage");

	const metadata: Metadata = {
		title: t("meta.title"),
	};

	return metadata;
}

export default function SourcesPage(_props: SourcesPageProps): ReactNode {
	const t = useTranslations("SourcesPage");

	return (
		<MainContent className="container py-8">
			<PageTitle>{t("title")}</PageTitle>
		</MainContent>
	);
}
