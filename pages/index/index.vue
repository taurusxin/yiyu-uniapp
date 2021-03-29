<template>
    <view>
        <!-- 引入登录按钮组件 -->
        <!-- <button type="default" @click="goLogin">登录页面测试</button> -->
        <view class="swiper">
            <u-swiper @click="goPicDesc" :list="swiper_list" :title="false" :effect3d="true" height="350"
                bg-color="#FFFFFF">
            </u-swiper>
        </view>
        <u-grid :col="3">
            <u-grid-item @click="goPage('/pages/do_print/do_print')">
                <image style="width: 100rpx; height: 100rpx;" src="../../static/indexapp/i_print.png"></image>
                <view class="grid-text">代打印</view>
            </u-grid-item>
            <u-grid-item @click="goPage('/pages/do_deliver/do_deliver')">
                <image style="width: 100rpx; height: 100rpx;" src="../../static/indexapp/i_deliver.png"></image>
                <view class="grid-text">取快递</view>
            </u-grid-item>
            <u-grid-item @click="goPage('/pages/do_activity/do_activity')">
                <image style="width: 100rpx; height: 100rpx;" src="../../static/indexapp/i_activity.png"></image>
                <view class="grid-text">活动</view>
            </u-grid-item>
            <u-grid-item @click="goClassesTab">
                <image style="width: 100rpx; height: 100rpx;" src="../../static/indexapp/i_class.png"></image>
                <view class="grid-text">看课表</view>
            </u-grid-item>
            <u-grid-item @click="goPage('/pages/do_join/do_join')">
                <image style="width: 100rpx; height: 100rpx;" src="../../static/indexapp/i_join.png"></image>
                <view class="grid-text">加入我们</view>
            </u-grid-item>
            <u-grid-item @click="goPage('/pages/do_help/do_help')">
                <image style="width: 100rpx; height: 100rpx;" src="../../static/indexapp/i_help.png"></image>
                <view class="grid-text">帮助</view>
            </u-grid-item>
        </u-grid>
        <view style="margin : 200rpx 0 80rpx 0;">
            <u-divider>溢予，你的大学生活我承包了！</u-divider>
        </view>

    </view>
</template>

<script>
    import $api from "../../api/api.js"
    import $Storage from "../../common/storage.js"
    export default {
        data() {
            return {
                swiper_list: []
            }
        },
        onLoad() {
            // 启动后判断有没有登录
            if ($Storage.getToken() == null || $Storage.getToken().length == 0) {
                this.goLogin()
            }
            this.getSwiperData()
        },
        methods: {
            goPicDesc(index) {
                let id = this.swiper_list[index].id
                let src = this.swiper_list[index].src
                let type = this.swiper_list[index].type
                if (type == "web") {
                    console.log("前往webview，点击轮播图的序号 " + index + " ID为 " + id)
                    uni.navigateTo({
                        url: '/pages/swiper_desc/swiper_desc?' + `id=${id}` + `&src=${src}`,
                        success: res => {},
                        fail: () => {},
                        complete: () => {}
                    });
                } else {
                    console.log("前往活动详情，点击轮播图的序号 " + index + " ID为 " + id)
                    uni.navigateTo({
                        url: '/pages/do_activity_info/do_activity_info?' + `id=${id}`,
                        success: res => {},
                        fail: () => {},
                        complete: () => {}
                    });
                }
            },
            getSwiperData() {
                $api.getIndexSwiper().then(
                    res => {
                        console.log(res.data)
                        //获取头图
                        this.swiper_list = res.data.swiper_list
                        // TODO 后期要删掉这里的数据
                        this.swiper_list = [{
                                id: 1, //轮播ID
                                image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',    //轮播图片
                                src: "https://www.everdo.cn",   //webview网址
                                type: "web",    //跳转webview还是活动页面
                                activity: 1,    //活动ID
                            },
                            {
                                id: 2,
                                image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
                                src: "https://www.everdo.cn",
                                type: "activity",
                                activity: 1,
                            },
                            {
                                id: 3,
                                image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
                                src: "https://www.everdo.cn",
                                type: "web",
                                activity: 1,
                            }
                        ]
                        // TODO 后期要删掉上面的数据
                    },
                ).catch(
                    err => {}
                )
            },
            goClassesTab() {
                uni.switchTab({
                    url: "/pages/classtable/classtable",
                    success: res => {},
                    fail: () => {},
                    complete: () => {}
                })
            },
            goPage(e) {
                console.log("准备跳转地址" + e)
                uni.navigateTo({
                    url: e,
                    success: res => {},
                    fail: () => {},
                    complete: () => {}
                });
            },
            goLogin() {
                uni.navigateTo({
                    url: "../login/login",
                    success: res => {},
                    fail: () => {},
                    complete: () => {}
                });
            }
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
