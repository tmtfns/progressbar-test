<template>
	<li class="sector-item">
		<div class="sector-item__row">
			<div class="sector-item__col sector-item__col--name">
				{{ item.name }}
			</div>
			<div class="sector-item__col sector-item__col--pc">
				{{ item.percent }}%
			</div>
			<div class="sector-item__col sector-item__col--c">
				<ColorMark :color="item.color" />
			</div>
			<div class="sector-item__col sector-item__col--actions">
				<button type="button" class="btn btn-icon" @click="editHandler">
					<IconEdit />
				</button>
				<button
					type="button"
					class="btn btn-icon"
					@click="removeHandler"
				>
					<IconTrash />
				</button>
			</div>
		</div>
	</li>
</template>

<script setup lang="ts">
import type { Sector } from '@/types/sectors';
import ColorMark from './ColorMark.vue';
import IconEdit from '../icons/IconEdit.vue';
import IconTrash from '../icons/IconTrash.vue';

const props = defineProps<{ item: Sector }>();
const emit = defineEmits({
	edit: (id: number) => {},
	remove: (id: number) => {},
});

const editHandler = () => {
	emit('edit', props.item.id);
};

const removeHandler = () => {
	emit('remove', props.item.id);
};
</script>

<style lang="scss">
.sector-item {
	margin-bottom: 5px;
	background: $gray-bg-color;
	border-radius: 10px;
	padding: 18px 20px;

	&:last-child {
		margin-bottom: 0;
	}

	&__row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		flex-wrap: nowrap;
		gap: 25px;

		@include breakpoint(xs) {
			gap: 16px;
		}
	}
	&__col {
		font-weight: 400;
		font-size: 16px;
		line-height: 1.5;
		color: $text-color;
	}
	&__col--name {
		width: 100px;
		flex-basis: 100px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	&__col--pc {
		position: relative;
		padding: 0 20px;
		width: 84px;
		flex-basis: 84px;
		text-align: center;

		@include breakpoint(xs) {
			padding: 0 10px;
			width: 64px;
			flex-basis: 64px;
		}

		&::before,
		&::after {
			content: '';
			display: block;
			position: absolute;
			top: 50%;
			margin-top: -8px;
			width: 0px;
			height: 16px;
			border: 1px solid $border-color;
			border-radius: 2px;
		}
		&::before {
			left: 0;
		}
		&::after {
			right: 0;
		}
	}
	&__col--c {
		line-height: 1;
		font-size: 0;
	}
	&__col--actions {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-end;
		gap: 22px;
		flex-grow: 1;
	}
}
</style>
