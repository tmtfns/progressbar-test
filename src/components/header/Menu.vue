<template>
	<div class="header__left" :class="{ 'header__left--opened': isOpen }">
		<button
			type="button"
			@click="togglerHandler"
			class="btn header__toggler"
		>
			<span class="hamburger-lines">
				<span class="line line1"></span>
				<span class="line line2"></span>
				<span class="line line3"></span>
			</span>
		</button>
		<nav class="header__nav">
			<ul class="header__nav-items list-unstyled">
				<li class="header__nav-item">
					<RouterLink
						to="/canvas"
						class="header__nav-link"
						@click="linkHandler"
						>Canvas</RouterLink
					>
				</li>
				<li class="header__nav-item">
					<RouterLink
						to="/chart"
						class="header__nav-link"
						@click="linkHandler"
						>Chart</RouterLink
					>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import type { Ref } from 'vue';

const isOpen: Ref<boolean> = ref(false);

function togglerHandler() {
	isOpen.value = !isOpen.value;
}

function linkHandler() {
	isOpen.value = false;
}
</script>

<style lang="scss">
.header {
	&__left {
	}
	&__toggler.btn {
		display: none;
	}
	&__nav {
		&-items {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			flex-flow: row nowrap;
			gap: 30px;
		}
		&-item {
		}
		&-link {
			color: $text-color;
			text-decoration: none;
			font-weight: 600;
			font-size: 18px;
			transition: all 0.2s ease;

			&:visited,
			&:active {
				color: $blue-color;
				text-decoration: none;
			}
			&:hover,
			&:focus {
				color: $text-color;
			}
		}
	}
}

@include breakpoint(m) {
	.header {
		position: relative;

		&__left {
			flex-grow: 1;
			display: block;
			text-align: right;
		}
		.header {
			&__toggler.btn {
				display: inline-block;
				width: 40px;
				height: 40px;
				padding: 9px 3px;
				background: transparent;
				border: none;
				background-color: transparent;

				.hamburger-lines {
					height: 22px;
					width: 33px;
					position: relative;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.line {
						display: block;
						height: 3px;
						width: 100%;
						border-radius: 3px;
						background: $text-color;
					}
					.line1 {
						transform-origin: top right;
						transition: transform 0.4s ease-in-out;
					}
					.line2 {
						transition: transform 0.2s ease-in-out;
					}
					.line3 {
						transform-origin: bottom right;
						transition: transform 0.4s ease-in-out;
					}
				}
			}
			&__nav {
				position: absolute;
				width: 100vw;
				top: 100%;
				left: 100%;
				z-index: 1000;
				background: #ffffff;
				padding: 20px 20px 24px;
				min-height: calc(100vh - 106px);
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: space-between;
				transition: left 0.4s ease-in-out;
				text-align: left;

				&-items {
					width: 100%;
					display: block;
				}
				&-item {
					width: 100%;
					border-bottom: 1px solid $border-color;
					padding-bottom: 20px;
					padding-top: 17px;

					&:last-child {
						border-bottom: none;
					}
				}
			}
		}
	}
	.header__left--opened {
		.header {
			&__toggler {
				.hamburger-lines {
				}
				.line {
				}
				.line1 {
					transform: translateY(-2px) rotate(-45deg);
				}
				.line2 {
					transform: scaleY(0);
				}
				.line3 {
					transform: translateY(2px) rotate(45deg);
				}
			}
			&__nav {
				left: 0;
			}
		}
	}
}
</style>
