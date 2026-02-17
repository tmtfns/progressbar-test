<template>
	<canvas ref="canvas" :width="size" :height="size - heightOffset"></canvas>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue';
import type { ProgressBarProps, ProgressColor } from '@/types/progress';
import { ProgressBarStatuses } from '@/types/progress';
import { getProgressColor, parseRGB, animatedColor} from '@/utils/progress';

const iconData = {
	success:
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAAnCAYAAACv+ADgAAAACXBIWXMAABcRAAAXEQHKJvM/AAABYklEQVRogd3ZzW3CMBjG8T+Ieyu8ACOECcoIjNATuTJKr5zaUZiAdIOyAIdOkMqSqayUfDix4/ftIzmH92D5J3/IVqjr+l+09eWwuTuWKI+pyr2pyivwZaryw2pWmkmmKl+Bd6+0tx+1M/UAZPOJVlQL6DfqUB2gb+CINlQPaHfbnnQtv6EgtKBCQGhAhYKQjhoDQjJqLAipqCkgJKKmgpCGigFCEioWCCmomCAkoGKDyI1KASInKhXIZrG+HArgzasdp3Q4JClBuJl6Bl68djZVWWgF0bL8nlLB5gDhUFfXqZ/osLlANsvb9mRRu5SwOUHcl5/rNAlsbhD+nkoBywGieVDEhOUC8ej0iwHLCaLtRjEFlhtE1zVpDEwCiL67XwhMCshmYf/n9MUN/uwwfwYMFFJADEXRD2vWyAUiBEU3rJlsIELfUx17zE9WEGMeiT2w7CDGvnxbYCJANkF7SkWAH5XRwQaxkxOfAAAAAElFTkSuQmCC',
	error: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA/CAYAAABXXxDfAAAACXBIWXMAABcRAAAXEQHKJvM/AAACrklEQVRogd3bwXXTQBSF4T9qADqADuISvI02uANCBykBKqAEQgXAZtZ0AOnAdIArMEeWXhjLijTSvDej8d35eI7j71qRraczN8fjkbPU9Q7Y49xvriV1/QA84txfX1T14PfAN+Andb25CnpdPwKfO9Nr/6nKW9TAv3SPXl1FAS38fffotl9A1S3y4ZKyCziHS84KuDne3Q3B/RyAbVHngGG4n6fG1HzyDxMvVdYRMA1vciv4bdfEWMooIAze5APOfa+603/5BcyDN2u7E17pBSyAc/ZVV2oBC+Fc/MgprYAIOBd4CiogEs4gngIKUIDzIp4VF6AEZxTPCgtQhDOJZ0UFKMMJwrOCAgzgBOPJWIARnFl4MhRgCGc2noQFGMNZhCdBAQngLMZjWEAiOFF4DApICCcaj2IBieGo4FEoIAMcNTwRBWSCc5re9u/YxKYdC+875FgOpxLgXcBf/IRzH3XfqAWeUwGbDjZVQEi+4ty9/pvUPOz9tDP+bffpxsQMjhkelQJM4ZjiiSrAHI7Z/3w/7TngV+DqHzi3s39T1p/8/0zdEvOzTTUSs8eHf49Lks0EbfHz4ZIkBdjhl8Ml5gXY4MPhfyaeNy1AHz/ntzpsck6FdfFzL1IyT4X18EuvzjIWoIOPvSzNVEA8Xut6PEMBcXjtQUTiApbjrSYwCQtYhrcePSUqYD4+1cwtQQHz8KmHjcYFhONzTVkNCwjDZxwvn2JUwDQ+N1xiUMA4fi1wiXIBL+PXBpcoFjCMXytcolTAJX7tcIlCAf0NRmXAJZEF+BuMyoJLIgqQDUZlwiULC2g2GJUN99PeHm9ukb2ZWHmQPTYhv4bWD+f5CNgF3BtsjoC3VcDiMuCSsJujzxuM9iOLy4JLxgu42GA0tLhMuCTA5G8w8heXDZeMmYB/zm7+rS8/iAwAAAAASUVORK5CYII=',
	warning:
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA/CAYAAABXXxDfAAAACXBIWXMAABcRAAAXEQHKJvM/AAAD1UlEQVRogeVby3HbMBDdcHy3cuMt6sCugJYriFIAJ3IFcQe2O1AHkYYFxOpAYQOxOrBvPEoVOLPMg0zxA4IUsBCjN6PxjESTfLuLxeJh8en9/Z1cI0uiMRHx55qIRprHvRDRNozTtfOXIiIn5EF2SkQTfC573GZDRGyEdRinz9Zf0ib5LIlGIHxPRFdWbvqBHRGxAeZhnL7YuunR5EH6Hp8+Hu6K30T0aGNoHEU+S6JHQdJlsBHuj4mEXuSzJOLEtXAQ3n3wFMbpY59/7Ewe3n5wRKQvODnOukaBMXmMbfb2V0FSXbCDAYxnBiPyIL4+kTBvw10YpwuTC4O2CwZGnPEzS6KZyYVa8gMkrmBkgDbPD5G4AhtgqrugkXyWRKcylR2DBablWtSSh8W+D4FdCy4xQ9WiQh6LEqNsORBcoTapoM7zc0/lqks81IX/AfksiSZCRQxXZHdEdMvlKQoU15iX739Q5GRJxNn9xvFLrMI4PcjC8MofAQPcFleDe8/D666JE1aBB0BNvhR49sHYL4Z95aUcYBPG6WvDbZ2oNSXcFMd+Th4ZXmKsj3v+ZhN7JyvPayshi9DNIjph0yb2XBV5o4WADWC94JP8pSp7A7yMZBnbVG42lqEOwMk99/xE8KGngj15SYuTxtgS06xCHunn6vm8rgkEE41CZUrDVCuNUeBhzV5H1Af561YNzwHqIk06+nL4IF8XadJJN4cP8icDL+RrhIWz8nx5jJ/NmKdibYHy2ovnLyAhSWt2DyC9xSrLh2a4vUAfjGRpqfDDwzOLeOGwb1JW/ne8BvD8uWHHclqA/TgfeENriQ/knAMopxK6ucIOEvI4jFPO+p+FlNsi/pHHFxLKqcKkqJ2HccpNhyyjrQTfIecrTX6p6ZuRkM6pKJ/n5NHH8ibw4MaZRaPn28Z+26pY4UnszDaWsRpV1yZ2xSgvkp8LJL6phqSEfM7tq1xV5tiTx5eVnUzL+MLPKBsA+4S9Ggk7YFfmV96lHWFcuq61Vfi9oraXkNIqnZqVPjzsZvwSeBlJcIbXNyfQR+aXnHMlUJtPmtbzM+GqzyWemmqLxvZTwW4Jl6h0gRTRqOTAWncDJU2qE1t3gVbGQgPvEA2wwRpiq7uoVcMboAGMiJOpgDkgAxgTp64nLZAE1yfapLjE0tgYnaRrJMHxidUBPCV/60qcjjldhUpw4TkKVjhaYhTmZRx7tEz6TJ2ClbN1Vk5UFowww8rNFVZYlloRXa2fpcVwmFrcidlgeD3bVnucnqLG7MBrdf6rTlHrDMJEefyyZzm58iHiXuO5FUT0F323XFedqQ7GAAAAAElFTkSuQmCC',
};

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
const percent = computed(() => Math.round((props.value * 100) / props.total));
const dashOffset = ref(circumference.value);
const iconAlpha = ref(0);

