import { useTranslations } from "next-intl";

import { AppNavLink } from "@/components/app-nav-link";
import type { LinkProps } from "@/components/link";
import { createReader } from "@/lib/content/create-reader";
import { createHref } from "@/lib/create-href";

// FIXME: return type annotation
export async function AppHeader() {
	const t = useTranslations("AppHeader");

	const links = {
		home: { href: createHref({ pathname: "/" }), label: t("links.home") },
	} satisfies Record<string, { href: LinkProps["href"]; label: string }>;

	const reader = createReader();
	const navigation = await reader.singletons.navigation.readOrThrow({ resolveLinkedFiles: true });

	return (
		<header className="border-b">
			<div className="container flex items-center justify-between gap-4 py-6">
				<nav aria-label={t("navigation-primary")}>
					<ul className="flex items-center gap-4 text-sm" role="list">
						{Object.entries(links).map(([id, link]) => {
							return (
								<li key={id}>
									<AppNavLink href={link.href}>{link.label}</AppNavLink>
								</li>
							);
						})}

						{/* eslint-disable-next-line consistent-return */}
						{navigation.links.map((link, index) => {
							switch (link.discriminant) {
								case "link": {
									return (
										<li key={index}>
											<AppNavLink href={link.value.href}>{link.value.label}</AppNavLink>
										</li>
									);
								}

								case "separator": {
									return <div role="separator" />;
								}

								case "menu": {
									throw new Error("Not yet implemented.");
								}
							}
						})}
					</ul>
				</nav>

				<div className="flex items-center gap-4"></div>
			</div>
		</header>
	);
}
