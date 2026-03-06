<template>
	<view
		class="page-person"
		:class="{ 'page-person--locked': showDishForm }"
	>
		<!-- 顶部信息 -->
		<view class="person-header">
			<view class="person-title">菜谱管理</view>
			<view class="person-sub">在这里创建分类、添加菜品，并编辑用料与步骤</view>
		</view>

		<!-- 分类操作 -->
		<view class="category-create">
			<input
				class="category-input"
				type="text"
				v-model="newCategoryName"
				placeholder="输入新的分类名称，例如：家常菜 / 热菜 / 凉菜"
				confirm-type="done"
				@confirm="handleAddCategory"
			/>
			<button class="btn-primary" @click="handleAddCategory">
				创建分类
			</button>
		</view>

		<!-- 分类 + 菜品列表 -->
		<view class="category-list" :class="{ 'category-list--locked': showDishForm }">
			<view
				v-for="(cate, cIndex) in menu"
				:key="cate.id"
				class="category-card"
			>
				<view class="category-card-header">
					<view class="category-card-title">
						<text class="category-name">{{ cate.title }}</text>
						<text class="category-count">共 {{ (cate.list || []).length }} 道菜</text>
					</view>
					<view class="category-card-actions">
						<button
							class="btn-ghost btn-small"
							@click="handleAddDish(cIndex)"
						>
							+ 添加菜品
						</button>
						<button
							class="btn-danger btn-small"
							@click="handleDeleteCategory(cIndex)"
						>
							删除分类
                        </button>
					</view>
				</view>

				<!-- 分类下的菜品 -->
				<view v-if="cate.list && cate.list.length" class="dish-list">
					<view
						v-for="(dish, dIndex) in cate.list"
						:key="dish.id"
						class="dish-item"
					>
						<view class="dish-info">
							<view class="dish-title">{{ dish.title }}</view>
							<view class="dish-sub">
								用料 {{ dish.ingredients.length }} 项 · 步骤
								{{ dish.steps.length }} 步
							</view>
						</view>
						<view class="dish-actions">
							<button
								class="btn-ghost btn-xs"
								@click="handleEditDish(cIndex, dIndex)"
							>
								编辑
							</button>
							<button
								class="btn-danger-outline btn-xs"
								@click="handleDeleteDish(cIndex, dIndex)"
							>
								删除
							</button>
						</view>
					</view>
				</view>

				<view v-else class="dish-empty">
					当前分类暂无菜品，点右上角“添加菜品”开始吧
				</view>
			</view>

			<view v-if="!menu.length" class="category-empty">
				还没有任何分类，先在上方输入名称并点击“创建分类”
			</view>
		</view>

		<!-- 菜品表单弹窗：字段与 foodDetailsl.vue 展示的信息对应 -->
		<!-- 阻止 touchmove 事件穿透，防止外层页面滚动 -->
		<view
			v-if="showDishForm"
			class="dish-modal-mask"
			@click="handleCloseDishForm"
			@touchmove.stop.prevent
			:catchtouchmove="true"
		>
			<view class="dish-modal" @click.stop>
				<view class="dish-modal-header">
					<view class="dish-modal-title">
						{{ isEditDish ? '编辑菜品' : '新建菜品' }}
					</view>
					<view class="dish-modal-close" @click="handleCloseDishForm">×</view>
				</view>

				<!-- 内部表单可滚动，阻止事件继续冒泡到遮罩层 -->
				<scroll-view
					class="dish-modal-body"
					scroll-y
					:show-scrollbar="false"
					@touchmove.stop
					:scroll-into-view="stepsScrollId"
				>
					<!-- 菜品图片（最多 3 张） -->
					<view class="form-item">
						<view class="form-label">菜品图片（最多 3 张）</view>
						<view class="dish-images">
							<view
								v-for="(img, idx) in dishForm.images"
								:key="idx"
								class="dish-image-item"
							>
								<image
									class="dish-image-thumb"
									:src="img"
									mode="aspectFill"
								/>
								<view
									class="dish-image-delete"
									@click.stop="handleRemoveImage(idx)"
								>
									×
								</view>
							</view>

							<!-- 新增图片按钮，最多 3 张 -->
							<view
								v-if="(dishForm.images || []).length < 3"
								class="dish-image-add"
								@click="handleAddImage"
							>
								<text class="dish-image-add-icon">+</text>
								<text class="dish-image-add-text">添加图片</text>
							</view>
						</view>
					</view>

					<!-- 菜名（对应 foodDetailsl.vue 中的 dish.title） -->
					<view class="form-item">
						<view class="form-label">菜名</view>
						<input
							class="form-input"
							type="text"
							v-model="dishForm.title"
							placeholder="例如：番茄炒蛋"
						/>
					</view>

					<!-- 用料（对应 foodDetailsl.vue 中的 dish.ingredients） -->
					<view class="form-item">
						<view class="form-label-row">
							<view class="form-label">用料</view>
						</view>

						<view class="ingredients-list">
							<view
								v-for="(ing, idx) in dishForm.ingredients"
								:key="idx"
								class="ingredient-item"
							>
								<text class="ingredient-index">{{ idx + 1 }}</text>
								<input
									class="form-input ingredient-input"
									type="text"
									v-model="dishForm.ingredients[idx]"
									:placeholder="`用料 ${idx + 1}`"
								/>
								<image
									class="step-delete-icon"
									src="@/static/icons/subtraction_line.svg"
									mode="aspectFill"
									@click.stop="handleRemoveIngredient(idx)"
								/>
							</view>
						</view>

						<view class="ingredients-actions">
							<button
								class="btn-ghost btn-xs"
								@click="handleAddIngredient"
							>
								新增用料
							</button>
						</view>

						<view class="form-tip">
							每行一个用料，点击右侧图标可删除该行。
						</view>
					</view>

					<!-- 步骤（对应 foodDetailsl.vue 中的 dish.steps） -->
					<view class="form-item">
						<view class="form-label-row">
							<view class="form-label">步骤</view>
						</view>

						<view class="steps-list">
							<view
								v-for="(step, idx) in dishForm.steps"
								:key="idx"
								class="step-item"
								:id="`step-${idx}`"
							>
								<text class="step-index">{{ idx + 1 }}</text>
								<input
									class="form-input step-input"
									type="text"
									v-model="dishForm.steps[idx]"
									:placeholder="`步骤 ${idx + 1}`"
								/>
								<image
									class="step-delete-icon"
									src="@/static/icons/subtraction_line.svg"
									mode="aspectFill"
									@click.stop="handleRemoveStep(idx)"
								/>
							</view>
						</view>

						<view class="steps-actions">
							<button
								class="btn-ghost btn-xs"
								@click="handleAddStep"
							>
								新增步骤
							</button>
						</view>

						<view class="form-tip">
							每个输入框为一个步骤，默认提供 3 个，可点击“新增步骤”继续添加。
						</view>
					</view>
				</scroll-view>

				<!-- 固定在弹窗底部的操作区 -->
				<view class="dish-modal-footer">
					<button class="btn-ghost flex-1" @click="handleCloseDishForm">
						取消
					</button>
					<button class="btn-primary flex-1" @click="handleSubmitDish">
						保存
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getMenuList, saveMenuListToStorage } from '@/store/menuStore.js'

	export default {
		data() {
			return {
				// 菜单（分类 + 菜品），从 store 中统一管理
				menu: [],

				// 新建分类名称
				newCategoryName: '',

				// 菜品表单弹窗
				showDishForm: false,
				isEditDish: false,
				currentCategoryIndex: null,
				currentDishIndex: null,
				dishForm: {
					title: '',
					images: [],
					ingredients: [],
					ingredientsInput: '',
					steps: []
				},
				// 控制“新增用料”输入框显示
				showIngredientInput: false,
				// 控制步骤区域滚动到最后一项
				stepsScrollId: ''
			}
		},
		onLoad() {
			// 初始化菜单数据（优先本地存储，没有则使用 mock 数据）
			this.menu = getMenuList()
		},
		methods: {
			// 创建分类
			handleAddCategory() {
				const name = (this.newCategoryName || '').trim()
				if (!name) {
					uni.showToast({
						title: '请输入分类名称',
						icon: 'none'
					})
					return
				}

				this.menu.push({
					id: Date.now() + '_' + Math.random().toString(36).slice(2),
					title: name,
					image: '',
					list: []
				})
				saveMenuListToStorage(this.menu)
				this.newCategoryName = ''
				uni.showToast({
					title: '分类已创建',
					icon: 'success'
				})
			},

			// 删除分类
			handleDeleteCategory(cIndex) {
				const cate = this.menu[cIndex]
				uni.showModal({
					title: '删除确认',
					content: `确定删除分类「${cate.title}」及其下所有菜品吗？`,
					success: (res) => {
						if (res.confirm) {
							this.menu.splice(cIndex, 1)
							saveMenuListToStorage(this.menu)
						}
					}
				})
			},

			// 新建菜品
			handleAddDish(cIndex) {
				this.isEditDish = false
				this.currentCategoryIndex = cIndex
				this.currentDishIndex = null
				this.resetDishForm()
				this.stepsScrollId = ''
				this.showDishForm = true
			},

			// 编辑菜品
			handleEditDish(cIndex, dIndex) {
				const dish = this.menu[cIndex].list[dIndex]
				this.isEditDish = true
				this.currentCategoryIndex = cIndex
				this.currentDishIndex = dIndex

				this.dishForm.title = dish.title || ''
				// 优先使用 dish.images，多图；没有则尝试用单张 image 包装成数组
				if (Array.isArray(dish.images) && dish.images.length) {
					this.dishForm.images = [...dish.images]
				} else if (dish.image) {
					this.dishForm.images = [dish.image]
				} else {
					this.dishForm.images = []
				}
				let ingsArr = Array.isArray(dish.ingredients)
					? [...dish.ingredients]
					: []
				// 没有用料时，默认给一行空用料
				if (!ingsArr.length) {
					ingsArr = ['']
				}
				this.dishForm.ingredients = ingsArr
				let stepsArr = Array.isArray(dish.steps) ? [...dish.steps] : []
				// 回显：有多少步骤就显示多少；如果完全没有步骤，则默认给 3 个空步骤
				if (!stepsArr.length) {
					stepsArr = ['', '', '']
				}
				this.dishForm.steps = stepsArr
				this.stepsScrollId = ''
				this.showDishForm = true
			},

			// 删除菜品
			handleDeleteDish(cIndex, dIndex) {
				const dish = this.menu[cIndex].list[dIndex]
				uni.showModal({
					title: '删除确认',
					content: `确定删除菜品「${dish.title}」吗？`,
					success: (res) => {
						if (res.confirm) {
							this.menu[cIndex].list.splice(dIndex, 1)
							saveMenuListToStorage(this.menu)
						}
					}
				})
			},

			// 关闭弹窗
			handleCloseDishForm() {
				this.showDishForm = false
			},

			// 重置表单
			resetDishForm() {
				this.dishForm = {
					title: '',
					images: [],
					ingredients: [''], // 至少一行用料
					ingredientsInput: '',
					steps: ['', '', ''] // 默认 3 个步骤输入框
				}
				this.showIngredientInput = false
				this.stepsScrollId = ''
			},

			// 新增一条用料（每行一个）
			handleAddIngredient() {
				if (!Array.isArray(this.dishForm.ingredients)) {
					this.dishForm.ingredients = ['']
					return
				}
				this.dishForm.ingredients.push('')
			},

			// 删除一条用料
			handleRemoveIngredient(index) {
				if (!Array.isArray(this.dishForm.ingredients)) return
				const list = [...this.dishForm.ingredients]
				list.splice(index, 1)
				// 至少保留一行空用料
				this.dishForm.ingredients = list.length ? list : ['']
			},

			// 新增一个步骤输入框
			handleAddStep() {
				if (!Array.isArray(this.dishForm.steps)) {
					this.dishForm.steps = ['', '', '']
					return
				}
				// 使用数组 push，保证在 uni-app/Vue2 下的响应式更新
				this.dishForm.steps.push('')
				// 下一帧将滚动锚点设置到最后一个步骤
				this.$nextTick(() => {
					const lastIndex = this.dishForm.steps.length - 1
					this.stepsScrollId = `step-${lastIndex}`
				})
			},

			// 删除一个步骤输入框
			handleRemoveStep(index) {
				if (!Array.isArray(this.dishForm.steps)) return
				const list = [...this.dishForm.steps]
				list.splice(index, 1)
				// 至少保留一个空步骤输入框，避免完全没有输入框
				this.dishForm.steps = list.length ? list : ['']
			},

			// 新增一张菜品图片（最多 3 张）
			handleAddImage() {
				const current = this.dishForm.images || []
				const remain = 3 - current.length
				if (remain <= 0) {
					uni.showToast({
						title: '最多添加 3 张图片',
						icon: 'none'
					})
					return
				}

				uni.chooseImage({
					count: remain,
					sizeType: ['compressed'],
					success: (res) => {
						const paths = (res.tempFilePaths || []).slice(0, remain)
						this.dishForm.images = current.concat(paths)
					}
				})
			},

			// 删除一张菜品图片
			handleRemoveImage(index) {
				const list = [...(this.dishForm.images || [])]
				list.splice(index, 1)
				this.dishForm.images = list
			},

			// 提交菜品（创建 / 编辑）
			handleSubmitDish() {
				const title = (this.dishForm.title || '').trim()
				if (!title) {
					uni.showToast({
						title: '请输入菜名',
						icon: 'none'
					})
					return
				}

				const ingredients = (this.dishForm.ingredients || [])
					.map((s) => String(s || '').trim())
					.filter((s) => s)

				const steps = (this.dishForm.steps || [])
					.map((s) => String(s || '').trim())
					.filter((s) => s)

				const images = Array.isArray(this.dishForm.images)
					? this.dishForm.images
					: []

				// 封面图兼容旧结构的 image 字段（菜单缩略图使用）
				const coverImage =
					images[0] ||
					(this.isEditDish && this.currentDish && this.currentDish.image) ||
					''

				const dishData = {
					id:
						this.isEditDish && this.currentDish
							? this.currentDish.id
							: Date.now() + '_' + Math.random().toString(36).slice(2),
					title,
					image: coverImage,
					images,
					ingredients,
					steps
				}

				const cate = this.menu[this.currentCategoryIndex]

				if (!this.isEditDish) {
					cate.list.push(dishData)
				} else if (
					this.currentDishIndex !== null &&
					this.currentDishIndex !== undefined
				) {
					this.$set(cate.list, this.currentDishIndex, dishData)
				}

				saveMenuListToStorage(this.menu)
				this.showDishForm = false
				uni.showToast({
					title: '已保存',
					icon: 'success'
				})
			}
		},
		computed: {
			currentDish() {
				if (
					this.currentCategoryIndex === null ||
					this.currentDishIndex === null ||
					!this.menu[this.currentCategoryIndex]
				) {
					return null
				}
				return this.menu[this.currentCategoryIndex].list[
					this.currentDishIndex
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
.page-person {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	padding: 24rpx;
	box-sizing: border-box;
	background-color: #f3f4f6;
	overflow-y: auto;
}

.page-person--locked {
	/* 弹窗打开时锁定背景滚动 */
	overflow: hidden;
}

.person-header {
	margin-bottom: 24rpx;
}

.person-title {
	font-size: 34rpx;
	font-weight: 600;
	color: #111827;
}

.person-sub {
	margin-top: 4rpx;
	font-size: 24rpx;
	color: #6b7280;
}

.category-create {
	display: flex;
	align-items: center;
	gap: 16rpx;
	margin-bottom: 16rpx;
}

.category-input {
	flex: 1;
	height: 72rpx;
	padding: 0 20rpx;
	border-radius: 999rpx;
	background-color: #ffffff;
	font-size: 26rpx;
	box-sizing: border-box;
}

.category-list {

}
.category-list.category-list--locked {
	pointer-events: none;
}

.category-card {
	background-color: #ffffff;
	border-radius: 18rpx;
	padding: 20rpx 20rpx 12rpx;
	margin-bottom: 18rpx;
	box-shadow: 0 4rpx 18rpx rgba(0, 0, 0, 0.03);
}

.category-card-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 12rpx;
}

.category-card-title {
	display: flex;
	flex-direction: column;
}

.category-name {
	font-size: 30rpx;
	font-weight: 600;
	color: #111827;
}

.category-count {
	margin-top: 4rpx;
	font-size: 22rpx;
	color: #9ca3af;
}

.category-card-actions {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.dish-list {
	margin-top: 4rpx;
	border-top: 1rpx solid #f3f4f6;
	padding-top: 8rpx;
}

.dish-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10rpx 0;
}

.dish-info {
	flex: 1;
}

.dish-title {
	font-size: 26rpx;
	color: #111827;
}

.dish-sub {
	margin-top: 2rpx;
	font-size: 22rpx;
	color: #6b7280;
}

.dish-actions {
	display: flex;
	align-items: center;
	gap: 8rpx;
	margin-left: 10rpx;
}

.dish-empty,
.category-empty {
	padding: 24rpx 10rpx 10rpx;
	font-size: 24rpx;
	color: #9ca3af;
	text-align: center;
}

.category-empty {
	margin-top: 60rpx;
}

/* 按钮样式 */
.btn-primary {
	background: linear-gradient(135deg, #6366f1, #4f46e5);
	color: #ffffff;
	border-radius: 999rpx;
	font-size: 26rpx;
	height: 72rpx;
	line-height: 72rpx;
	padding: 0 32rpx;
}

.btn-ghost {
	background-color: #f9fafb;
	color: #111827;
	border-radius: 999rpx;
	font-size: 24rpx;
	height: 64rpx;
	line-height: 64rpx;
	padding: 0 26rpx;
}

.btn-danger {
	background-color: #ef4444;
	color: #ffffff;
	border-radius: 999rpx;
	font-size: 24rpx;
	height: 64rpx;
	line-height: 64rpx;
	padding: 0 26rpx;
}

.btn-danger-outline {
	background-color: #fff1f2;
	color: #b91c1c;
	border-radius: 999rpx;
	font-size: 22rpx;
	height: 56rpx;
	line-height: 56rpx;
	padding: 0 22rpx;
}

.btn-small {
	transform: scale(0.92);
	transform-origin: center right;
}

.btn-xs {
	transform: scale(0.9);
	transform-origin: center right;
}

.flex-1 {
	flex: 1;
}

/* 菜品弹窗 */
.dish-modal-mask {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.35);
	z-index: 999;
	display: flex;
	align-items: flex-end;
	justify-content: center;
}

.dish-modal {
	width: 100%;
	background-color: #ffffff;
	border-top-left-radius: 24rpx;
	border-top-right-radius: 24rpx;
	padding: 18rpx 24rpx 26rpx;
	box-sizing: border-box;
	height: 80vh; /* 弹窗整体高度固定为屏幕 40% */
	display: flex;
	flex-direction: column;
}

.dish-modal-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 10rpx;
}

.dish-modal-title {
	font-size: 30rpx;
	font-weight: 600;
	color: #111827;
}

.dish-modal-close {
	width: 48rpx;
	height: 48rpx;
	border-radius: 50%;
	border: 1rpx solid #e5e7eb;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 30rpx;
	color: #6b7280;
}

.dish-modal-body {
	/* flex: 1; */
	height: calc(100% - 200rpx);
	margin-top: 8rpx;
	padding: 0 16rpx 10rpx 0;
	/* 右侧预留 16rpx 给滚动条，避免压在内容上 */
}

.dish-modal-footer {
	height: 100rpx;
	margin-top: 14rpx;
	display: flex;
	align-items: center;
	gap: 14rpx;
}

.form-item {
	margin-bottom: 14rpx;
}

.form-label {
	font-size: 24rpx;
	color: #374151;
	margin-bottom: 8rpx;
}

.form-label-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 8rpx;
}

.form-input {
	width: 100%;
	height: 72rpx;
	border-radius: 14rpx;
	background-color: #f9fafb;
	padding: 0 18rpx;
	box-sizing: border-box;
	font-size: 26rpx;
}

.form-textarea {
	width: 100%;
	min-height: 120rpx;
	border-radius: 14rpx;
	background-color: #f9fafb;
	padding: 12rpx 18rpx;
	box-sizing: border-box;
	font-size: 24rpx;
}

.form-tip {
	margin-top: 4rpx;
	font-size: 20rpx;
	color: #9ca3af;
}

/* 用料标签输入样式 */
.ingredients-tags {
	min-height: 72rpx;
	padding: 8rpx 4rpx;
	display: flex;
	flex-wrap: wrap;
	gap: 10rpx;
	background-color: #f9fafb;
	border-radius: 14rpx;
	box-sizing: border-box;
}

.ingredients-tag {
	display: flex;
	align-items: center;
	background-color: #eef2ff;
	border-radius: 999rpx;
	padding: 6rpx 14rpx;
}

.ingredients-tag-text {
	font-size: 22rpx;
	color: #111827;
}

.ingredients-tag-close {
	margin-left: 8rpx;
	font-size: 24rpx;
	color: #6b7280;
}

.ingredients-empty {
	font-size: 22rpx;
	color: #9ca3af;
}

.ingredients-actions {
	margin-top: 10rpx;
	display: flex;
	justify-content: flex-start;
}

.label-action-btn {
	padding: 0 22rpx;
	height: 56rpx;
	line-height: 56rpx;
	margin-left: auto;
}

.ingredients-input-row {
	margin-top: 10rpx;
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.ingredients-input {
	flex: 1;
}

/* 用料输入样式（列表形式） */
.ingredients-list {
	display: flex;
	flex-direction: column;
	gap: 10rpx;
}

.ingredient-item {
	display: flex;
	align-items: center;
}

.ingredient-index {
	width: 40rpx;
	text-align: center;
	font-size: 22rpx;
	color: #6b7280;
}

.ingredient-input {
	flex: 1;
}

.ingredients-actions {
	margin-top: 10rpx;
	display: flex;
	justify-content: flex-start;
}

/* 步骤输入样式 */
.steps-list {
	display: flex;
	flex-direction: column;
	gap: 10rpx;
}

.step-item {
	display: flex;
	align-items: center;
}

.step-index {
	width: 40rpx;
	text-align: center;
	font-size: 22rpx;
	color: #6b7280;
}

.step-input {
	flex: 1;
}

.step-delete-btn {
	margin-left: 12rpx;
	flex-shrink: 0;
}

.step-delete-icon {
	margin-left: 12rpx;
	width: 40rpx;
	height: 40rpx;
	flex-shrink: 0;
}

.steps-actions {
	margin-top: 10rpx;
	display: flex;
	justify-content: flex-start;
}

/* 菜品图片样式 */
.dish-images {
	display: flex;
	align-items: center;
	gap: 16rpx;
	flex-wrap: wrap;
}

.dish-image-item,
.dish-image-add {
	width: 150rpx;
	height: 150rpx;
	border-radius: 16rpx;
	position: relative;
	overflow: hidden;
	background-color: #f3f4f6;
	display: flex;
	align-items: center;
	justify-content: center;
}

.dish-image-thumb {
	width: 100%;
	height: 100%;
}

.dish-image-delete {
	position: absolute;
	top: 8rpx;
	right: 8rpx;
	width: 36rpx;
	height: 36rpx;
	border-radius: 50%;
	background-color: rgba(0, 0, 0, 0.5);
	color: #ffffff;
	font-size: 26rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.dish-image-add-icon {
	font-size: 40rpx;
	color: #9ca3af;
}

.dish-image-add-text {
	margin-top: 4rpx;
	font-size: 22rpx;
	color: #9ca3af;
}
</style>
