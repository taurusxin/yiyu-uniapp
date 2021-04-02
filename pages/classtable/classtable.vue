<template>
    <!-- 老师课表 -->
    <view class="time-table width-100-bfb flex flex-direction" style="height: 100vh">
        <u-top-tips ref="uTips"></u-top-tips>
        <view class="">
            <view class="cu-bar bg-white text-primary">
                <view class="action" @click="previousWeek">
                    <text class="cuIcon-back" style="margin-right: unset;"></text>
                    <text class="text-bold text-lg">上一周</text>
                </view>
                <text class="content text-bold">{{ time }}</text>
                <view class="action" @click="nextWeek">
                    <text class="text-bold text-lg">下一周</text>
                    <text class="cuIcon-right"></text>
                </view>
            </view>
            <view class="flex text-center page-bg-white margin-bottom-sm">
                <view class="cu-item flex-sub" v-for="(item, index) in timeList" :key="index" @click="tabSelect"
                    :data-id="index">
                    <view class="margin-tb text-lg" style="color: #B1B1B1;">{{ item.week }}</view>
                    <view class="text-bold text-lg time radio-circle"
                        :class="index + 1 === week ? 'text-white page-bg-primary radio-circle' : ''">{{ item.time }}
                    </view>
                    <text class="text-gray" style="font-size: 80rpx;line-height: 20rpx;"
                        v-if="index + 1 === week">·</text>
                </view>
            </view>
        </view>
        <view v-for="(item, index) in list" :key="index" v-if="index + 1 === week" class="flex-sub">
            <view class="" v-for="(items, i) in item" :key="i" v-if="item.length !== 0">
                <view class="cu-card article" :class="isCard ? 'no-card' : ''">
                    <view class="cu-item padding-bottom-xs margin-bottom-xs cu-shadow">
                        <view class="cu-list menu-avatar">
                            <view class="cu-item flex justify-between margin-lr text-xl height-50 ">
                                <view class="text-lg">
                                    <text class="cuIcon-time text-orange"></text>
                                    <text class="margin-lr-xs text-bold">{{ items.num }}</text>
                                </view>
                            </view>
                        </view>
                        <view class="text-lg">
                            <view style="height: 60rpx;">
                                <text class="title padding-right-unset">时间：</text>
                                <text>{{ items.time }}</text>
                            </view>
                            <view>
                                <text class="title padding-right-unset">课程：</text>
                                <text>{{ (items.courseName.length>20)?items.courseName.substring(0,17)+"…":items.courseName.length+items.courseName }}</text>
                            </view>
                            <view>
                                <text class="title padding-right-unset">地址：</text>
                                <text>{{ items.className }}</text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="flex justify-center" style="margin-top: 260rpx;">
                <image src="../../static/not.png" mode="" v-if="item.length === 0" class="" style="width: 100px;
    height: 80px;"></image>
            </view>
        </view>
    </view>
</template>

