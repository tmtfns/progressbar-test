<template>
	<div class="progress-demo">
		<div class="progress-demo__holder">
			<ProgressBarCanvas
				v-if="isCanvas"
				:status="status"
				:total="total"
				:value="current"
				:isDashboard="isDashboard"
			/>
			<ProgressBar
				v-else
				:status="status"
				:total="total"
				:value="current"
				:isDashboard="isDashboard"
			/>
		</div>
		<div class="progress-demo__row">
			<div class="progress-demo__col">
				<p>Простой. Заканчивается статусом "success"</p>
				<button
					type="button"
					:disabled="isProcess"
					class="btn btn-solid btn-fw"
					@click="simpleHandler"
				>
					Старт
				</button>
			</div>
			<div class="progress-demo__col">
				<p>Медленный. Заканчивается статусом "success"</p>
				<button
					type="button"
					:disabled="isProcess"
					class="btn btn-solid btn-fw"
					@click="slowHandler"
				>
					Старт
				</button>
			</div>
			<div class="progress-demo__col">
				<p>Медленный, кусками. Заканчивается статусом "success"</p>
				<button
					type="button"
					:disabled="isProcess"
					class="btn btn-solid btn-fw"
					@click="slowChankHandler"
				>
					Старт
				</button>
			</div>
			<div class="progress-demo__col">
				<p>Простой. Заканчивается статусом "warning"</p>
				<button
					type="button"
					:disabled="isProcess"
					class="btn btn-solid btn-fw"
					@click="warnHandler"
				>
					Старт
				</button>
			</div>
			<div class="progress-demo__col">
				<p>Простой. Заканчивается статусом "error"</p>
				<button
					type="button"
					:disabled="isProcess"
					class="btn btn-solid btn-fw"
					@click="errorHandler"
				>
					Старт
				</button>
			</div>
			<div class="progress-demo__col">
				<p>Простой Dashboard. Заканчивается статусом "success</p>
				<button
					type="button"
					:disabled="isProcess"
					class="btn btn-solid btn-fw"
					@click="simpleHandlerDash"
				>
					Старт
				</button>
			</div>
			<div class="progress-demo__col">
				<p>Медленный Dashboard. Заканчивается статусом "success"</p>
				<button
					type="button"
					:disabled="isProcess"
					class="btn btn-solid btn-fw"
					@click="slowHandlerDash"
				>
					Старт
				</button>
			</div>
			<div class="progress-demo__col">
				<p>Простой Dashboard. Заканчивается статусом "warning"</p>
				<button
					type="button"
					:disabled="isProcess"
					class="btn btn-solid btn-fw"
					@click="warnHandlerDash"
				>
					Старт
				</button>
			</div>
			<div class="progress-demo__col">
				<p>Простой Dashboard. Заканчивается статусом "error"</p>
				<button
					type="button"
					:disabled="isProcess"
					class="btn btn-solid btn-fw"
					@click="errorHandlerDash"
				>
					Старт
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onUnmounted, ref, computed } from 'vue';
import ProgressBar from './ProgressBar.vue';
import { ProgressBarStatuses } from '@/types/progress';
import ProgressBarCanvas from './ProgressBarCanvas.vue';

const props = withDefaults(defineProps<{ isCanvas?: boolean }>(), {
	isCanvas: false,
});

const timer = ref<number | undefined>(undefined);

const status = ref<ProgressBarStatuses>(ProgressBarStatuses.inProgress);
const total = ref<number>(100);
const current = ref<number>(0);
const isDashboard = ref<boolean>(false);
const isProcess = computed(() => {
	return timer.value ? true : false;
});

onUnmounted(() => {
	if (timer.value) {
		clearInterval(timer.value);
	}
});

function _startHandler(
	end: number,
	step: number,
	totalVal: number,
	interval: number,
	statusVal: ProgressBarStatuses,
	isDash = false
) {
	if (timer.value) {
		clearInterval(timer.value);
	}
	isDashboard.value = isDash;
	let cnt = 0;
	current.value = 0;
	total.value = totalVal;
	status.value = ProgressBarStatuses.inProgress;
	timer.value = setInterval(() => {
		cnt = cnt + step;
		if (cnt > end) {
			clearInterval(timer.value);
			status.value = statusVal;
			timer.value = undefined;
		} else {
			current.value = cnt;
		}
	}, interval);
}

function warnHandler() {
	_startHandler(67, 1, 100, 100, ProgressBarStatuses.warning, false);
}

function errorHandler() {
	_startHandler(48, 1, 100, 100, ProgressBarStatuses.error, false);
}

function simpleHandler() {
	_startHandler(100, 1, 100, 100, ProgressBarStatuses.success, false);
}

function slowHandler() {
	_startHandler(780, 1, 780, 200, ProgressBarStatuses.success, false);
}
function slowChankHandler() {
	_startHandler(100, 5, 100, 600, ProgressBarStatuses.success, false);
}

function simpleHandlerDash() {
	_startHandler(100, 1, 100, 100, ProgressBarStatuses.success, true);
}

function slowHandlerDash() {
	_startHandler(780, 1, 780, 200, ProgressBarStatuses.success, true);
}

function warnHandlerDash() {
	_startHandler(67, 1, 100, 100, ProgressBarStatuses.warning, true);
}

function errorHandlerDash() {
	_startHandler(38, 1, 100, 100, ProgressBarStatuses.error, true);
}
</script>

<style lang="scss">
.progress-demo {
	&__holder {
		text-align: center;
		margin-bottom: 30px;
	}
	&__row {
		@include make-row(30px);
		row-gap: 30px;
		justify-content: center;
	}
	&__col {
		@include make-col(2, 30px);

		@include breakpoint(t) {
			@include change-col-width(3);
		}

		@include breakpoint(ts) {
			@include change-col-width(4);
		}

		@include breakpoint(m) {
			@include change-col-width(6);
		}
		@include breakpoint(xs) {
			@include change-col-width(12);
		}

		p {
			margin-bottom: 10px;
			font-size: 16px;
		}
	}
}
</style>
