<template>
	<view v-if="dish" class="dish-detail">
		<view class="dish-detail-header">
			<view>
				<view class="dish-detail-title">{{ dish.title }}</view>
				<view class="dish-detail-sub">备菜用料 &amp; 步骤</view>
			</view>
			<view class="dish-detail-close" @click.stop="$emit('close')">×</view>
		</view>
		<view class="dish-detail-body">
			<view class="dish-detail-section">
				<view class="dish-detail-section-title">用料</view>
				<view class="dish-detail-tags">
					<text
						class="dish-detail-tag"
						v-for="(ing, idx) in dish.ingredients"
						:key="idx"
					>
						{{ ing }}
					</text>
				</view>
			</view>
			<view class="dish-detail-section">
				<view class="dish-detail-section-title">步骤</view>
				<view
					class="dish-detail-step"
					v-for="(step, idx) in dish.steps"
					:key="idx"
				>
					<text class="dish-detail-step-index">{{ idx + 1 }}</text>
					<text class="dish-detail-step-text">{{ step }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'FoodDetailsl',
	props: {
		dish: {
			type: Object,
			required: true
		}
	}
}
</script>

<style lang="scss" scoped>
.dish-detail {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	padding: 20rpx 24rpx 30rpx;
	background-color: #ffffff;
	box-shadow: 0 -8rpx 26rpx rgba(0, 0, 0, 0.08);
	border-top-left-radius: 24rpx;
	border-top-right-radius: 24rpx;
	box-sizing: border-box;
	max-height: 55vh;
	z-index: 1000;
	display: flex;
	flex-direction: column;
}

.dish-detail-header {
	margin-bottom: 16rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.dish-detail-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #111827;
}

.dish-detail-sub {
	margin-top: 6rpx;
	font-size: 24rpx;
	color: #6b7280;
}

.dish-detail-close {
	width: 48rpx;
	height: 48rpx;
	border-radius: 50%;
	border: 1rpx solid #e5e7eb;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 32rpx;
	color: #6b7280;
}

.dish-detail-section {
	margin-top: 12rpx;
}

.dish-detail-body {
	flex: 1;
	overflow-y: auto;
	padding-bottom: 10rpx;
}

.dish-detail-section-title {
	font-size: 26rpx;
	color: #374151;
	margin-bottom: 8rpx;
}

.dish-detail-tags {
	display: flex;
	flex-wrap: wrap;
	gap: 10rpx;
}

.dish-detail-tag {
	font-size: 22rpx;
	color: #111827;
	background-color: #f3f4f6;
	padding: 6rpx 12rpx;
	border-radius: 999rpx;
}

.dish-detail-step {
	display: flex;
	align-items: flex-start;
	margin-bottom: 8rpx;
}

.dish-detail-step-index {
	width: 32rpx;
	height: 32rpx;
	line-height: 32rpx;
	text-align: center;
	border-radius: 50%;
	background-color: #111827;
	color: #ffffff;
	font-size: 22rpx;
	margin-right: 12rpx;
	margin-top: 4rpx;
}

.dish-detail-step-text {
	flex: 1;
	font-size: 24rpx;
	color: #4b5563;
}
</style>