<template>
	<div class="form-field" :class="{ 'form-field--error': !!error }">
		<div class="form-field__control">
			<input
				v-model="modelValue"
				class="form-field__inp"
				:name="name"
				@input="inputHandler"
				:type="type"
				:disabled="disabled"
				:required="required"
				placeholder=""
			/>
			<label class="form-field__label">{{ label }}</label>
		</div>
		<div class="form-field__error" v-if="error">{{ error }}</div>
	</div>
</template>

<script setup lang="ts">
import type { FieldProps } from '@/types/form';

interface InputFieldProps extends FieldProps {
	type: string;
}

const props = withDefaults(defineProps<InputFieldProps>(), {
	type: 'text',
});
const modelValue = defineModel<any>();

const emit = defineEmits({
	'reset-error': (name: string) => {},
});

function inputHandler() {
	if (props.error) {
		emit('reset-error', props.name);
	}
}
</script>
