<template>
	<main class="page-main">
		<div class="container">
			<h1 class="page-head">Круговая диаграмма</h1>
			<div class="sectors">
				<SectorsList />
				<SectorsChart />
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import SectorsList from '@/components/sectors/SectorsList.vue';
import SectorsChart from '@/components/sectors/SectorsChart.vue';
</script>

<style lang="scss">
.sectors {
	@include make-row(88px);
	flex-wrap: nowrap;

	@include breakpoint(t) {
		margin-left: -15px;
		margin-right: -15px;
	}

	@include breakpoint(ts) {
		flex-wrap: wrap;
	}
}
</style>
