import type { Locale } from "@/config/i18n.config";

export function createPaths(path: `/${string}/`, locale: Locale) {
	return {
		assetPath: `/content/${locale}${path}` as const,
		contentPath: `./content/${locale}${path}*/` as const,
	};
}
