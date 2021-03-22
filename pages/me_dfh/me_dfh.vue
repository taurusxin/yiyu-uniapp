<template>
    <view class="info_content">
        <u-top-tips ref="uTips"></u-top-tips>
        <u-card v-for="item in info_data" :key="item.id" :title="'订单号：'+item.id"
            :sub-title="item.type == 'print' ? '代打印' : '取快递'"
            :thumb="item.type == 'print' ? '/static/list/printer.png' : '/static/list/delivery.png'"
            :thumb-circle="true" :head-border-bottom="false" margin="0rpx 0rpx 20rpx 0rpx"
            box-shadow="1px 1px 3px #e1e1e1">
            <view class="" slot="body">
                <view class="u-body-item u-flex u-col-between u-p-t-0">
                    <view class="u-body-item-title u-line-2">{{item.desca}}</view>
                </view>
                <view v-if="item.descb.length != 0" class="u-body-item u-flex u-col-between u-p-t-0">
                    <view class="u-body-item-title u-line-2">{{item.descb}}</view>
                </view>
                <view>
                    <u-line-progress :striped="true" :percent="item.status * 100" :striped-active="true"
                        :show-percent="true"></u-line-progress>
                </view>
            </view>
            <view class="card_foot" slot="foot">
                <view style="font-size:25rpx ;">
                    <u-icon name="clock-fill" size="34" color="" :label="item.time"></u-icon>
                </view>
                <view>
                    <u-button v-if="item.status < 0.7" style="width: 200rpx; height: 50rpx;" shape="circle"
                        type="primary" :plain="true" @click="goKeFu">找客服</u-button>
                    <u-button v-if="item.status >= 0.7" style="width: 200rpx; height: 50rpx;" shape="circle" type="info"
                        :plain="true" @click="showInfo">将派送</u-button>
                </view>
            </view>
        </u-card>
        <view v-if="info_data.length === 0" style="height: calc(100vh - 60rpx);display: flex;justify-content: center;">
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
                info_data: [],
            };
        },
        onShow() {
            this.getOrderDfh()
        },
        onPullDownRefresh() {
            this.getOrderDfh()
            this.$nextTick(function() {
                setTimeout(function() {
                    // 不加这个方法真机下拉会一直处于刷新状态，无法复位
                    uni.stopPullDownRefresh();
                }, 300)
            })
        },
        methods: {
            goKeFu() {
                uni.navigateTo({
                    url: '/pages/kefu/kefu',
                    success: res => {},
                    fail: () => {},
                    complete: () => {}
                });
            },
            getOrderDfh() {
                $api.getOrderDfh().then(res => {
                    if (res.statusCode == 200) {
                        console.log("请求待送达成功，返回如下：")
                        console.log(res.data)
                        this.info_data = res.data.dfh
                    } else {
                        console.log("请求错误" + res.data.errmsg)
                    }
                })
            },
            showInfo() {
                this.$refs.uTips.show({
                    title: '将派送不能催单哦',
                    type: 'warning',
                    duration: '2300'
                })
            }
        }
    }
</script>

<style scoped lang="scss">
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
        padding: 30rpx;
        height: 100vh;
        background-color: #f7fafc;
    }

    .u-card-wrap {
        background-color: $u-bg-color;
        padding: 1px;
    }

    .u-body-item {
        font-size: 29rpx;
        color: #333;
        padding: 20rpx 10rpx;
    }

    .card_foot {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
</style>
