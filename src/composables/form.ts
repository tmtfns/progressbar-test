import { ref } from 'vue';
import type { ValidationType, FormDataType, FormRules } from '@/types/form';

const Validator = {
	isValue: function (value: any) {
		return value !== undefined && value !== null && value.length > 0;
	},
	getLength: function (value: any): number {
		if (Array.isArray(value)) return value.length;
		if (typeof value === 'string') return value.length;
		if (typeof value === 'number') return value.toFixed().length;
		return 0;
	},
	required: function (value: any) {
		return (
			value !== undefined && value !== null && this.getLength(value) > 0
		);
	},
	email: function (value: any) {
		if (value && typeof value === 'string') {
			return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
				value
			);
		}
		return true;
	},
	number: function (value: any) {
		if (value) {
			if (typeof value === 'number') {
				return true;
			}
			if (typeof value === 'string') {
				return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:-?\.\d+)?$/.test(
					value
				);
			}
		}
		return true;
	},
	digits: function (value: any): boolean {
		if (value) {
			if (typeof value === 'number') {
				return true;
			}
			if (typeof value === 'string') {
				//return false;
				return /^\d+$/.test(value);
			}
		}
		return true;
	},
	minlength: function (value: any, param: number) {
		if (!value) return true;
		return this.getLength(value) >= param;
	},
	maxlength: function (value: any, param: number) {
		if (!value) return true;
		return this.getLength(value) <= param;
	},
	rangelength: function (value: any, param: number[]) {
		if (!value) return true;
		if (
			param.length < 2 ||
			typeof param[0] != 'number' ||
			typeof param[1] != 'number'
		)
			return true;
		const length = this.getLength(value);
		return length >= param[0] && length <= param[1];
	},
	min: function (value: any, param: number) {
		let val: number;
		if (value) {
			if (typeof value === 'number') {
				val = value;
			} else if (typeof value === 'string') {
				val = +value;
			} else {
				return false;
			}
			return val >= param;
		}
		return true;
	},
	max: function (value: any, param: number) {
		let val: number;
		if (value) {
			if (typeof value === 'number') {
				val = value;
			} else if (typeof value === 'string') {
				val = +value;
			} else {
				return false;
			}
			return val <= param;
		}
		return true;
	},
	range: function (value: any, param: number[]) {
		let val: number;
		if (
			param.length < 2 ||
			typeof param[0] != 'number' ||
			typeof param[1] != 'number'
		)
			return true;
		if (value) {
			if (typeof value === 'number') {
				val = value;
			} else if (typeof value === 'string') {
				if (isNaN(+value)) return false;
				val = +value;
			} else {
				return false;
			}

			return val >= param[0] && val <= param[1];
		}
		return true;
	},
};

const getValidatorMessage = function (key: string, param: any) {
	switch (key) {
		//'required' 'email' 'number' 'digits' 'maxlength' 'minlength' 'rangelength' 'max' 'min' 'range'
		case 'required':
			return 'Это обязательное поле';
		case 'email':
			return 'Введите емайл';
		case 'number':
			return 'Введите номер';
		case 'digits':
			return 'Введите только цифры';
		case 'maxlength':
			return `Введите не более ${param} символов`;
		case 'minlength':
			return `Введите не менее ${param} символов`;
		case 'rangelength':
			return `Введите не менее ${param[0]} символов и не более ${param[1]} символов`;
		case 'max':
			return `Введите число не более ${param}`;
		case 'min':
			return `Введите число не менее ${param}`;
		case 'range':
			return `Введите число не менее ${param[0]} и не более ${param[1]}`;

		default:
			return '';
	}
};

export function useValidation() {
	const validation = ref<ValidationType>({});

	function resetError(name: string) {
		if (validation.value[name]) {
			delete validation.value[name];
		}
	}

	function validateForm(data: FormDataType, rules: FormRules): boolean {
		const errors = {};
		Object.keys(rules).forEach((key) => {
			const list = rules[key];
			const value = data[key];
			if (!list) return;
			const r = Object.keys(list);
			if (!Array.isArray(r)) return;
			let rk: string | undefined;
			for (let i = 0; i < r.length; i++) {
				rk = r[i];
				if (typeof rk !== 'string') continue;
				if (typeof Validator[rk] == 'undefined') continue;
				if (!Validator[rk](value, list[rk])) {
					errors[key] = getValidatorMessage(rk, list[rk]);
					break;
				}
			}
		});
		console.log(errors);
		validation.value = errors;
		if (Object.keys(errors).length > 0) {
			return false;
		}
		return true;
	}

	return {
		validation,
		resetError,
		validateForm,
	};
}
