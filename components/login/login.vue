<template>
    <view class="button">
        <u-modal v-model="toastwindow.show" :content="toastwindow.content"></u-modal>
        <u-button type="success" ripple="true" plain="true" class="loginbutton" :ripple="true" @click="trydoLogin()">
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
            return {
                toastwindow: {
                    show: false,
                    content: ""
                },
            }
        },
        onLoad() {

        },
        methods: {
            showWindow(content) {
                this.toastwindow.show = true,
                    this.toastwindow.content = content
            },
            goPage() {
                // 登录成功后跳转tabbar
                uni.switchTab({
                    url: '/pages/index/index',
                    success: res => {},
                    fail: () => {},
                    complete: () => {
                        console.log("跳转回主页面")
                    }
                });
            },
            trydoLogin(e) {
                let _this = this
                wx.getUserProfile({
                        lang: "zh_cn",
                        desc: "用于展示",
                        success(res) {
                            // // 获取用户信息
                            let userinfo = res.userInfo
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
                                            url: 'https://yiyv.miniapp.client.everdo.cn/auth/wxlogin',
                                            method: 'GET',
                                            data: {
                                                code: res.code,
                                                userinfo: userinfo
                                            },
                                            success: res => {
                                                // token和用户信息存入localstorage
                                                if (res.statusCode == 200) {
                                                    $Storage.setToken(res.data.token)
                                                    console.log('token本地保存成功:' + res.data
                                                        .token);
                                                    $Storage.setUserinfo(userinfo)
                                                    console.log('用户信息本地保存成功');
                                                    _this.goPage()
                                                } else {
                                                    console.log('登录失败');
                                                    // 增加登录失败提示
                                                    _this.showWindow("登录失败，重启小程序再试！")
                                                }
                                            },
                                            fail: () => {
                                                console.log('登录失败');
                                                // 增加登录失败提示
                                                _this.showWindow("登录失败，重启小程序再试！")
                                            },
                                            complete: () => {
                                                console.log('登录过程结束');
                                                // _this.goPage()
                                            }
                                        });
                                    } else {
                                        console.log('登录失败！' + res.errMsg)
                                    }
                                }
                            })
                        },
                        fail(err) {
                            console.log("用户取消了授权")
                            console.log(err)
                            _this.showWindow("您已取消了授权！")
                        }
                    }
                )
            }
        }
    }
</script>

<style lang="scss" scoped>
    .button {
        width: 550rpx;
    }
</style>
