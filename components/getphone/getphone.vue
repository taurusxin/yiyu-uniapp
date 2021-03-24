<template>
    <view class="button">
        <u-modal v-model="toastwindow.show" :content="toastwindow.content"></u-modal>
        <u-button type="info" ripple="true" plain="true" class="loginbutton" :ripple="true" @getphonenumber="getPhone"
            open-type="getPhoneNumber">
            <!-- <u-icon name="weixin-fill" style="margin-right: 20rpx;"> -->
            </u-icon>获取手机号
        </u-button>
        <!-- <u-button @click="getStorage">缓存测试</u-button> -->
    </view>
</template>

<script>
    import $api from "../../api/api.js"
    import $Storage from "../../common/storage.js"
    export default {
        name: "getphone",
        data() {
            return {
                code: '',
                sessionkey: '',
                phone: '',
                toastwindow: {
                    show: false,
                    content: ""
                },
                permition: true,
            }
        },
        created() {
            this.trydoLogin()
        },
        methods: {
            showWindow(content) {
                this.toastwindow.show = true,
                    this.toastwindow.content = content
            },
            getPhone(e) {
                console.log(e.detail.errMsg)
                if (e.detail.iv) {
                    console.log(e.detail.iv)
                    console.log(e.detail.encryptedData)
                    $api.getPhoneNumber(this.code, e.detail.iv, e.detail.encryptedData).then(res => {
                        // console.log(res.data)
                        this.phone = res.data.purePhoneNumber
                        this.$emit('getPhone', this.phone)
                    })
                }
            },
            trydoLogin() {
                // 去掉下面一行跳转tabbar不会生效
                let _this = this
                // 获取用户信息
                wx.login({
                    success(res) {
                        console.log("手机获取-微信登录发起")
                        console.log(res)
                        if (res.code) {
                            _this.code = res.code
                            console.log("code获取成功：" + res.code)
                        } else {
                            console.log('手机获取-微信登录发起失败！' + res.errMsg)
                        }
                    },
                    fail(err) {
                        console.log("手机获取-微信登录发起失败！")
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .button {
        // width: 550rpx;
    }
</style>
