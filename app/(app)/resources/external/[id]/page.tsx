import type { Metadata, ResolvingMetadata } from "next";
import { getLocale } from "next-intl/server";
import type { ReactNode } from "react";

import { MainContent } from "@/components/main-content";
import { PageTitle } from "@/components/ui/page-title";
import { createCollectionResource } from "@/lib/content/create-resource";

interface ExternalResourcePageProps {
	params: {
		id: string;
	};
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<
	Array<Pick<ExternalResourcePageProps["params"], "id">>
> {
	const locale = await getLocale();

	const ids = await createCollectionResource("externalResources", locale).list();

	return ids.map((id) => {
		/** @see https://github.com/vercel/next.js/issues/63002 */
		return { id: process.env.NODE_ENV === "production" ? id : encodeURIComponent(id) };
	});
}

export async function generateMetadata(
	props: ExternalResourcePageProps,
	_parent: ResolvingMetadata,
): Promise<Metadata> {
	const { params } = props;

	const id = decodeURIComponent(params.id);

	const entry = await createCollectionResource("externalResources", locale).read(id);

	const metadata: Metadata = {
		title: entry.data.title,
	};

	return metadata;
}

export default async function ExternalResourcePage(
	props: ExternalResourcePageProps,
): Promise<Awaited<ReactNode>> {
	const { params } = props;

	const locale = await getLocale();

	const id = decodeURIComponent(params.id);

	const entry = await createCollectionResource("externalResources", locale).read(id);

	return (
		<MainContent className="container py-8">
			<PageTitle>{entry.data.title}</PageTitle>
			<pre>{JSON.stringify(entry, null, 2)}</pre>
		</MainContent>
	);
}
