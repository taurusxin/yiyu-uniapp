<template>
    <view>
        <!-- 引入登录按钮组件 -->
        <!-- <button type="default" @click="goLogin">登录页面测试</button> -->
        <view class="swiper">
            <u-swiper @tap="goClassDesc" :list="swiper_list" :effect3d="true" height="350" bg-color="#FFFFFF"></u-swiper>
        </view>
        <u-grid :col="3">
            <u-grid-item>
                <image style="width: 100rpx; height: 100rpx;" src="../../static/indexapp/i_print.png"></image>
                <view class="grid-text">代打印</view>
            </u-grid-item>
            <u-grid-item>
                <image style="width: 100rpx; height: 100rpx;" src="../../static/indexapp/i_goods.png"></image>
                <view class="grid-text">取外卖</view>
            </u-grid-item>
            <u-grid-item>
                <image style="width: 100rpx; height: 100rpx;" src="../../static/indexapp/i_diliver.png"></image>
                <view class="grid-text">取快递</view>
            </u-grid-item>
            <u-grid-item>
                <image style="width: 100rpx; height: 100rpx;" src="../../static/indexapp/i_class.png"></image>
                <view class="grid-text">看课表</view>
            </u-grid-item>
            <u-grid-item>
                <image style="width: 100rpx; height: 100rpx;" src="../../static/indexapp/i_join.png"></image>
                <view class="grid-text">加入我们</view>
            </u-grid-item>
            <u-grid-item>
                <image style="width: 100rpx; height: 100rpx;" src="../../static/indexapp/i_help.png"></image>
                <view class="grid-text">帮助</view>
            </u-grid-item>
        </u-grid>
        <view style="margin-top: 300rpx;">
            <u-divider>溢予，你的大学生活我承包了！</u-divider>
        </view>
        
    </view>
</template>

<script>
    import $Storage from "../../common/storage.js"
    export default {
        data() {
            return {
                swiper_list: [{
                        image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
                        title: '昨夜星辰昨夜风，画楼西畔桂堂东'
                    },
                    {
                        image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
                        title: '身无彩凤双飞翼，心有灵犀一点通'
                    },
                    {
                        image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
                        title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
                    }
                ],
            }
        },
        onLoad() {
            // 启动后判断有没有登录
            if ($Storage.getToken() == null || $Storage.getToken().length == 0) {
                this.goLogin()
            }
        },
        methods: {
            // goLogin() {
            //     uni.navigateTo({
            //         url: "../login/login",
            //         success: res => {},
            //         fail: () => {},
            //         complete: () => {}
            //     });
            // }
        }
    }
</script>

<style lang="scss" scoped>
    .swiper {
        margin: 0 0 35rpx 0;
    }

    .grid-text {
        font-size: 28rpx;
        margin-top: 4rpx;
        color: $u-type-info;
    }

</style>
