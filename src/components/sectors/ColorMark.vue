<template>
	<span
		class="color-mark"
		:class="computedClasses"
		:style="{ backgroundColor: color }"
	></span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{ color: string; type?: 'small' | 'big' }>();
const computedClasses = computed(() => {
	if (props.type) {
		return 'color-mark--' + props.type;
	}
	return null;
});
</script>

<style lang="scss">
.color-mark {
	display: inline-block;
	font-size: 0;
	line-height: 1;
	width: 20px;
	height: 20px;
	min-width: 20px;
	border-radius: 50%;
}
.color-mark--small {
	width: 14px;
	height: 14px;
	min-width: 14px;
}
</style>
