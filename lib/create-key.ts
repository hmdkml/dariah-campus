type NonEmptyArray<T> = [T, ...Array<T>];
type NonEmptyString<T extends string> = T extends "" ? never : T;

export function createKey<T extends string>(...segments: NonEmptyArray<NonEmptyString<T>>): string {
	return segments.join(":");
}
