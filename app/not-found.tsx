import type { Metadata, ResolvingMetadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { MainContent } from "@/components/main-content";
import { PageTitle } from "@/components/ui/page-title";
import { defaultLocale } from "@/config/i18n.config";
import * as fonts from "@/lib/fonts";
import { cn } from "@/lib/styles";

export async function generateMetadata(
	_props: Record<string, never>,
	_parent: ResolvingMetadata,
): Promise<Metadata> {
	const t = await getTranslations("NotFoundPage");

	const metadata: Metadata = {
		title: t("meta.title"),
		/**
		 * Automatically set by next.js.
		 *
		 * @see https://nextjs.org/docs/app/api-reference/functions/not-found
		 */
		// robots: {
		// 	index: false,
		// },
	};

	return metadata;
}

export default function NotFoundPage(): ReactNode {
	const t = useTranslations("NotFoundPage");

	return (
		<html
			className={cn(fonts.body.variable, fonts.heading.variable)}
			lang={defaultLocale}
			/**
			 * Suppressing hydration warning because we add `data-ui-color-scheme` before first paint.
			 */
			suppressHydrationWarning={true}
		>
			<body>
				<MainContent className="container py-8">
					<PageTitle>{t("title")}</PageTitle>
				</MainContent>
			</body>
		</html>
	);
}
