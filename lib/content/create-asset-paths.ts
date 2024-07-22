export function createAssetPaths(path: `/${string}/`) {
	return {
		directory: `./public/assets${path}`,
		publicPath: `/assets${path}`,
	};
}
