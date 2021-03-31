<template>
    <view class="info_content">
        <u-card v-for="(card,index) in cardlist" :key="index" :title="card.title" :sub-title="card.subTitle"
            @click="goActivityDesc(card.id)">
            <view class="" slot="body">
                <view class="u-body-item u-flex u-col-between u-p-t-0">
                    <view class="u-body-item-title u-line-2">{{card.desc}}</view>
                    <image style="margin: 0 0 0 auto" :src="card.img" mode="aspectFill"></image>
                </view>
            </view>
            <view class="card_foot" slot="foot">
                <u-icon name="man-add" size="34" color="" :label="card.people + ' 人报名'"></u-icon>
                <view>
                    <u-tag v-if="card.join" text="已报名" type="success" />
                    <u-tag v-else text="未报名" type="info" />
                </view>
            </view>
        </u-card>
        <view v-if="cardlist.length === 0" style="height: calc(100vh - 60rpx);display: flex;justify-content: center;">
            <view style="display: flex;justify-content: center;flex-direction: column;">
                <view style="margin-top: -150rpx;">
                    <image src="../../static/empty.png" style="width: 100px; height: 80px;"></image>
                </view>
                <view style="margin-top: 30rpx; text-align: center;">
                    <text>
                        这里什么都没有
                    </text>
                </view>
            </view>
        </view>
        <view v-else style="height: 50px;"></view>
    </view>
</template>

<script>
    import $api from "../../api/api.js"
    export default {
        data() {
            return {
                cardlist: []
            };
        },
        onShow() {
            this.getActList()
        },
        onPullDownRefresh() {
            this.getActList()
            this.$nextTick(function() {
                setTimeout(function() {
                    // 不加这个方法真机下拉会一直处于刷新状态，无法复位
                    uni.stopPullDownRefresh();
                }, 300)
            })
        },
        methods: {
            getActList() {
                $api.getActList("all").then(res => {
                    this.cardlist = res.data.cardlist
                }).catch(e => {
                    console.log(e)
                })
            },
            goActivityDesc(id) {
                console.log("准备跳转，将跳转的ID：" + id)
                uni.navigateTo({
                    url: '/pages/do_activity_info/do_activity_info?id=' + id,
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

    .info_content {
        margin: 0rpx;
        padding: 5rpx;
        height: 100vh;
        background-color: #f7fafc;

        .card_foot {
            display: flex;
            flex-direction: row;
            justify-content: space-between;

        }

    }

    .u-card-wrap {
        background-color: $u-bg-color;
        padding: 1px;
    }

    .u-body-item {
        font-size: 32rpx;
        color: #333;
        padding: 20rpx 10rpx;
    }

    .u-body-item image {
        width: 120rpx;
        flex: 0 0 120rpx;
        height: 120rpx;
        border-radius: 8rpx;
        margin-left: 12rpx;
    }
</style>
