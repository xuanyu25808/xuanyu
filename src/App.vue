<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
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
