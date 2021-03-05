<template>
    <view class="button">
        <u-button type="success" ripple="true" plain="true" class="loginbutton" :ripple="true" @getuserinfo="trydoLogin"
            open-type="getUserInfo">
            <u-icon name="weixin-fill" style="margin-right: 20rpx;">
            </u-icon>微信一键登录
        </u-button>
        <!-- <u-button @click="getStorage">缓存测试</u-button> -->
    </view>
</template>

<script>
    import $Storage from "../../common/storage.js"
    export default {
        data() {
            return {}
        },
        onLoad() {

        },
        methods: {
            goPage() {
                // 登录成功后跳转tabbar
                uni.switchTab({
                    url: '../../pages/index/index',
                    success: res => {},
                    fail: () => {},
                    complete: () => {
                        console.log("跳转回主页面")
                    }
                });
            },
            trydoLogin(e) {
                // 去掉下面一行跳转tabbar不会生效
                let _this = this
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
                                url: 'http://192.168.193.79:5000/auth/wxlogin',
                                method: 'GET',
                                data: {
                                    code: res.code,
                                    userinfo: userinfo
                                },
                                success: res => {
                                    // token和用户信息存入localstorage
                                    $Storage.setToken(res.data.token)
                                    console.log('token本地保存成功:' + res.data.token);
                                    $Storage.setUserinfo(userinfo)
                                    console.log('用户信息本地保存成功');

                                    _this.goPage()
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
    .button {
        width: 550rpx;
    }
</style>
