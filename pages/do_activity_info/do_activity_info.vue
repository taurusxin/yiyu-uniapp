<template>
    <view class="content">
        <view class="image">
            <u-image width="100%" height="400rpx" :src="img" mode="aspectFill"></u-image>
        </view>
        <view class="mask" :style="'opacity:' + mask_opacity"></view>
        <view class="title">
            <text>
                {{name}}
            </text>
        </view>
        <view class="detail">
            <view class="time">
                <u-icon name="clock-fill" style="margin-right: 20rpx;"></u-icon> {{time}}
            </view>
            <u-divider half-width="100%" margin-top="25" :use-slot="false"></u-divider>
            <view class="desc">{{desc}}</view>
            <view class="step">
                <timeline :timeline="timeline"></timeline>
            </view>

<!--            <view class="card1" style="height: 2000rpx; width: 100%; background-color: #0081FF;margin-top: 50rpx;">
            </view>
            <view class="card1" style="height: 2000rpx; width: 100%; background-color: #95ff53;margin-top: 50rpx;">
            </view> -->
        </view>

    </view>
</template>

<script>
    export default {
        data() {
            return {
                mask_opacity: 0,
                img: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3361641725,2908210208&fm=26&gp=0.jpg",
                time: "2020 年 3 月 25 日",
                name: "第三届吃狗粮大赛",
                desc: "小王总说是加夜班，其实就是和朋友去喝酒喝到天亮，最后还是我向小王支招，这新媳妇就该弄个下马威，不能纵容，就该揍，揍到服了！小王一听有理，回去就找他媳妇理论，被他媳妇狠狠揍了一顿，过了几天，小王对我说：哥，你这方法真牛！媳妇把我治服了，媳妇还说以后不能和你这种人来往，拜拜。",
                timeline: [{
                        "desc": "见一见大名鼎鼎的杜嘉诚老师",
                        "time": "与杜嘉诚老师见面"
                    },
                    {
                        "desc": "学会软件设计",
                        "time": "学会常用的UI设计软件"
                    },
                    {
                        "desc": "咕咕咕",
                        "time": "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈"
                    }
                ],
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

        .step {
            width: 100%;
            padding: 0 30rpx 0 30rpx;
            margin: 0rpx 0rpx 40rpx 0rpx;
        }
    }
</style>
