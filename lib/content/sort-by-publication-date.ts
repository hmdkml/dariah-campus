import { compareDesc } from "date-fns";

export function sortByPublicationDate<T extends { data: { publicationDate: string } }>(
	entries: Array<T>,
) {
	return entries.toSorted((a, z) => {
		const aPublicationDate = new Date(a.data.publicationDate);
		const zPublicationDate = new Date(z.data.publicationDate);

		return compareDesc(aPublicationDate, zPublicationDate);
	});
}
