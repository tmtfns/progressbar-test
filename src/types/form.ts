export interface FieldProps {
	label?: string;
	name: string;
	error?: string;
	disabled?: boolean;
	required?: boolean;
}

export interface ValidationType {
	[key: string]: string;
}

export interface FormDataType {
	[key: string]: any;
}
export interface FormRule {
	required?: boolean;
	email?: boolean;
	number?: boolean;
	digits?: boolean;
	maxlength?: number;
	minlength?: number;
	rangelength?: number[];
	max?: number;
	min?: number;
	range?: number[];
}
export interface FormRules {
	[key: string]: FormRule;
}
