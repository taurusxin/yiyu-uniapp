<template>
    <view class="loginform">
        <view class="innerform">
            <image class="logo" src="../../static/logo_customer.png" mode=""></image>
            <view style="margin-bottom: 60rpx;">
                <text style="font-size: 50rpx; font-weight: 800;">
                    欢迎登录溢予小程序！
                </text>
            </view>
            <view style="width: 550rpx;margin-bottom: 40rpx;">
                <text>
                    登录后可以快捷查看课表，托人拿快递外卖等校园服务！
                </text>
            </view>

            <login></login>
            <view style="width: 550rpx;margin-top: 30rpx;">
                <text style="font-size: 25rpx; font-weight: 200;">
                    登录即表示同意《用户协议》
                </text>
            </view>
        </view>

    </view>
</template>

<script>
    export default {
        data() {
            return {

            };
        }
    }
</script>

<style lang="scss" scoped>
    .loginform {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;

        .innerform {
            height: 800rpx;
        }

        .logo {
            width: 120rpx;
            height: 120rpx;
            margin-bottom: 40rpx;
        }
    }
</style>
