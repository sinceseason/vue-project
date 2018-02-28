<template>
  <div class="layout">
		<div class="header">
			<div class="logo-img"></div>
			<div class="header-container">
				<div class="info">
					<div class="title">{{$t('label.title')}}</div>
				</div>
				<div class="menu">
					<div class="bar">
						<li class="menu-item"

						:class="{menu_item_selected: selected}"></li>
					</div>
				</div>
			</div>
		</div>
    <div class="main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
	export default {
		name: 'navigator',
		computed: {
			selected () {
				return this.$store.state.menuList
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '../assets/scss/definition.scss';

.layout {
  width: 100%;
	height: 100%;
	
	.header {
		width: 100%;
		height: 96px;
		background-color: $header_background_color;

		.logo-img {
			width: 130px;
			height: 100%;
			float: left;
		}

		.header-container {
			height: 100%;
			padding-left: 130px;
			background-color: $header_background_color;

			.info {
      	width: 100%;
      	height: 60px;

      	.title {
        	@include site_name_style;
      	}
			}

			.menu {
				width: 100%;
				height: 36px;

				.bar {
					float: left;
					height: 100%;

					.menu-item {
						@include menu_item_style;
					}
				}
			}
		}
	}

  .main-container {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 96px;
    bottom: 0px;
  }
}
</style>
