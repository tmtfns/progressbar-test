<template>
	<svg
		:width="size"
		:height="size"
		:viewBox="viewBox"
		class="progress"
		:class="{ 'progress--dashboard': isDashboard }"
		:style="{ marginBottom: `-${heightOffset}px` }"
	>
		<!-- background :height="isDashboard ? size / 2 : size" -->
		<circle
			:cx="size / 2"
			:cy="size / 2"
			:r="radius"
			fill="none"
			stroke="#f6f7fa"
			:stroke-width="stroke"
			:stroke-dasharray="
				isDashboard
					? circumferenceDash + ' ' + circumference
					: circumference
			"
			:stroke-dashoffset="isDashboard ? 0 : 0"
			stroke-linecap="round"
			class="progress__bg"
		/>

		<!-- progress -->
		<circle
			:cx="size / 2"
			:cy="size / 2"
			:r="radius"
			fill="none"
			:stroke="color"
			:stroke-width="stroke"
			:stroke-dasharray="
				isDashboard
					? circumferenceDash + ' ' + circumference
					: circumference
			"
			:stroke-dashoffset="dashOffset"
			stroke-linecap="round"
			class="progress__value"
		/>

		<!-- content -->
		<transition name="label-fade" :duration="200">
			<path
				v-if="status === ProgressBarStatuses.success"
				class="label2 label-succcess"
				:style="iconsStyles"
				fill="#12ce66"
				d="M 26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 L 11 21.585938 L 4.7070312 15.292969 A 1.0001 1.0001 0 1 0 3.2929688 16.707031 L 10.292969 23.707031 A 1.0001 1.0001 0 0 0 11.707031 23.707031 L 27.707031 7.7070312 A 1.0001 1.0001 0 0 0 26.980469 5.9902344 z"
			/>
			<path
				v-else-if="status === ProgressBarStatuses.warning"
				class="label2 label-warn"
				:style="iconsStyles"
				fill="#e7a23d"
				d="M30,15c0,8.3-6.7,15-15,15S0,23.3,0,15S6.7,0,15,0S30,6.7,30,15z M15,7.5c-0.9,0-1.7,0.8-1.7,1.7c0,0.1,0,0.1,0,0.2l0.7,6.6
    c0,0.6,0.5,1,1.1,0.9c0.5,0,0.9-0.4,0.9-0.9l0.7-6.6c0.1-0.9-0.6-1.8-1.5-1.9C15.1,7.5,15.1,7.5,15,7.5z M15,18.8
    c-1,0-1.9,0.8-1.9,1.9s0.8,1.9,1.9,1.9s1.9-0.8,1.9-1.9S16,18.8,15,18.8z"
			/>
			<path
				v-else-if="status === ProgressBarStatuses.error"
				class="label2 label-error"
				:style="iconsStyles"
				fill="#ff4949"
				d="M2.3,0L0.1,2.3L12.7,15L0,27.7L2.2,30L15,17.2L27.7,30l2.3-2.3L17.3,15L29.9,2.3L27.7,0L15,12.7L2.3,0z"
			/>
			<text
				v-else
				x="50%"
				y="50%"
				dominant-baseline="middle"
				text-anchor="middle"
				class="label"
			>
				{{ percent }}%
			</text>
		</transition>
	</svg>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import type { ProgressBarProps } from '@/types/progress';
import { ProgressBarStatuses } from '@/types/progress';
import { getProgressColor } from '@/utils/progress';

const props = withDefaults(defineProps<ProgressBarProps>(), {
	value: 0,
	total: 100,
	status: ProgressBarStatuses.inProgress,
	size: 250,
	stroke: 12,
	isDashboard: false,
});

const radius = computed(() => (props.size - props.stroke) / 2);
const circumference = computed(() => 2 * Math.PI * radius.value);
const circumferenceDash = computed(() => 1.5 * Math.PI * radius.value);
const percent = computed(() => Math.round((props.value * 100) / props.total));
const dashOffset = ref(circumference.value);

const heightOffset = computed(() => {
	if (props.isDashboard) {
		const h =
			(radius.value - props.stroke) *
			(1 - Math.cos((45 * Math.PI) / 180));
		return Math.ceil(h);
	}
	return 0;
});
const iconsStyles = computed(() => {
	const center = (props.size - 30) / 2;
	const deg = props.isDashboard ? -135 : 90;
	return {
		transform: props.isDashboard
			? `rotate(${deg}deg) translate(${center}px, ${center}px)`
			: `translate(-${center}px, ${center}px) rotate(${deg}deg)`,
	};
});

watch(
	() => props.value,
	(v) => {
		const line = props.isDashboard
			? circumferenceDash.value
			: circumference.value;
		dashOffset.value = line - (v / props.total) * line;
	},
	{ immediate: true }
);

const color = computed(() => {
	return getProgressColor(props.status, percent.value);
});

const viewBox = computed(() =>
	props.isDashboard
		? `0 0 ${props.size} ${props.size}` //`0 0 ${props.size} ${props.size / 2}`
		: `0 0 ${props.size} ${props.size}`
);
</script>

<style lang="scss">
.progress {
	transform: rotate(-90deg);
	transition: margin 0.2s linear;
	&__value {
		transition:
			stroke-dashoffset 0.2s ease,
			stroke 0.2s ease;
	}
	.label {
		font-size: 30px;
		fill: #68696d;
		transform: rotate(90deg);
		transform-origin: center;
		line-height: 30px;
	}
	.label2 {
		transform-origin: center;
	}
	.label-fade-enter-active,
	.label-fade-leave-active {
		transition: opacity 0.5s ease;
	}
	.label-fade-enter-from,
	.label-fade-leave-to {
		opacity: 0;
	}
}

.progress.progress--dashboard {
	transform: rotate(135deg);

	.label {
		transform: rotate(-135deg);
	}
}
</style>
