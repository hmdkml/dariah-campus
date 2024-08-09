import type { Metadata, ResolvingMetadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { Image } from "@/components/image";
import { Link } from "@/components/link";
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

export default async function IndexPage(_props: IndexPageProps): Promise<Awaited<ReactNode>> {
	const t = await getTranslations("IndexPage");

	const reader = createReader();
	const indexPage = await reader.singletons.indexPage.readOrThrow({ resolveLinkedFiles: true });

	return (
		<MainContent className="container py-8">
			<section>
				<h1>{indexPage.hero.title}</h1>
				<div>{indexPage.hero.leadIn}</div>
			</section>

			<section>
				<form role="search">
					<label>
						<div>{t("search")}</div>
						<input name="q" type="search" />
					</label>
				</form>
			</section>

			<section>
				<h2>{indexPage.browse.title}</h2>
				<div>{indexPage.browse.leadIn}</div>
				<ul role="list">
					{indexPage.browse.cards.map((card, index) => {
						return (
							<li key={index}>
								<article>
									<Image alt="" src={card.image} />
									<h3>
										<Link href={card.url}>{card.title}</Link>
									</h3>
									<div>{card.subtitle}</div>
								</article>
							</li>
						);
					})}
				</ul>
			</section>

			<section>
				<h2>{indexPage.support.title}</h2>
				<div>{indexPage.support.leadIn}</div>
				<ul role="list">
					{indexPage.support.cards.map((card, index) => {
						return (
							<li key={index}>
								<article>
									<Image alt="" src={card.image} />
									<h3>
										<button type="button">{card.title}</button>
									</h3>
									<div>{card.subtitle}</div>
								</article>
							</li>
						);
					})}
				</ul>
			</section>

			<section>
				<h2>{indexPage.faq.title}</h2>
				<div>{indexPage.faq.leadIn}</div>
				<div>
					{indexPage.faq.entries.map((entry, index) => {
						return (
							<details key={index} name="faq">
								<summary>{entry.question}</summary>
								<div>{entry.answer}</div>
							</details>
						);
					})}
				</div>
			</section>

			<section>
				<h2>{indexPage.videos.title}</h2>
				<div>{indexPage.videos.leadIn}</div>
				<ul role="list">
					{indexPage.videos.cards.map((card, index) => {
						return (
							<li key={index}>
								<article>
									<Image alt="" src={card.image} />
									<h3>
										<button type="button">{card.title}</button>
									</h3>
									<div>{card.subtitle}</div>
								</article>
							</li>
						);
					})}
				</ul>
			</section>

			<section>
				<h2>{indexPage.team.title}</h2>
				<div>{indexPage.team.leadIn}</div>
				<ul role="list">
					{indexPage.team.members.map((member, index) => {
						return (
							<li key={index}>
								<article>
									<Image alt="" src={member.image} />
									<h3>{member.name}</h3>
									<div>{member.role}</div>
								</article>
							</li>
						);
					})}
				</ul>
			</section>
		</MainContent>
	);
}
