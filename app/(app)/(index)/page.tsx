import { assert, keyByToMap } from "@acdh-oeaw/lib";
import { ChevronDownIcon } from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import { Image } from "@/components/image";
import { Link } from "@/components/link";
import { MainContent } from "@/components/main-content";
import { createCollectionResource, createSingletonResource } from "@/lib/content/create-resource";

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
	const locale = await getLocale();
	const t = await getTranslations("IndexPage");

	const indexPage = await createSingletonResource("indexPage", locale).read();
	const people = await createCollectionResource("people", locale).all();
	const peopleById = keyByToMap(people, (person) => {
		return person.id;
	});

	const { browse, faq, hero, support, team, videos } = indexPage.data;

	return (
		<MainContent className="mx-auto grid w-full max-w-screen-lg content-start gap-y-24 px-4 py-8 xs:px-8 xs:py-16">
			<section className="grid gap-y-4 text-center">
				<Image alt="" className="mx-auto h-48 lg:h-60" src={hero.image} />
				<h1 className="text-5xl font-bold lg:text-6xl">{hero.title}</h1>
				<div className="text-xl text-neutral-500 lg:text-2xl">{hero.lead}</div>
			</section>

			<Section>
				<form role="search">
					<label>
						<div className="sr-only">{t("search")}</div>
						<input
							className="mx-auto w-full max-w-2xl rounded-full border border-neutral-200/50 px-6 py-4 text-lg shadow-xl transition placeholder:text-neutral-500"
							name="q"
							placeholder={t("search")}
							type="search"
						/>
					</label>
				</form>
			</Section>

			<Section>
				<SectionTitle>{browse.title}</SectionTitle>
				<SectionLead>{browse.lead}</SectionLead>
				<ul className="grid gap-8 py-6 md:grid-cols-3" role="list">
					{browse.cards.map((card, index) => {
						return (
							<li key={index}>
								<Card>
									<Image alt="" className="size-20" src={card.image} />
									<div className="grid gap-y-0.5">
										<h3 className="text-xl font-semibold">
											<Link href={card.href}>{card.title}</Link>
										</h3>
										<div className="text-neutral-500">{card.subtitle}</div>
									</div>
								</Card>
							</li>
						);
					})}
				</ul>
			</Section>

			<Section>
				<SectionTitle>{support.title}</SectionTitle>
				<SectionLead>{browse.lead}</SectionLead>
				<ul className="grid gap-8 py-6 md:grid-cols-2" role="list">
					{support.cards.map((card, index) => {
						return (
							<li key={index}>
								<Card>
									<Image alt="" className="aspect-video object-cover" src={card.image} />
									<div className="grid gap-y-0.5">
										<h3 className="text-xl font-semibold">
											<button type="button">{card.title}</button>
										</h3>
										<div className="text-neutral-500">{card.subtitle}</div>
									</div>
								</Card>
							</li>
						);
					})}
				</ul>
			</Section>

			<Section>
				<SectionTitle>{faq.title}</SectionTitle>
				<SectionLead>{faq.lead}</SectionLead>
				<div className="mx-auto grid w-full max-w-screen-md gap-y-6 py-6">
					{faq.entries.map(async (entry, index) => {
						const { default: Content } = await indexPage.compile(entry.answer);

						return (
							<details key={index} className="group text-left xs:text-lg" name="faq">
								<summary className="flex cursor-pointer items-center justify-between rounded-xl border border-neutral-200/50 p-6 shadow-md">
									{entry.question}
									<ChevronDownIcon
										aria-hidden={true}
										className="size-5 transition group-open:rotate-180"
									/>
								</summary>
								<div className="prose p-6 xs:prose-lg">
									<Content />
								</div>
							</details>
						);
					})}
				</div>
			</Section>

			<Section>
				<SectionTitle>{videos.title}</SectionTitle>
				<SectionLead>{videos.lead}</SectionLead>
				<ul className="grid gap-8 py-6 md:grid-cols-3" role="list">
					{videos.cards.map((card, index) => {
						return (
							<li key={index}>
								<Card>
									<Image alt="" className="aspect-video object-cover" src={card.image} />
									<div className="grid gap-y-0.5">
										<h3 className="text-xl font-semibold">
											<button type="button">{card.title}</button>
										</h3>
										<div className="text-neutral-500">{card.subtitle}</div>
									</div>
								</Card>
							</li>
						);
					})}
				</ul>
			</Section>

			<Section>
				<SectionTitle>{team.title}</SectionTitle>
				<SectionLead>{team.lead}</SectionLead>
				<ul className="grid grid-cols-2 gap-8 py-6 md:grid-cols-4" role="list">
					{team.members.map((member, index) => {
						const person = peopleById.get(member.person);
						assert(person, `Person "${member.person}" not found.`);

						const { image, name } = person.data;
						assert(image, "Team member must have an image.");

						return (
							<li key={index}>
								<article className="grid justify-items-center gap-y-2 text-center">
									<Image alt="" className="size-24 rounded-full" src={image} />
									<div className="grid gap-y-0.5">
										<h3 className="font-bold">{name}</h3>
										<div className="text-sm text-neutral-500">{member.role}</div>
									</div>
								</article>
							</li>
						);
					})}
				</ul>
			</Section>
		</MainContent>
	);
}

interface SectionProps {
	children: ReactNode;
}

function Section(props: SectionProps) {
	const { children } = props;

	return <section className="grid gap-y-2 text-center">{children}</section>;
}

interface SectionTitleProps {
	children: ReactNode;
}

function SectionTitle(props: SectionTitleProps) {
	const { children } = props;

	return <h2 className="text-3xl font-bold lg:text-4xl">{children}</h2>;
}

interface SectionLeadProps {
	children: ReactNode;
}

function SectionLead(props: SectionLeadProps) {
	const { children } = props;

	return <div className="text-lg text-neutral-500 lg:text-xl">{children}</div>;
}

interface CardProps {
	children: ReactNode;
}

function Card(props: CardProps) {
	const { children } = props;

	return (
		<article className="relative grid justify-items-center gap-y-4 rounded-xl border border-neutral-200/50 p-6 text-center shadow-md transition">
			{children}
		</article>
	);
}
