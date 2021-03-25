<template>
    <view class="content">
        <view class="image">
            <u-image width="100%" height="400rpx" src="https://t7.baidu.com/it/u=1819248061,230866778&fm=193&f=GIF"
                mode="aspectFill"></u-image>
        </view>
        <view class="mask" :style="'opacity:' + mask_opacity"></view>
        <view class="title">
            <text>
                {{name}}
            </text>
        </view>
        <view class="detail">
            <view class="card1" style="height: 2000rpx; width: 100%; background-color: #0081FF;margin-top: 50rpx;">

            </view>
            <view class="card1" style="height: 2000rpx; width: 100%; background-color: #95ff53;margin-top: 50rpx;">

            </view>
        </view>

    </view>
</template>

<script>
    export default {
        data() {
            return {
                mask_opacity: 0,
                name: "第三届吃狗粮大赛",

            };
        },
        onPageScroll(e) {
            let scrollTop = e.scrollTop;
            let nav_temp = (scrollTop - 30) / 180
            // console.log(nav_temp)
            if (nav_temp > 0) {
                this.mask_opacity = nav_temp
            }
            if (nav_temp > 0.6) {
                uni.setNavigationBarTitle({
                    title: this.name
                })
            } else {
                uni.setNavigationBarTitle({
                    title: "活动详情"
                })
            }
        },

        onLoad(id) {
            console.log("跳转后页面取得的ID为：", id)
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

    .image {
        width: 100%;
        height: 400rpx;
        position: fixed;
        top: 0;
        left: 0;
        z-index: -2;

    }

    .mask {
        width: 100%;
        height: 400rpx;
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
        background-color: rgba(255, 255, 255, 1);
    }

    .title {
        font-size: 50rpx;
        font-weight: 800;
        text-shadow: 1rpx 1rpx #4d4d4d;
        color: #FFFFFF;
        padding: 30rpx;
        margin-top: 200rpx;
        width: 100%;
        height: 120rpx;
        // background-color: #19BE6B;
        // position: -webkit-sticky;
        // position: sticky;
        // top: 0;
    }

    .detail {
        padding: 30rpx;
        margin-top: 10rpx;
        width: 100%;
        min-height: 100vh;
        background-color: #FFFFFF;
        border-radius: 45rpx 45rpx 0 0;
    }
</style>
