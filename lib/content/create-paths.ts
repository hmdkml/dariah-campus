import type { Locale } from "@/config/i18n.config";

export function createPaths(path: `/${string}/`, locale: Locale) {
	return {
		assetPath: `/${locale}${path}` as const,
		contentPath: `./${locale}${path}*/` as const,
	};
}
