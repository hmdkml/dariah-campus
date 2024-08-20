import type { Metadata, ResolvingMetadata } from "next";
import { getLocale } from "next-intl/server";
import type { ReactNode } from "react";

import { MainContent } from "@/components/main-content";
import { PageTitle } from "@/components/ui/page-title";
import { createCollectionResource } from "@/lib/content/create-resource";

interface DocumentationPageProps {
	params: {
		id: string;
	};
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<
	Array<Pick<DocumentationPageProps["params"], "id">>
> {
	const locale = await getLocale();

	const ids = await createCollectionResource("documentation", locale).list();

	return ids.map((id) => {
		/** @see https://github.com/vercel/next.js/issues/63002 */
		return { id: process.env.NODE_ENV === "production" ? id : encodeURIComponent(id) };
	});
}

export async function generateMetadata(
	props: DocumentationPageProps,
	_parent: ResolvingMetadata,
): Promise<Metadata> {
	const { params } = props;

	const locale = await getLocale();

	const id = decodeURIComponent(params.id);

	const entry = await createCollectionResource("externalResources", locale).read(id);

	const metadata: Metadata = {
		title: entry.data.title,
	};

	return metadata;
}

export default async function DocumentationPage(
	props: DocumentationPageProps,
): Promise<Awaited<ReactNode>> {
	const { params } = props;

	const locale = await getLocale();

	const id = decodeURIComponent(params.id);

	const entry = await createCollectionResource("documentation", locale).read(id);

	return (
		<MainContent className="container py-8">
			<PageTitle>{entry.data.title}</PageTitle>
		</MainContent>
	);
}
