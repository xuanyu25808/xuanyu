<template>
	<view class="page">
		<view class="header">
			<view class="title">已点菜品</view>
			<view class="notice">
				<view class="sub">共 {{ dishes.length }} 道</view>
				<button v-if="dishes.length"  class="danger-btn" @click="clearAll">清空</button>
			</view>
			
		</view>

		<view v-if="dishes.length === 0" class="empty">
			<view class="empty-title">还没有添加菜品</view>
			<view class="empty-sub">去「食物」页点击添加按钮</view>
			<button class="ghost-btn" @click="goMenu">去添加</button>
		</view>

		<view v-else class="list">
			
			<view
				class="card"
				v-for="item in dishes"
				:key="item.key"
				@click="openDish(item)"
			>
				<image class="thumb" :src="item.image" mode="aspectFill"></image>
				<view class="info">
					<view class="name">{{ item.title }}</view>
					<view class="meta">
						<text class="pill">{{ item.groupTitle }}</text>
					</view>
				</view>
				<button class="remove-btn" @click.stop="removeOne(item.key)">
					删除
				</button>
			</view>
		</view>

		<food-detailsl
			v-if="selectedDish"
			:dish="selectedDish"
			@close="selectedDish = null"
		/>
	</view>
</template>

<script>
import FoodDetailsl from '@/components/foodDetailsl.vue'
import { getDishesList, saveDishesList, clearDishesList } from '@/store/orderStore'

export default {
	components: {
		FoodDetailsl
	},
	data() {
		return {
			// 已点菜品列表
			dishes: [],
			// 当前点击的菜品详情
			selectedDish: null
		}
	},
	onShow() {
		// 加载已点菜品
		this.dishes = getDishesList()
	},
	onHide() {
		this.selectedDish = null
	},
	methods: {
		// 跳转到菜单页
		goMenu() {
			uni.switchTab({ url: '/pages/menu/index' })
		},
		// 删除单个菜品
		removeOne(key) {
			this.dishes = this.dishes.filter((d) => d.key !== key)
			saveDishesList(this.dishes)
			uni.showToast({ title: '已删除', icon: 'none' })

			if (this.selectedDish && this.selectedDish.key === key) {
				this.selectedDish = null
			}
		},
		// 打开菜品详情
		openDish(item) {
			this.selectedDish = item
		},
		// 清空所有已点菜品
		clearAll() {
			if (!this.dishes.length) return
			uni.showModal({
				title: '清空菜品',
				content: '确定清空所有已点菜品吗？',
				confirmText: '清空',
				confirmColor: '#F53F3F',
				success: (res) => {
					if (res.confirm) {
						this.dishes = []
						clearDishesList()
						uni.showToast({ title: '已清空', icon: 'none' })
					}
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.page {
	min-height: 100vh;
	background: linear-gradient(180deg, #f9fafb 0%, #f3f4f6 40%, #e5e7eb 100%);
	padding: 24rpx;
	box-sizing: border-box;
}

.header {
	padding: 8rpx 4rpx 20rpx 4rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	
}

.notice {
	display: flex;
	align-items: center;
}

.title {
	font-size: 38rpx;
	font-weight: 700;
	color: #111827;
}

.sub {
	font-size: 24rpx;
	color: #6b7280;
}

.empty {
	margin-top: 160rpx;
	text-align: center;
}

.empty-title {
	font-size: 30rpx;
	color: #111827;
}

.empty-sub {
	margin-top: 10rpx;
	font-size: 24rpx;
	color: #6b7280;
}

.ghost-btn {
	margin-top: 26rpx;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border: 1px solid #e5e7eb;
	color: #111827;
	background: #ffffff;
	height: 72rpx;
	line-height: 72rpx;
	padding: 0 32rpx;
	border-radius: 999rpx;
	font-size: 26rpx;
}

.actions {
	display: flex;
	justify-content: flex-end;
	margin: 4rpx 4rpx 16rpx 4rpx;
}

.danger-btn {
	background: #fef2f2;
	color: #b91c1c;
	border: 1px solid #fecaca;
	height: 60rpx;
	line-height: 60rpx;
	font-size: 24rpx;
	border-radius: 999rpx;
	padding: 0 28rpx;
	margin-left: 20rpx;
}

.card {
	background: #ffffff;
	border-radius: 22rpx;
	padding: 18rpx 20rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 18rpx;
	box-shadow: 0 10rpx 25rpx rgba(15, 23, 42, 0.08);
}

.thumb {
	width: 120rpx;
	height: 120rpx;
	border-radius: 18rpx;
	margin-right: 18rpx;
	background-color: #f3f4f6;
}

.info {
	flex: 1;
	min-width: 0;
	padding-right: 18rpx;
}

.name {
	font-size: 30rpx;
	font-weight: 600;
	color: #111827;
}

.meta {
	margin-top: 10rpx;
	display: flex;
	flex-wrap: wrap;
	gap: 10rpx;
}

.pill {
	font-size: 22rpx;
	color: #2563eb;
	background: rgba(37, 99, 235, 0.06);
	padding: 6rpx 14rpx;
	border-radius: 999rpx;
}

.remove-btn {
	width: 96rpx;
	height: 60rpx;
	line-height: 60rpx;
	border-radius: 999rpx;
	font-size: 24rpx;
	background: #111827;
	color: #ffffff;
}
</style>
