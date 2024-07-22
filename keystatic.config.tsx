import { config } from "@keystatic/core";

import { Logo } from "@/components/logo";
import { env } from "@/config/env.config";
import { defaultLocale } from "@/config/i18n.config";
import { curricula, events, people, resources } from "@/lib/content/collections";

// eslint-disable-next-line import-x/no-default-export
export default config({
	collections: {
		curricula: curricula(defaultLocale),
		events: events(defaultLocale),
		people: people(defaultLocale),
		resources: resources(defaultLocale),
	},
	singletons: {},
	storage:
		env.NEXT_PUBLIC_KEYSTATIC_MODE === "github" &&
		env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER &&
		env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_NAME
			? {
					kind: "github",
					repo: {
						owner: env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER,
						name: env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO_NAME,
					},
					branchPrefix: "content/",
				}
			: {
					kind: "local",
				},
	ui: {
		brand: {
			mark() {
				return <Logo />;
			},
			name: "DARIAH-Campus",
		},
		navigation: {
			content: ["curricula", "events", "resources"],
			data: ["people"],
		},
	},
});
