<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			
			// 初始化云开发
			this.initCloud()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			// 初始化云开发
			initCloud() {
				// #ifdef MP-WEIXIN
				if (wx.cloud) {
					wx.cloud.init({
						// 云开发环境ID，需要在微信公众平台配置
						env: 'cloudbase-3gz4rn5eb8027ec4', 
						// 是否在将用户访问记录到用户管理中
						traceUser: true 
					})
				} else {
					console.error('当前微信版本过低，无法使用云能力')
				}
				// #endif
			},
		}
	}
</script>

<style>
	/* 每个页面公共css */

	/* 隐藏 H5 / App 端滚动条，保留滚动功能 */
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		background: transparent;
	}
</style>
