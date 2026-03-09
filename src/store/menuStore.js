
// 获取菜单列表
export function getMenuList() {
	return new Promise((resolve, reject) => {
		if (!wx.cloud) {
			console.warn('微信云开发未初始化')
			resolve([])
			return
		}
		const db = wx.cloud.database()
		const foodListCollection = db.collection('foodList')
		
		foodListCollection.get().then(res => {
			resolve(res.data || [])
		}).catch(err => {
			console.error('获取菜单数据失败:', err)
			resolve([])
		})
	})
}

