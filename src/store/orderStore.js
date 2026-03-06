const STORAGE_KEY = 'order_dishes'

// 更新TabBar角标数字
function updateTabBarBadge(count) { 
	const c = Number(count) || 0
	if(!c){
		uni.removeTabBarBadge({ index: 1 })
		return
	}
	uni.setTabBarBadge({ index: 1, text: String(c) })
}

// 获取已点菜品列表
export function getDishesList() {
	const raw = uni.getStorageSync(STORAGE_KEY) || '[]'
	const list = JSON.parse(raw)

	// 更新角标数字
	updateTabBarBadge(list.length)
	return list
}

// 保存已点菜品
export function saveDishesList(dishes) {
	uni.setStorageSync(STORAGE_KEY, JSON.stringify(dishes))

	// 更新角标数字
	updateTabBarBadge(dishes.length)
}

// 清空已点菜品
export function clearDishesListList() {
	uni.removeStorageSync(STORAGE_KEY)

	// 更新角标数字
	updateTabBarBadge(0)
}

