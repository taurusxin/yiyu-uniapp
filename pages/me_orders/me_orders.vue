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
                <view v-if="item.status < 1">
                    <u-line-progress :striped="true" :percent="item.status * 100" :striped-active="true"
                        :show-percent="true"></u-line-progress>
                </view>
            </view>
            <view class="card_foot" slot="foot">
                <view style="font-size:25rpx ;">
                    <u-icon name="clock-fill" size="34" color="" :label="item.time"></u-icon>
                </view>
                <view style="font-weight: 800;">
                    <u-tag v-if="item.status < 1" text="待送达"></u-tag>
                    <u-tag v-if="item.status == 1" text="待收货" type="warning"></u-tag>
                    <u-tag v-if="item.status > 1" text="已确认" type="success"></u-tag>
                </view>
            </view>
        </u-card>

        <view style="margin: 50px 0 50px 0;">
            <u-loadmore :status="status" />
        </view>
    </view>
</template>

<script>
    import $api from "../../api/api.js"
    export default {
        data() {
            return {
                page: 1, //这是前端存放当前请求到第几页的flag
                status: 'nomore',
                info_data: [{
                        "id": 1, //订单号
                        "type": "deliver", //订单类型
                        "desca": "快递号：SF12123789127",
                        "descb": "取件码：7777",
                        "status": 0.3,
                        "time": "2020-05-15 19:00" //下单时间
                    },
                    {
                        "id": 2,
                        "type": "print",
                        "desca": "文件名：期末复习题.docx",
                        "descb": "",
                        "status": 2, //约定 >0.7 的状态前端就是将派送
                        "time": "2020-05-15 12:00"
                    }, {
                        "id": 3, //订单号
                        "type": "deliver", //订单类型
                        "desca": "快递号：SF12123789127",
                        "descb": "取件码：7777",
                        "status": 0.3,
                        "time": "2020-05-15 19:00" //下单时间
                    },
                    {
                        "id": 4,
                        "type": "print",
                        "desca": "文件名：期末复习题.docx",
                        "descb": "",
                        "status": 2, //约定 >0.7 的状态前端就是将派送
                        "time": "2020-05-15 12:00"
                    }
                ],
            };
        },
        onShow() {
            this.getOrderAll(1)
        },
        onPullDownRefresh() {
            this.getOrderAll(1)
            this.$nextTick(function() {
                setTimeout(function() {
                    // 不加这个方法真机下拉会一直处于刷新状态，无法复位
                    uni.stopPullDownRefresh();
                }, 300)
            })
        },
        onReachBottom() {
            // 下拉刷新代码放这里
            // TODO
            setTimeout(() => {
                if (this.status == 'loadmore') {
                    this.page += 1
                    // 载入新页面
                    this.getOrderAll(this.page)
                }
            }, 2000)
        },
        methods: {
            getOrderAll(page) {
                $api.getOrderAll(page).then(res => {
                    if (res.statusCode == 200) {
                        console.log("请求全部订单成功，返回如下：")
                        console.log(this.info_data)
                        if (page == 1) {
                            // 下拉刷新或首次载入时清空 this.info_data
                            this.info_data = res.data.all
                        } else {
                            // 拼接对象
                            // TODO 这里可能有写错的
                            this.info_data = Object.assign(this.info_data, res.data.all)
                            // res.data.page 需要服务端返回还剩几页
                            if (res.data.page == 0) {
                                this.status = 'nomore'
                            } else {
                                this.status = 'loadmore'
                            }
                        }
                    } else {
                        console.log("获取全部订单出错：" + res.errmsg)
                    }
                }).catch(e => {
                    console.log(e)
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