<script>
    import $api from "../../api/api.js";
    import {
        formatDayTime
    } from './common.js';
    const oneDayTimeStamp = 86400000; // 一天的时间戳
    const now = new Date();
    const todayDayTimeStamp = now.getTime(); //今天的时间戳
    // const getDay = now.getDay(); // 今天的星期
    // 星期天的时候日期显示不对。计算到下周了 因为 new Date().getDay() 周天返回0 所以后面计算会有问题。转成 7 完美解决
    const getDay = now.getDay() == 0 ? 7 : now.getDay() // 今天的星期
    export default {
        name: 'time-table',
        data() {
            return {
                week: new Date().getDay() == 0 ? 7 : new Date().getDay(), // 今天的星期
                timeList: [{
                        time: '1',
                        week: '一'
                    },
                    {
                        time: '2',
                        week: '二'
                    },
                    {
                        time: '3',
                        week: '三'
                    },
                    {
                        time: '4',
                        week: '四'
                    },
                    {
                        time: '5',
                        week: '五'
                    },
                    {
                        time: '6',
                        week: '六'
                    },
                    {
                        time: '7',
                        week: '日'
                    }
                ],
                list: [
                    // 一个星期的所有课程
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    []
                ],
                num: 0, // 记录周数，下一周加一，上一周减一, 0:本周
                isCard: false, // 卡片是否铺满全屏
                // 获取今天日期
                time: now.toISOString().slice(0, 10),
                mondayDayTimeStamp: 0, // 星期一的时间戳
                sundayDayTimeStamp: 0 // 星期天的时间戳,
            };
        },
        // async created() {
        //     this.thisWeek(); // 一开始进入页面获取本周的课程表
        // },
        async onShow() {
            this.thisWeek(); // 一开始进入页面获取本周的课程表
        },
        methods: {
            tabSelect(e) {
                // 选中了是星期几
                this.week = +e.currentTarget.dataset.id + 1;
                // 当前选择的日期
                this.time = formatDayTime(this.mondayDayTimeStamp + oneDayTimeStamp * (this.week - 1));
                console.log("选中了周几：" + this.week)
                console.log("选中的日期：" + this.time)
            },
            async previousWeek() {
                console.log('上一周');
                // 切换周数后默认选择星期一
                this.week = 1;
                // 周数减一
                this.num = this.num - 1;
                if (this.num === 0) this.num === -1;
                if (this.num >= 0) {
                    this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1) + oneDayTimeStamp *
                        (7 * this.num); // 上星期一的时间戳
                    this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp + oneDayTimeStamp *
                        (7 * this.num); //上星期天的时间戳
                } else {
                    this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1) - oneDayTimeStamp *
                        (7 * Math.abs(this.num)); // 上星期一的时间戳
                    this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp - oneDayTimeStamp *
                        (7 * Math.abs(this.num)); //上星期天的时间戳
                }
                this.dayList();
                this.time = formatDayTime(this.mondayDayTimeStamp);
                // 测试
                console.log(this.time)
                // 格式化时间 formatDayTime()
                // 可以向后端传时间戳或者格式化的日期范围
                //////////api//////////
                // 根据时间戳重新获取课表
                let data = {
                    startTime: this.mondayDayTimeStamp,
                    endTime: this.sundayDayTimeStamp
                }
                $api.getClassTable(data).then((res) => {
                    if (res.statusCode == 200) {
                        console.log(res)
                        this.list = res.data.classtable
                    } else {
                        this.list = [
                            [],
                            [],
                            [],
                            [],
                            [],
                            [],
                            []
                        ]
                        this.$refs.uTips.show({
                            title: res.data.errmsg,
                            type: 'warning',
                            duration: '2300'
                        })
                    }
                })
            },
            async nextWeek() {
                console.log('下一周');
                this.week = 1;
                this.num = this.num + 1;
                if (this.num === 0) this.num === 1;
                if (this.num <= 0) {
                    this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1) - oneDayTimeStamp *
                        (7 * Math.abs(this.num)); // 下星期一的时间戳
                    this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp - oneDayTimeStamp *
                        (7 * Math.abs(this.num)); //下星期天的时间戳
                } else {
                    this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1) + oneDayTimeStamp *
                        (7 * this.num); // 下星期一的时间戳
                    this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp + oneDayTimeStamp *
                        (7 * this.num); //下星期天的时间戳
                }
                this.dayList();
                this.time = formatDayTime(this.mondayDayTimeStamp);
                //////////api//////////
                // 根据时间戳重新获取课表
                let data = {
                    startTime: this.mondayDayTimeStamp,
                    endTime: this.sundayDayTimeStamp
                }
                $api.getClassTable(data).then((res) => {
                    if (res.statusCode == 200) {
                        console.log(res)
                        this.list = res.data.classtable
                    } else {
                        this.list = [
                            [],
                            [],
                            [],
                            [],
                            [],
                            [],
                            []
                        ]
                        this.$refs.uTips.show({
                            title: res.data.errmsg,
                            type: 'warning',
                            duration: '2300'
                        })
                    }
                })
            },
            async thisWeek() {
                console.log('本周');
                this.mondayDayTimeStamp = todayDayTimeStamp - oneDayTimeStamp * (getDay - 1); // 星期一的时间戳
                this.sundayDayTimeStamp = (7 - getDay) * oneDayTimeStamp + todayDayTimeStamp; //星期天的时间戳
                this.dayList();
                //////////api//////////
                // 根据时间戳重新获取课表
                let data = {
                    startTime: this.mondayDayTimeStamp,
                    endTime: this.sundayDayTimeStamp
                }
                $api.getClassTable(data).then((res) => {
                    if (res.statusCode == 200) {
                        console.log(res)
                        this.list = res.data.classtable
                    } else {
                        this.list = [
                            [],
                            [],
                            [],
                            [],
                            [],
                            [],
                            []
                        ]
                        this.$refs.uTips.show({
                            title: res.data.errmsg,
                            type: 'warning',
                            duration: '2300'
                        })
                    }
                })
            },
            dayList() {
                // 获取本周日期
                for (let i = 0; i < 7; i++) {
                    if (this.num === 0) {
                        i + 1 === getDay ? (this.timeList[i].time = '今') : (this.timeList[i].time = +formatDayTime(this
                            .mondayDayTimeStamp + i * oneDayTimeStamp).substring(8));
                    } else {
                        this.timeList[i].time = +formatDayTime(this.mondayDayTimeStamp + i * oneDayTimeStamp).substring(
                            8);
                    }
                }
            }
        },
        onUnload() {}
    };
</script>

<style lang="scss" scoped>
    @import './colorUi/main.css';
    @import './colorUi/icon.css'; // 图标样式

    .time-table {
        .content {
            background-color: #ffffff;
        }

        .title {
            line-height: 76rpx !important;
        }

        .time {
            width: 50rpx;
            height: 50rpx;
            line-height: 50rpx;
            margin: 0 auto;
        }
    }

    .width-100-bfb {
        width: 100%;
    }

    .text-primary {
        color: #409eff;
    }

    .margin-bottom-sm {
        margin-bottom: 20rpx !important;
    }

    .padding-bottom-xs {
        padding-bottom: 10rpx !important;
    }

    .margin-bottom-xs {
        margin-bottom: 5px !important;
    }

    .cu-shadow {
        box-shadow: rgba(43, 111, 179, 0.15) 0px 0px 8px 0px;
    }

    .height-50 {
        height: 100rpx !important;
    }

    .padding-right-unset {
        padding-right: unset !important;
    }

    .radio-circle {
        border-radius: 100%;
    }

    .page-bg-primary {
        background: #409eff !important;
        color: #ffffff;
    }

    .justify-between {
        justify-content: space-between !important;
    }
</style>
