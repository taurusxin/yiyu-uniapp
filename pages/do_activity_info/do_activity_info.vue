<template>
    <view class="content">
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
                <u-button v-if="!passage.joined" style="width: 100%;" shape="circle" type="primary">立刻报名</u-button>
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
                    title: this.name
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
            this.getActivityById(this.id)
        },
        methods: {
            getActivityById(id) {
                $api.getActById(id).then(res => {
                    this.passage = res.data.passage

                    // TODO api完成后移除下面
                    this.passage = {
                        joined: true,
                        code: "123456",
                        img: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3361641725,2908210208&fm=26&gp=0.jpg",
                        time: "2020年3月5日 18:00",
                        name: "第三届吃狗粮大赛",
                        desc: "小王总说是加夜班，其实就是和朋友去喝酒喝到天亮，最后还是我向小王支招，这新媳妇就该弄个下马威，不能纵容，就该揍，揍到服了！小王一听有理，回去就找他媳妇理论，被他媳妇狠狠揍了一顿，过了几天，小王对我说：哥，你这方法真牛！媳妇把我治服了，媳妇还说以后不能和你这种人来往，拜拜。",
                        timeline: [{
                                "desc": "先吃一大碗狗粮",
                                "time": "早上 8:30"
                            },
                            {
                                "desc": "再继续吃点狗粮",
                                "time": "中午 12:30"
                            },
                            {
                                "desc": "还是得吃狗粮",
                                "time": "下午 16:30"
                            }
                        ],
                        pra_img: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2757208942,3180606379&fm=26&gp=0.jpg",
                        rich_text: "空中有一只年轻的蚊子，蜘蛛看见了说：“帅哥儿，到我的家里来歇歇脚吧。” 蚊子说：“你那里有什么好玩的吗?” 蜘蛛说：“有啊，我开了一个网吧，请您来上网!”蚊子听后，一头扎了过去。 呵呵，新年快乐!"
                    }
                    // TODO api完成后移除上面

                }).catch(e => {
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
