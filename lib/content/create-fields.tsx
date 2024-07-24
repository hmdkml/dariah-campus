import type { BasicFormField } from "@keystatic/core";

const doi: BasicFormField<string | null> = {
	kind: "form",
	Input(props) {
		return <input readOnly={true} value={props.value ?? undefined} />;
	},
	defaultValue() {
		return null;
	},
	parse(value) {
		return value != null ? String(value) : null;
	},
	serialize(value) {
		return { value: value ?? undefined };
	},
	validate(value) {
		return value;
	},
	reader: {
		parse(value) {
			return doi.parse(value);
		},
	},
	label: "DOI",
};
