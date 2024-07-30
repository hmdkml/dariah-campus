import { TextField } from "@keystar/ui/text-field";
import type { BasicFormField, FormFieldStoredValue } from "@keystatic/core";

export function identifier({
	label,
	description,
}: {
	label: string;
	description?: string;
}): BasicFormField<string> {
	return {
		kind: "form",
		Input(props) {
			return <TextField {...props} description={description} isReadOnly={true} label={label} />;
		},
		defaultValue() {
			return "";
		},
		parse(value) {
			return parse(value);
		},
		serialize(value) {
			return { value: value === "" ? undefined : value };
		},
		validate(value) {
			return validate(value);
		},
		reader: {
			parse(value) {
				return validate(parse(value));
			},
		},
		label,
	};
}

function parse(value: FormFieldStoredValue) {
	if (value === undefined) {
		return "";
	}
	if (typeof value !== "string") {
		throw new Error("Must be a string");
	}
	return value;
}

function validate(value: string) {
	return value;
}
