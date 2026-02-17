import { defineStore } from 'pinia';
import type { SectorData, Sector, SectorState } from '@/types/sectors';

export const useSectorStore = defineStore('sector', {
	state: (): SectorState => ({
		lastId: 0,
		list: [],
	}),
	getters: {
		getSectorById: (state) => {
			return (id: number): Sector | undefined =>
				state.list.find((item) => item.id === id);
		},
		getPercentSum: (state) => {
			return (id?: number): number => {
				return state.list.reduce((sum, sector) => {
					if (sector.id != id) return sum + sector.percent;
					return sum;
				}, 0);
			};
		},
	},
	actions: {
		addSector(data: SectorData): void {
			this.lastId++;
			const item = { id: this.lastId, ...data };
			this.list.push(item);
		},
		updateSector(id: number, data: SectorData): void {
			let item = this.list.find((sector) => {
				return sector.id === id;
			});
			if (item) {
				item = Object.assign(item, data);
			}
		},
		removeSector(id: number): void {
			this.list = this.list.filter((item) => {
				return item.id !== id;
			});
		},
	},
});
