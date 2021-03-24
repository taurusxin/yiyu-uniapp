<template>

    <view class="center">
        <!-- 点击提示 -->
        <u-modal v-model="toastwindow.show" :content="toastwindow.content"></u-modal>
        <!-- 点击提示结束 -->
        <view class="center_top">
            <view class="mask">
            </view>
        </view>

        <view class="center_box_bg">
            <view class="profily">
                <view class="base">
                    <u-avatar :src="avatarurl"></u-avatar>
                    <text>{{nickname}}</text>
                    <!-- <image src="../../static/fumou-center-template/setting.png" mode=""></image> -->
                </view>
                <!-- 个人信息下方四个按钮 -->
                <view class="order_status">

                    <view class="status" v-for="(item,index) in status" :key="index" @click="goPage(item.addr)">
                        <view style="margin: -20rpx 0 0 10rpx;width: 210rpx; height: 20rpx;">
                            <u-badge size="mini" type="error" :count="item.num" :absolute="false"></u-badge>
                        </view>
                        <image class="icon" :src="item.url" mode="aspectFill"></image>
                        <text>{{item.name}}</text>
                    </view>
                </view>
            </view>
            <view class="baiban">

            </view>
            <!-- 设置项 -->
            <view class="center_menu">
                <view class="funcation_list">
                    <view>
                        <u-cell-group>
                            <u-cell-item icon="rmb-circle" title="溢予钱包" :arrow="false" :value="money + ' 元'">
                            </u-cell-item>
                            <u-cell-item icon="bell" title="课表提醒" :arrow="false">
                                <u-switch slot="right-icon" v-model="setting_remind" @change="switchRemind"></u-switch>
                            </u-cell-item>
                            <u-cell-item icon="edit-pen" title="教务绑定" :arrow="true"
                                @click="goPage('/pages/setting_jiaowu/setting_jiaowu')"></u-cell-item>
                            <u-cell-item icon="account" title="个人信息" :arrow="true"
                                @click="goPage('/pages/setting_person/setting_person')"></u-cell-item>
                            <u-cell-item icon="map" title="地址管理" :arrow="true"
                                @click="goPage('/pages/setting_addr/setting_addr')"></u-cell-item>
                        </u-cell-group>
                    </view>
                    <view style="margin-top: 20rpx;">
                        <u-cell-group>
                            <u-cell-item icon="kefu-ermai" title="人工客服" :arrow="true"
                                @click="goPage('/pages/kefu/kefu')"></u-cell-item>
                        </u-cell-group>
                        <u-cell-group>
                            <u-cell-item icon="info-circle" title="关于我们" :arrow="false" value="v0.2.23 RC3">
                            </u-cell-item>
                        </u-cell-group>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import $api from "../../api/api.js"
    import $Storage from "../../common/storage.js"
    export default {
        data() {
            return {
                avatarurl: "",
                nickname: "您未登录",
                setting_remind: true,
                toastwindow: {
                    show: false,
                    content: ""
                },
                money: 'loading',
                status: [{
                        key: 1,
                        name: '待送达',
                        url: '../../static/fumou-center-template/one.png',
                        addr: '/pages/me_dfh/me_dfh',
                        num: 0
                    },
                    {
                        key: 2,
                        name: '待确认',
                        url: '../../static/fumou-center-template/2.png',
                        addr: '/pages/me_dsh/me_dsh',
                        num: 0
                    },
                    {
                        key: 3,
                        name: '全部订单',
                        url: '../../static/fumou-center-template/4.png',
                        addr: '/pages/me_orders/me_orders',
                        num: 0
                    },
                    {
                        key: 4,
                        name: '我的活动',
                        url: '../../static/fumou-center-template/7.png',
                        addr: '/pages/me_hd/me_hd',
                        num: 0
                    },
                ],
            };
        },
        methods: {
            getMoney(type) {
                $api.getMoney(type).then(res => {
                    this.money = res.data.money
                })
            },
            getMeNum() {
                $api.getMeMum().then(res => {
                    let num = res.data.num
                    // TODO API完成后移除下方 bum
                    num = [1, 0, 3, 5]
                    // TODO API完成后移除上方 num
                    for (let i = 0; i < num.length; i++) {
                        this.status[i].num = num[i]
                    }
                })
            },
            getReminder() {
                $api.getReminder().then(res => {
                    this.setting_remind = res.data.setting_remind
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
            showWindow(content) {
                this.toastwindow.show = true,
                    this.toastwindow.content = content
            },
            switchRemind(e) {
                console.log("课表提醒状态：" + e)
                if (e) {
                    // 此处需要API，成功后显示window
                    $api.setReminder(true).then((res) => {
                        if (res.statusCode == 200) {
                            this.showWindow("课表提醒已开启")
                            this.getReminder()
                        } else {
                            this.showWindow("开启失败，请重试")
                            this.getReminder()
                        }
                    }).catch((err) => {
                        console.log(err)
                        this.showWindow("开启失败（网络错误）")
                    })
                } else {
                    // 此处需要API，成功后显示window
                    $api.setReminder(false).then((res) => {
                        if (res.statusCode == 200) {
                            this.showWindow("课表提醒已关闭")
                            this.getReminder()
                        } else {
                            this.showWindow("关闭失败，请重试")
                            this.getReminder()
                        }
                    }).catch((err) => {
                        console.log(err)
                        this.showWindow("关闭失败（网络错误）")
                    })
                }

            }
        },
        computed: {

        },
        onShow() {
            console.log($Storage.getUserinfo())
            let userinfo = $Storage.getUserinfo()

            if (userinfo == null || userinfo.length == 0) {
                this.nickname = "您未登录"
                this.avatarurl = "../../static/fumou-center-template/header.jpg"
            } else {
                this.nickname = userinfo.nickName
                this.avatarurl = userinfo.avatarUrl
                console.log(this.avatarurl)
            }
            this.getMoney("user")
            this.getMeNum()
        },
        onLoad() {
            this.getReminder()
        }
    }
</script>

<style lang="scss">
    page {
        height: 100%;
    }

    .profily,
    .profily_header {
        border-radius: 8px;
    }

    .center {
        height: 100%;

        &_top {
            height: 18%;
            background: url('../../static/fumou-center-template/header.jpg') no-repeat 0% 50%;
            background-size: cover;

            // background: #E6E6E6;
            .mask {
                background: rgba(0, 0, 0, .4);
                height: 100%;
            }
        }

        &_box_bg {
            background: #F9F9F9;
            position: relative;

            .profily {
                position: absolute;
                width: 90%;
                // border:1px solid #F7F7F7;
                margin: 0 auto;
                top: -100upx;
                left: 5%;
                background: #FEFEFE;
                padding: 35upx;
                box-sizing: border-box;
                box-shadow: 0px 2px 5px #EDEDED;
            }
        }
    }

    .base {
        display: flex;
        align-items: center;
        border-bottom: 2px solid #F6F6F6;
        padding-bottom: 35upx;
        position: relative;

        text {
            margin-left: 20px;
            font-size: 30upx;
        }

        image {
            position: absolute;
            height: 40upx;
            width: 40upx;
            right: 0px;
            top: 0px;
        }
    }

    .order_status {
        display: flex;
        justify-content: space-between;
        margin-top: 35upx;

        .status {
            width: 140upx;
            font-size: 24upx;
            text-align: center;
            letter-spacing: .5px;
            display: flex;
            flex-direction: column;

            .icon {
                width: 50upx;
                height: 50upx;
                margin: 0 auto;
                margin-bottom: 5px;

            }
        }
    }

    .baiban {
        background: #FEFEFE;
        height: 300upx;
    }

    .center_menu {
        padding: 0 35rpx 0 35rpx;
        width: 100%;
        display: inline-block;
        background: #FEFEFE;

        .menu_item {
            font-size: 28upx;
            letter-spacing: 1px;
            padding: 14px 5%;
            background: #FEFEFE;
            overflow: hidden;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            position: relative;
            border-bottom: 1px solid #EFEFEF;
        }
    }
</style>