const heightOffset = computed(() => {
	if (props.isDashboard) {
		const h =
			(radius.value - props.stroke) *
			(1 - Math.cos((45 * Math.PI) / 180));
		return Math.ceil(h);
	}
	return 0;
});

const canvas = ref<HTMLCanvasElement | null>(null);
let lastProgressColor: string = '';
let parsedProgressColor: ProgressColor | null = null;
let startOpacityTime: number;
const opacityDuration = 200;

const color = computed(() => {
	return getProgressColor(props.status, percent.value);
});

// Логика для анимации
let animationFrameId: number | null = null;


const animateProgress = () => {
	if (dashOffset.value <= 0) return;
	const step = (circumference.value - dashOffset.value) * 0.00001;
	dashOffset.value -= step;
	drawCanvas();
	if (dashOffset.value > 0) {
		animationFrameId = requestAnimationFrame(animateProgress);
	}
};

const animateStatus = (time: number) => {
	if (iconAlpha.value >= 1) return;
	iconAlpha.value = (time - startOpacityTime) / opacityDuration;
	drawCanvas();
	if (iconAlpha.value < 1) {
		animationFrameId = requestAnimationFrame(animateStatus);
	}
};

// Функция для рисования на канвасе
const drawCanvas = () => {
	const ctx = canvas.value?.getContext('2d');
	if (!ctx) return;

	ctx.clearRect(0, 0, props.size, props.size);
	const center = props.size / 2;
	const radiusValue = radius.value;

	// Фон прогресса
	ctx.beginPath();
	ctx.lineCap = 'round';
	if (props.isDashboard) {
		ctx.arc(
			center,
			center,
			radiusValue,
			(-225 * Math.PI) / 180,
			(45 * Math.PI) / 180,
			false
		);
	} else {
		ctx.arc(center, center, radiusValue, 0, 2 * Math.PI);
	}

	ctx.lineWidth = props.stroke;
	ctx.strokeStyle = '#f6f7fa';
	ctx.stroke();

	// Прогресс
	ctx.beginPath();
	if (props.isDashboard) {
		ctx.arc(
			center,
			center,
			radiusValue,
			(-225 * Math.PI) / 180,
			(-225 * Math.PI) / 180 + 1.5 * Math.PI * (props.value / props.total)
		);
	} else {
		ctx.arc(
			center,
			center,
			radiusValue,
			-Math.PI / 2,
			-Math.PI / 2 + 2 * Math.PI * (props.value / props.total)
		);
	}
	ctx.lineWidth = props.stroke;
	let fill = color.value;
	if (props.status == ProgressBarStatuses.inProgress) {
		lastProgressColor = fill;
	} else if((props.status == ProgressBarStatuses.warning) || (props.status == ProgressBarStatuses.error)) {
		fill = animatedColor(parsedProgressColor, props.status, iconAlpha.value);
	}
	ctx.strokeStyle = fill;
	ctx.stroke();

	if (props.status == ProgressBarStatuses.inProgress) {
		// Текст с процентом
		ctx.fillStyle = '#68696d';
		ctx.font = '30px Arial';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(`${percent.value}%`, center, center);
	} else if (props.status) {
		const imgData =
			props.status == ProgressBarStatuses.success
				? iconData.success
				: props.status == ProgressBarStatuses.error
					? iconData.error
					: iconData.warning;
		ctx.globalAlpha = iconAlpha.value;
		const image = new Image();
		image.onload = function () {
			ctx.drawImage(
				image,
				0,
				0,
				63,
				63,
				center - 15,
				center - 15,
				30,
				30
			);
			ctx.globalAlpha = 1.0;
		};
		image.src = imgData;
	}
};

// Отслеживаем изменения в value и запускаем анимацию
watch(
	() => props.value,
	() => {
		dashOffset.value = circumference.value;
		cancelAnimationFrame(animationFrameId!);
		animationFrameId = requestAnimationFrame(animateProgress);
	},
	{ immediate: true }
);

watch(
	() => props.status,
	() => {
		if (props.status == ProgressBarStatuses.inProgress) return;
		if ((props.status == ProgressBarStatuses.warning) || (props.status == ProgressBarStatuses.error)) {
			parsedProgressColor = parseRGB(lastProgressColor);
		}
		iconAlpha.value = 0;
		cancelAnimationFrame(animationFrameId!);
		startOpacityTime = performance.now();
		animationFrameId = requestAnimationFrame(animateStatus);
	},
	{ immediate: true }
);

onMounted(() => {
	drawCanvas();
});
</script>
