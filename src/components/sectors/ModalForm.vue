<template>
	<transition name="modal" :duration="300">
		<div class="form-modal" v-if="modelValue">
			<div class="form-modal__bg" @click="closeModal"></div>
			<div class="form-modal__container">
				<div class="form-modal__inner">
					<form
						@submit.prevent="submitHandler"
						novalidate
						name="sector-form"
						class="form-modal__form"
					>
						<h3 class="head head--h3">Добавление сектора</h3>
						<InputField
							type="text"
							label="Наименование"
							v-model="formData.name"
							name="name"
							:required="true"
							:error="validation.name"
							@reset-error="resetError"
						/>
						<InputField
							type="number"
							label="Значение"
							v-model="formData.percent"
							name="percent"
							:required="true"
							:error="validation.percent"
							@reset-error="resetError"
						/>
						<ColorField
							label="Цвет"
							v-model="formData.color"
							name="color"
							:required="true"
							:is-modal="true"
							:error="validation.color"
							@reset-error="resetError"
						/>
						<button type="submit" class="btn btn-solid btn-fw">
							Добавить сектор
						</button>
					</form>
				</div>
			</div>
		</div>
	</transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Sector, SectorData } from '@/types/sectors';
import { useValidation } from '@/composables/form';
import { useSectorStore } from '@/stores/sector';
import InputField from '../form/InputField.vue';
import ColorField from '../form/ColorField.vue';

const setDefaultFormData = (): SectorData => {
	return {
		name: '',
		percent: 0,
		color: '#000000',
	};
};

const formData = ref<SectorData>(setDefaultFormData());

interface ModalFormProps {
	sector: Sector | null;
}

const props = defineProps<ModalFormProps>();
const modelValue = defineModel<boolean>();

const { validation, resetError, validateForm } = useValidation();
const sectorStore = useSectorStore();

watch(modelValue, (newVal) => {
	if (newVal) {
		if (props.sector && props.sector.id) {
			formData.value.name = props.sector.name;
			formData.value.percent = props.sector.percent;
			formData.value.color = props.sector.color;
		} else {
			formData.value = setDefaultFormData();
		}
	}
});

function closeModal() {
	modelValue.value = false;
}
function submitHandler() {
	const sum = sectorStore.getPercentSum(
		props.sector ? props.sector.id : undefined
	);
	const isValid = validateForm(formData.value, {
		name: {
			required: true,
			maxlength: 100,
		},
		percent: {
			required: true,
			max: 100 - sum, //total no more 100 %
		},
		color: {
			required: true,
		},
	});
	if (isValid) {
		if (props.sector && props.sector.id) {
			sectorStore.updateSector(props.sector.id, formData.value);
		} else {
			sectorStore.addSector(formData.value);
		}

		modelValue.value = false;
	}
}
</script>

<style lang="scss">
.form-modal {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	z-index: 2000;

	&__bg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}
	&__container {
		max-width: 100vw;
		max-height: 80vh;
		padding: 20px 0;
		width: 390px;
		background: #ffffff;
		border-radius: 15px;
		z-index: 1;
	}
	&__inner {
		max-height: 100%;
		overflow-y: auto;
		padding: 0 20px 0 20px;
	}
	.head--h3 {
		margin-bottom: 20px;
	}
	.form-field {
		margin-bottom: 20px;
	}
	.btn-solid {
		margin-top: 6px;
	}
}
.modal-enter-active,
.modal-leave-active {
	.form-modal__bg {
		transition: opacity 0.3s ease;
	}
	.form-modal__container {
		transition:
			transform 0.3s ease,
			opacity 0.3s ease;
	}
}

.modal-enter-from,
.modal-leave-to {
	.form-modal__bg {
		transition: opacity 0;
	}
	.form-modal__container {
		opacity: 0;
		transform: scale(0.1);
	}
}
.modal-enter-to,
.modal-leave-from {
	.form-modal__bg {
		transition: opacity 1;
	}
	.form-modal__container {
		opacity: 1;
		transform: scale(1);
	}
}
</style>
