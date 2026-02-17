<template>
	<header class="header">
		<div class="container">
			<div class="header__row">
				<RouterLink to="/" class="header__logo"> Test App </RouterLink>
				<Menu />
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Menu from './Menu.vue';
</script>

<style lang="scss">
.header {
	background-color: $gray-bg-color;
	padding: 20px 0;
	&__row {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-flow: row nowrap;
		gap: 40px;
	}
	&__logo {
		color: $text-light-color;
		text-decoration: none;
		font-weight: 600;
		font-size: 20px;
		transition: all 0.2s ease;

		&:visited,
		&:active {
			color: $text-light-color;
			text-decoration: none;
		}
		&:hover,
		&:focus {
			color: $text-color;
		}
	}
}
</style>
