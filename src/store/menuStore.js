import { menuList as defaultMenuList } from '../mock/menu.js'

const STORAGE_KEY = 'menu_categories'

// 获取菜单列表
export function getMenuList() {
	// 优先本地存储
	const raw = uni.getStorageSync(STORAGE_KEY) || '[]'
	const stored = JSON.parse(raw)
	if (Array.isArray(stored) && stored.length) {
		return stored
	}
	// 使用 mock 默认数据
	return JSON.parse(JSON.stringify(defaultMenuList || []))
}

// 保存菜单到本地存储
export function saveMenuListToStorage(menu) {
	uni.setStorageSync(STORAGE_KEY, JSON.stringify(menu))
}

