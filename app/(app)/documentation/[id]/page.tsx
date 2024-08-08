import type { Metadata, ResolvingMetadata } from "next";
import type { ReactNode } from "react";

import { MainContent } from "@/components/main-content";
import { PageTitle } from "@/components/ui/page-title";
import { createReader } from "@/lib/content/create-reader";

interface DocumentationPageProps {
	params: {
		id: string;
	};
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<
	Array<Pick<DocumentationPageProps["params"], "id">>
> {
	const reader = createReader();
	const ids = await reader.collections.documentation.list();

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

	const id = decodeURIComponent(params.id);

	const reader = createReader();
	const entry = await reader.collections.externalResources.readOrThrow(id, {
		resolveLinkedFiles: true,
	});

	const metadata: Metadata = {
		title: entry.title,
	};

	return metadata;
}

export default async function DocumentationPage(
	props: DocumentationPageProps,
): Promise<Awaited<ReactNode>> {
	const { params } = props;

	const id = decodeURIComponent(params.id);

	const reader = createReader();
	const entry = await reader.collections.documentation.readOrThrow(id, {
		resolveLinkedFiles: true,
	});

	return (
		<MainContent className="container py-8">
			<PageTitle>{entry.title}</PageTitle>
		</MainContent>
	);
}
