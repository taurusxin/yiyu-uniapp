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
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			trydoLogin(e) {
				let userinfo = e.detail.userInfo
				console.log(userinfo)
				console.log("获取用户信息成功")
				wx.login({
				  success (res) {
					  console.log("微信登录发起")
					  console.log(res)
				    if (res.code) {
				      //发起网络请求
				      wx.request({
				        url: 'https://api.everdo.com/onLogin',
				        data: {
				          code: res.code,
						  userinfo: userinfo
				        }
				      })
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
