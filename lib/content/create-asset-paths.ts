export function createAssetPaths(path: `/${string}/`) {
	return {
		directory: `./public/assets${path}`,
		publicPath: `/assets${path}`,
		transformFilename(originalFilename: string) {
			return originalFilename;
		},
	};
}
