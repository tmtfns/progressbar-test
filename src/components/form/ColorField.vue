<template>
	<div
		class="form-field form-field--color"
		:class="{ 'form-field--error': !!error }"
	>
		<div
			class="form-field__control"
			:class="{ focus: isFocus, value: !!modelValue }"
		>
			<Verte
				picker="square"
				model="hex"
				v-model="modelValue"
				v-if="isShow"
				menuPosition="bottom"
				:showHistory="null"
				:draggable="false"
				@close="closeHandler"
				@input="inputHandler"
			>
				<span @click="clickHandler" class="form-field__inp">
					{{ modelValue }}
					<svg class="verte__icon" viewBox="0 0 24 24">
						<pattern
							id="checkerboard"
							width="6"
							height="6"
							patternUnits="userSpaceOnUse"
							fill="FFF"
						>
							<rect
								fill="#7080707f"
								x="0"
								width="3"
								height="3"
								y="0"
							></rect>
							<rect
								fill="#7080707f"
								x="3"
								width="3"
								height="3"
								y="3"
							></rect>
						</pattern>
						<circle
							cx="12"
							cy="12"
							r="12"
							fill="url(#checkerboard)"
						></circle>
						<circle cx="12" cy="12" r="12"></circle>
					</svg>
				</span>
			</Verte>
			<label class="form-field__label">{{ label }}</label>
		</div>
		<div class="form-field__error" v-if="error">{{ error }}</div>
	</div>
</template>

<script setup lang="ts">
import type { FieldProps } from '@/types/form';
import Verte from 'verte-vue3';
import 'verte-vue3/dist/verte.css';
import { ref, onMounted } from 'vue';

interface ColorFieldProps extends FieldProps {
	isModal?: boolean;
}

const props = withDefaults(defineProps<ColorFieldProps>(), {
	isModal: false,
});
const modelValue = defineModel<any>();

const emit = defineEmits<{
	(event: 'reset-error', name: string): void;
}>();
const isFocus = ref<boolean>(false);
const isShow = ref<boolean>(props.isModal ? true : false);

onMounted(() => {
	if (props.isModal) {
		setTimeout(() => {
			isShow.value = true;
		}, 400);
	}
});

function inputHandler() {
	if (props.error) {
		emit('reset-error', props.name);
	}
}
function clickHandler() {
	isFocus.value = true;
}
function closeHandler() {
	isFocus.value = false;
}
</script>
