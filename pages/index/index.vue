<template>
	<view class="content">

		<view class="button-demo">
			<u-button :ripple="true" @getuserinfo="trydoLogin" open-type="getUserInfo">登录测试</u-button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad() {

		},
		methods: {
			trydoLogin(e) {
				// 获取用户信息
				let userinfo = e.detail.userInfo
				console.log(userinfo)
				console.log("获取用户信息成功")
				// wx.login需要在获取用户信息后才能调用
				wx.login({
					success(res) {
						console.log("微信登录发起")
						console.log(res)
						if (res.code) {
							// 发起网络请求
							// 小程序密钥 AppSecret：06281bb8b4f5fc0024f8fedb6674349a
							// 小程序ID APPID: wx518df2bfc44d1a33
							// api地址已定：yiyv.miniapp.client.everdo.cn
							// 使用unirequest代替wx.request
							uni.request({
								// 后端请求地址 GET https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
								// 请求后获得 openid 和 密钥
								// url: 'https://yiyv.miniapp.client.everdo.cn/auth/wxlogin',
								url: 'http://测试地址/auth/wxlogin',
								method: 'GET',
								data: {
									code: res.code,
									userinfo: userinfo
								},
								success: res => {
									// token和用户信息存入localstorage
									uni.setStorage({
										key: "token",
										value: res.token,
										success: function() {
											console.log('token本地保存成功');
										}
									})
									uni.setStorage({
										key: "userinfo",
										value: userinfo,
										success: function() {
											console.log('用户信息本地保存成功');
										}
									})
								},
								fail: () => {},
								complete: () => {}
							});
						} else {
							console.log('登录失败！' + res.errMsg)
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 40rpx;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 100rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 28rpx;
		color: $u-content-color;
	}

	.button-demo {
		margin-top: 80rpx;
	}

	.link-demo {
		margin-top: 80rpx;
	}
</style>
