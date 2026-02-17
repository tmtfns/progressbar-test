<template>
	<div class="sectors-chart">
		<div class="sectors-chart__canvas">
			<Pie
				:data="dataSet"
				:options="{ responsive: true, maintainAspectRatio: true }"
			/>
		</div>
		<ul class="sectors-chart__items list-unstyled">
			<li v-for="item in list" :key="item.id" class="sectors-chart__item">
				<ColorMark :color="item.color" type="small" />
				<span class="sectors-chart__item-label">{{ item.name }}</span>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Pie } from 'vue-chartjs';
import { computed } from 'vue';
import { useSectorStore } from '@/stores/sector';
import { storeToRefs } from 'pinia';
import type { Sector } from '@/types/sectors';
import ColorMark from './ColorMark.vue';
const sectorStore = useSectorStore();
const { list } = storeToRefs(sectorStore);

ChartJS.register(ArcElement);

const dataSet = computed(() => {
	const labels: string[] = [];
	const bg: string[] = [];
	const vals: number[] = [];
	list.value.forEach((sector: Sector) => {
		labels.push(sector.name);
		bg.push(sector.color);
		vals.push(sector.percent);
	});
	return {
		datasets: [
			{
				backgroundColor: bg,
				data: vals,
			},
		],
	};
});
</script>

<style lang="scss">
.sectors-chart {
	@include make-col(6, 88px);

	@include breakpoint(t) {
		padding-left: 15px;
		padding-right: 15px;
	}
	@include breakpoint(ts) {
		@include change-col-width(12);
	}
	&__canvas {
		max-width: 500px;

		@include breakpoint(ts) {
			text-align: center;
			margin: 0 auto;
			canvas {
				margin: 0 auto;
			}
		}
	}
	&__items {
		margin-top: 42px;
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		justify-content: center;
		gap: 30px;

		@include breakpoint(m) {
			margin-top: 30px;
			gap: 20px;
		}
	}
	&__item {
		line-height: 1;
		display: inline-flex;
		align-items: center;
		flex-flow: row nowrap;
		justify-content: flex-start;
		gap: 12px;
	}
	&__item-label {
		font-size: 15px;
		$color: $label-color;
		word-wrap: break-word;
		overflow-wrap: break-word;
	}
}
</style>
