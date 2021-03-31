<template>
    <view class="content">
        <u-modal v-model="toastwindow.show" :content="toastwindow.content"></u-modal>
        <view class="image">
            <u-image width="100%" height="400rpx" :src="passage.img" mode="aspectFill"></u-image>
        </view>
        <view class="mask" :style="'opacity:' + mask_opacity"></view>
        <view class="title">
            <text>
                {{passage.name}}
            </text>
        </view>
        <view class="detail">
            <view class="time">
                <u-icon name="clock-fill" style="margin-right: 20rpx;"></u-icon> {{passage.time}}
            </view>
            <u-divider half-width="100%" margin-top="25" :use-slot="false"></u-divider>
            <view class="desc" v-if="passage.desc.length > 0">{{passage.desc}}</view>
            <view class="main">
                <timeline :timeline="passage.timeline" v-if="passage.timeline.length > 0"></timeline>
            </view>
            <view class="main">
                <u-image width="100%" :src="passage.pra_img" mode="widthFix" v-if="passage.pra_img.length > 0">
                </u-image>
            </view>
            <view class="main">
                <u-parse :html="passage.rich_text" :tag-style="rich_style" :selectable="true"
                    v-if="passage.rich_text.length > 0">
                </u-parse>
                <view style="width: 100%; height: 85rpx;"></view>
            </view>
        </view>
        <view class="tab">
            <view class="tab-join">
                <u-button v-if="!passage.joined" style="width: 100%;" shape="circle" type="primary" @click="doJoin">立刻报名
                </u-button>
                <u-button v-else style="width: 100%;" shape="circle" type="success" @click="goActivityJoin">已报名，查看详情
                </u-button>
            </view>
        </view>
    </view>
</template>

<script>
    import $api from "../../api/api.js"
    export default {
        data() {
            return {
                toastwindow: {
                    show: false,
                    content: ""
                },
                mask_opacity: 0,
                rich_style: {
                    p: "margin: 0 0 25rpx 0;font-size: 27rpx; line-height: 38rpx; letter-spacing: 4rpx; text-align: justify; color: #505050;"
                },
                id: null,
                // 以下数据从后端接收
                passage: {}
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
                    title: this.passage.name
                })
            } else {
                uni.setNavigationBarTitle({
                    title: "活动详情"
                })
            }
        },

        onLoad(e) {
            console.log("跳转后页面取得的ID为：", e.id)
            this.id = e.id
        },
        onShow() {
            this.getActivityById(this.id)
        },
        methods: {
            getActivityById(id) {
                $api.getActById(id).then(res => {
                    this.passage = res.data.passage
                }).catch(e => {
                    console.log(e)
                })
            },
            showWindow(content) {
                this.toastwindow.show = true,
                    this.toastwindow.content = content
            },
            doJoin() {
                $api.setJoinActivity(this.id, "add").then(res => {
                    if (res.statusCode == 200) {
                        // 已经绑定
                        this.showWindow("报名成功！")
                        this.getActivityById(this.id)
                    } else {
                        this.showWindow("报名失败。" + res.data.errMsg)
                    }
                }).catch(e => {
                    this.showWindow("报名失败。" + e)
                    console.log(e)
                })
            },
            goActivityJoin() {
                uni.navigateTo({
                    url: '/pages/activity_join/activity_join?id=' + this.id + '&code=' + this.passage.code,
                    success: res => {},
                    fail: () => {},
                    complete: () => {}
                });
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
        // position: -webkit-sticky;
        // position: sticky;
        // top: 0;
    }

    .detail {
        padding: 35rpx;
        margin-top: 10rpx;
        width: 100%;
        min-height: 100vh;
        background-color: #FFFFFF;
        border-radius: 45rpx 45rpx 0 0;

        .time {
            font-size: 35rpx;
            font-weight: 700;
        }

        .desc {
            border-radius: 15rpx;
            padding: 25rpx;
            font-size: 27rpx;
            line-height: 38rpx;
            width: 100%;
            background-color: #c9dfff;
            margin: 40rpx 0rpx 60rpx 0rpx;
            letter-spacing: 4rpx;
            text-align: justify;
            // text-align-last: justify;
        }

        .main {
            width: 100%;
            padding: 0 30rpx 0 30rpx;
            margin: 0rpx 0rpx 40rpx 0rpx;
        }
    }

    .tab {
        box-shadow: 0px -0.5px 5px #E4E7ED;
        padding: 0 20rpx 0 20rpx;
        z-index: 1;
        height: 60px;
        width: 100%;
        line-height: 60rpx;
        position: fixed;
        align-items: center;
        justify-content: center;
        bottom: 0;
        left: 0;
        display: flex;
        background-color: #FFFFFF;


        .tab-join {
            justify-content: center;
            text-align: center;
            color: #333333;
            width: 96%;
            height: 50px;
            line-height: 50rpx;
            // background-color: #505050;
            // margin: 15rpx;
            display: -webkit-flex;
            display: flex;
            -webkit-flex-direction: row;
            flex-direction: row;
            align-items: center;
        }

    }
</style>
