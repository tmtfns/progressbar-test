export enum ProgressBarStatuses {
	inProgress,
	success,
	warning,
	error,
}

export interface ProgressBarProps {
	value: number;
	total?: number;
	status: ProgressBarStatuses; //'inProgress' | 'success' | 'warning' | 'error',
	size?: number;
	stroke?: number;
	isDashboard?: boolean;
}

export interface ProgressColor {
	r: number;
	g: number;
	b: number;
}
