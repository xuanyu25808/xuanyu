<!-- 菜单页面 -->
<template>
	<view class="content">
		<scroll-view class="menu-left" scroll-y :show-scrollbar="false">
			<view 
				class="menu-left-item" 
				v-for="(item, index) in leftInfo.menuList" 
				:key="item.id"
				:class="{ active: leftInfo.activeIndex === index }"
				@click="handleLeftItemClick(index)"
			>
				<text>{{ item.title }}</text>
				<image :src="item.image" mode="widthFix"></image>
			</view>
		</scroll-view>

		<scroll-view 
			v-if="leftInfo.menuList.length > 0"
			class="menu-right menu-right-scroll"
		 	scroll-y
		  	:show-scrollbar="false"
		   	:scroll-top="rightInfo.scrollTop"
			@scroll="onRightScroll"
		>
			<view 
				v-for="(group, gIndex) in leftInfo.menuList" 
				:key="group.id" 
				:id="groupAnchorId(gIndex)"
				class="menu-right-group js-group"
			>
				<view class="menu-right-group-title">{{ group.title }}</view>
				<view class="menu-right-list">
					<view v-if="group.list.length === 0">
						<view class="menu-right-item">
							<view class="menu-right-info none">
								<image class="menu-right-thumb"
									src="https://gd-hbimg.huaban.com/db6d6021c0c140df9e5441947317d3af6689fdc8a237-pwDqB6_fw658"
									mode="aspectFill"></image>
								<view class="menu-right-name">暂无菜品</view>
							</view>
						</view>
					</view>
					<view v-else>
						<view
							class="menu-right-item"
							v-for="item in group.list"
							:key="item.id"
						>
							<view class="menu-right-main" @click="selectDish(item)">
								<image class="menu-right-thumb" :src="item.image" mode="aspectFill"></image>
								<view class="menu-right-info">
									<view class="menu-right-name">{{ item.title }}</view>
									<view class="menu-right-desc">点击查看用料与步骤</view>
								</view>
							</view>
							<image
								v-if="isDishSelected(group.id, item.id)"
								class="menu-right-op-icon"
								src="@/static/icons/subtraction_line.svg"
								mode="aspectFill"
								@click.stop="toggleDish(group, item)"
							/>
							<image
								v-else
								class="menu-right-op-icon"
								src="@/static/icons/add_line.svg"
								mode="aspectFill"
								@click.stop="toggleDish(group, item)"
							/>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<food-detailsl
			v-if="selectedDish"
			:dish="selectedDish"
			@close="selectedDish = null"
		/>
	</view>
</template>

<script>
import { getMenuList } from '@/store/menuStore.js'
import FoodDetailsl from '@/components/foodDetailsl.vue'
import { getDishesList, saveDishesList } from '@/store/orderStore'

