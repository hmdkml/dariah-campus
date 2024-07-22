import { cookies, draftMode } from "next/headers";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

export function DraftModeToggle(): ReactNode {
	const t = useTranslations("DraftModeToggle");

	const { isEnabled } = draftMode();

	if (!isEnabled) return null;

	const branch = cookies().get("ks-branch")?.value;

	return (
		<div className="mb-8 flex w-full items-center justify-between gap-x-8 rounded-md bg-notice px-3 py-1.5 text-sm font-medium text-white">
			<span>
				{t("draft-mode")}
				{branch != null ? ` (${branch})` : null}
			</span>
			<form action="/api/preview/end" method="post">
				<Button type="submit">{t("end-preview")}</Button>
			</form>
		</div>
	);
}
