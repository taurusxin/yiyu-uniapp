<template>
    <view class="loginform">
        <view class="innerform">
            <image class="logo" src="../../static/logo_customer.png" mode=""></image>
            <view style="margin-bottom: 60rpx;">
                <text style="font-size: 30rpx; font-weight: 500;">
                    遇到问题？外卖啥时候到？课表有问题？
                </text>
            </view>
            <view style="width: 550rpx;margin-bottom: 40rpx;">
                
                <text style="font-size: 50rpx; font-weight: 800;">
                    试试找客服！
                </text>
            </view>

            <view class="button">
                <u-button type="info" ripple="true" plain="true" class="loginbutton" :ripple="true" @getuserinfo="trydoLogin"
                    open-type="contact">
                    <u-icon name="kefu-ermai" style="margin-right: 20rpx;">
                    </u-icon>联系溢予客服
                </u-button>
                <!-- <u-button @click="getStorage">缓存测试</u-button> -->
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

        .button {
            width: 550rpx;
        }

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