export default {
	components: {
		FoodDetailsl
	},
	data() {
		return {
			// 左侧菜单列表
			leftInfo: {
				menuList: [],
				activeIndex: 0
			},
			// 右侧数据列表
			rightInfo: {
				scrollTop: 0,
				currentScrollTop: 0,
				sectionTops: []
			},
			// 当前点击的菜品详情
			selectedDish: null,
			// 已点菜品列表
			orderedMap: {}
		}
	},
	onShow() {
		// 加载菜单数据
		this.leftInfo.menuList = getMenuList()
		// 加载已点菜品数据
		this.loadOrdered()
		this.$nextTick(() => {
			// 计算距离
			this.calcSectionTops()
		})
	},
	onHide() {
		// 清空当前点击的菜品详情
		this.selectedDish = null
	},
	methods: {
		// 点击左侧菜单项
		handleLeftItemClick(index) {
			this.leftInfo.activeIndex = index
			// 点击左侧时，动态计算当前分组与容器顶部的距离，让当前分组“第一个菜品区域”滚动到可视区顶部
			const query = uni.createSelectorQuery().in(this)
			query.select('.menu-right-scroll').boundingClientRect()
			query.select(`#${this.groupAnchorId(index)}`).boundingClientRect()
			query.exec((res) => {
				if (!res || res.length < 2) return
				const containerRect = res[0]
				const groupRect = res[1]
				if (!containerRect || !groupRect) return
				const diff = (groupRect.top || 0) - (containerRect.top || 0)
				
				const target = this.rightInfo.currentScrollTop + diff
				this.rightInfo.scrollTop = target > 0 ? target : 0

			})
		},
		// 计算右侧各分组距离顶部的距离
		calcSectionTops() {
			const query = uni.createSelectorQuery().in(this)
			// 容器
			query.select('.menu-right-scroll').boundingClientRect()
			// 分组
			query.selectAll('.js-group').boundingClientRect()
			query.exec((res) => {
				if (!res || res.length < 2) return
				console.log('res', res);

				const containerRect = res[0]
				const groupRects = res[1] || []
				// 容器距离视口顶部的距离
				const baseTop = containerRect ? containerRect.top : 0
				// 分组相对于容器顶部的距离
				this.rightInfo.sectionTops = groupRects.map((r) =>
					Math.max(0, (r.top || 0) - baseTop)
				)
			})
		},
		// 当前点击的菜品
		selectDish(item) {
			this.selectedDish = item
		},
		// 菜品唯一标识
		dishKey(groupId, itemId) {
			return `${groupId}-${itemId}`
		},
		// 加载已点菜品
		loadOrdered() {
			const list = getDishesList()
			const map = {}
			list.forEach((d) => {
				if (d && d.key) {
					map[d.key] = d
				}
			})
			this.orderedMap = map
		},
		// 判断是否已点菜品
		isDishSelected(groupId, itemId) {
			const key = this.dishKey(groupId, itemId)
			return !!this.orderedMap[key]
		},
		// 添加/移除菜品
		toggleDish(group, item) {
			const key = this.dishKey(group.id, item.id)
			const map = { ...(this.orderedMap || {}) }
			if (map[key]) {
				delete map[key]
				this.orderedMap = map
				this.saveOrdered()
				uni.showToast({ title: '已移除', icon: 'none' })
				return
			}
			map[key] = {
				key,
				groupId: group.id,
				groupTitle: group.title,
				...item
			}
			this.orderedMap = map
			this.saveOrdered()
			uni.showToast({ title: '已添加到点菜', icon: 'none' })
		},
		// 保存已点菜品
		saveOrdered() {
			const list = Object.values(this.orderedMap)
			console.log('list', list);
			saveDishesList(list)
		},
		// 分组唯一标识
		groupAnchorId(index) {
			return `group-${index}`
		},
		// 右侧滚动事件
		onRightScroll(e) {
			const scrollTop = (e && e.detail && e.detail.scrollTop) || 0
			this.rightInfo.currentScrollTop = scrollTop
			const tops = this.rightInfo.sectionTops
			if (!tops || !tops.length) return

			let active = 0
			for (let i = 0; i < tops.length; i++) {
				if (scrollTop + 10 >= tops[i]) {
					active = i
				} else {
					break
				}
			}
			if (active !== this.leftInfo.activeIndex) {
				this.leftInfo.activeIndex = active
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.content {
	height: 100vh;
	display: flex;
	align-items: stretch;

	.menu-left {
		width: 30%;
		height: 100%;
		background-color: #f2f3f4;

		.menu-left-item {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			padding: 20rpx;

			&.active {
				background-color: #fff;
			}

			image {
				width: 50rpx;
				height: 50rpx;
			}

			text {
				margin-top: 10rpx;
				font-size: 28rpx;
				color: #333;
			}
		}
	}

	.menu-right {
		width: 70%;
		height: 100%;
		margin-left: 20rpx;

		.menu-right-group {
			padding-bottom: 12rpx;
		}

		.menu-right-group-title {
			font-size: 26rpx;
			font-weight: 600;
			color: #666;
			margin: 16rpx 0 8rpx;
			position: sticky;
			top: 0;
			z-index: 1;
			background-color: #fff;
		}

		.menu-right-list {
			display: flex;
			flex-direction: column;
			gap: 16rpx;
			padding-bottom: 12rpx;
		}

		.menu-right-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #ffffff;
			border-radius: 18rpx;
			padding: 16rpx 18rpx;
			box-shadow: 0 6rpx 16rpx rgba(15, 23, 42, 0.06);
		}

		.menu-right-main {
			display: flex;
			align-items: center;
			flex: 1;
			min-width: 0;
			margin-right: 12rpx;
		}

		.menu-right-thumb {
			width: 140rpx;
			height: 140rpx;
			border-radius: 16rpx;
			margin-right: 16rpx;
			background-color: #f3f4f6;
		}

		.menu-right-info {
			flex: 1;
			min-width: 0;
			&.none {
				display: flex;
				align-items: center;
			}
		}

		.menu-right-name {
			font-size: 24rpx;
			color: #111827;
		}

		.menu-right-desc {
			margin-top: 6rpx;
			font-size: 18rpx;
			color: #6b7280;
		}

		.menu-right-arrow {
			margin-left: 10rpx;
			font-size: 32rpx;
			color: #d1d5db;
		}

		.menu-right-op-icon {
			width: 40rpx;
			height: 40rpx;
		}
	}
}

</style>
