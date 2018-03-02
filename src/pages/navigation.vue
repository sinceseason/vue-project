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
							v-for="(menuItem, index) in menu" :key="index"
							:class="{menu_item_selected: menuItem.selected}"
							v-if="$isAuthorized(menuItem.main)">
							<el-dropdown trigger="click" v-if="menuItem.showSubMenu">
								<span class="el-dropdown-link">{{$t('menu.' + menuItem.caption)}}
									<i class="el-icon-arrow-down el-icon-right"></i>
								</span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item
										v-for="subMenu in menuItem.subMenu" :key="subMenu.id"
										v-if="$isAuthorized(subMenu.main)"
										@click.native="$selectMenu(subMenu)">
											{{$t('menu.' + subMenu.caption)}}
									</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
							<span v-else @click="$selectMenu(menuItem)">
								{{$t('menu.' + menuItem.caption)}}
							</span>
						</li>
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
			menu () {
				return this.$store.state.auth.menuList
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

						.el-dropdown {
							color: #fff;
						}
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
