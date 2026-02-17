<template>
	<div class="sectors-list">
		<ul class="sectors-list__items list-unstyled">
			<SectorItem
				v-for="item in list"
				:key="item.id"
				:item="item"
				@edit="editHandler"
				@remove="removeHandler"
			/>
		</ul>
		<div class="sectors-list__action">
			<button
				type="button"
				:disabled="isOpenForm"
				class="btn btn-solid btn-fw"
				@click="addHandler"
			>
				Добавить сектор
			</button>
		</div>
		<ModalForm v-model="isOpenForm" :sector="editableSector" />
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SectorItem from './SectorItem.vue';
import { useSectorStore } from '@/stores/sector';
import { storeToRefs } from 'pinia';
import type { Sector } from '@/types/sectors';
import ModalForm from './ModalForm.vue';

const sectorStore = useSectorStore();
const { list } = storeToRefs(sectorStore);
const editableSector = ref<Sector | null>(null);
const isOpenForm = ref(false);

function addHandler() {
	editableSector.value = null;
	isOpenForm.value = true;
}
function editHandler(id: number) {
	const item = sectorStore.getSectorById(id);
	if (!item) return;
	editableSector.value = item;
	isOpenForm.value = true;
}
function removeHandler(id: number) {
	sectorStore.removeSector(id);
}
</script>

<style lang="scss">
.sectors-list {
	@include make-col(6, 88px);

	@include breakpoint(t) {
		padding-left: 15px;
		padding-right: 15px;
	}
	@include breakpoint(ts) {
		@include change-col-width(12);
		order: 2;
		margin-top: 30px;
	}

	&__items {
	}
	&__action {
		margin-top: 30px;
	}
}
</style>
