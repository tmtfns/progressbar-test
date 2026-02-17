export interface Sector {
	id: number;
	name: string;
	percent: number;
	color: string;
}

export interface SectorData {
	name: string;
	percent: number;
	color: string;
}

export interface SectorState {
	lastId: number;
	list: Sector[];
}
