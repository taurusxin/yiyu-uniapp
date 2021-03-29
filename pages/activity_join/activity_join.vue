<template>
    <view class="content">
        <u-modal v-model="toastwindow.show" :content="toastwindow.content" @confirm="confirm"></u-modal>
        <view class="success">
            <u-image width="160rpx" height="160rpx" src="@/static/success.png" shape="circle" mode="aspectFit">
            </u-image>
        </view>
        <view class="info">
            <view>
                <view class="text">
                    <text>您已经成功报名</text>
                </view>
                <view class="text">
                    <text>请凭活动码参加活动</text>
                </view>
            </view>
            <view>
                <text>{{code}}</text>
            </view>
            <View class="button">
                <u-button type="error" plain :ripple="true" @click="cancleJoin">取消报名</u-button>
            </View>
        </view>
    </view>
</template>

<script>
    import $api from "../../api/api.js"
    export default {
        data() {
            return {
                id: null,
                code: "",
                toastwindow: {
                    show: false,
                    content: ""
                }
            };
        },
        onLoad(e) {
            console.log("报名信息页面收到的ID为：", e)
            this.id = e.id
            this.code = e.code
        },
        methods: {
            confirm(){
                this.toastwindow.show = false
                uni.navigateBack();
            },
            showWindow(content) {
                this.toastwindow.show = true,
                    this.toastwindow.content = content
            },
            cancleJoin() {
                $api.setJoinActivity(this.id, "remove").then(res => {
                    if (res.statusCode == 200) {
                        // 已经绑定
                        this.showWindow("取消报名成功！")
                        
                    } else {
                        this.showWindow("取消报名失败。" + res.data.errMsg)
                    }
                }).catch(e => {
                    this.showWindow("取消报名失败。" + e)
                    console.log(e)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    page {
        height: 100%;
        // 支付宝小程序,钉钉小程序需添加绝对定位,否则height:100%失效: https://opendocs.alipay.com/mini/framework/acss#%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98
        /* #ifdef MP-ALIPAY || MP-DINGTALK*/
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        /* #endif */
    }

    .content {
        width: 100%;
        height: 100%;

        .success {
            width: 100%;
            height: 280rpx;
            margin: 200rpx 0 100rpx 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .info {
            width: 100%;
            height: 300rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            text-align: center;

            font-size: 40rpx;
            font-weight: 650;

            .text {
                height: 90rpx;
                font-size: 40rpx;
                font-weight: 550;
            }
        }

        .button {
            width: 300rpx;
            height: 80rpx;
            margin: 100rpx 0 100rpx 0;
        }

    }
</style>
