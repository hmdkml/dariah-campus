import type { Metadata, ResolvingMetadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { MainContent } from "@/components/main-content";
import { createReader } from "@/lib/content/create-reader";

interface IndexPageProps extends EmptyObject {}

export async function generateMetadata(
	_props: IndexPageProps,
	_parent: ResolvingMetadata,
): Promise<Metadata> {
	const locale = await getLocale();
	const _t = await getTranslations({ locale, namespace: "IndexPage" });

	const metadata: Metadata = {
		/**
		 * Fall back to `title.default` from `layout.tsx`.
		 *
		 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#title
		 */
		// title: undefined,
	};

	return metadata;
}

export default async function IndexPage(_props: IndexPageProps): Promise<ReactNode> {
	const _t = await getTranslations("IndexPage");

	const reader = createReader();
	const indexPage = await reader.singletons.indexPage.readOrThrow();

	return (
		<MainContent className="container py-8">
			<section>
				<h1>{indexPage.hero.title}</h1>
				<div>{indexPage.hero.leadIn}</div>
			</section>
		</MainContent>
	);
}
