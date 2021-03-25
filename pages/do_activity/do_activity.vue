<template>
    <view class="info_content">
        <u-card v-for="card in cardlist" :title="card.title" :sub-title="card.subTitle">
            <view class="" slot="body">
                <view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
                    <view class="u-body-item-title u-line-2">{{card.desc}}</view>
                    <image :src="card.img" mode="aspectFill"></image>
                </view>
            </view>
            <view class="card_foot" slot="foot">
                <u-icon name="man-add" size="34" color="" :label="card.people + ' 报名'"></u-icon>
                <view>
                    <u-tag text="已报名" type="success" />
                    <u-tag text="未报名" type="info" />
                </view>
            </view>
        </u-card>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                cardlist: [{
                        title: '素胚勾勒出青花，笔锋浓转淡',
                        subTitle: '2020-05-15',
                        desc: '瓶身描绘的牡丹一如你初妆，冉冉檀香透过窗心事我了然，宣纸上走笔至此搁一半',
                        img: 'https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg',
                        people: 30
                    },
                    {
                        title: '素胚勾勒出青花，笔锋浓转淡',
                        subTitle: '2020-05-15',
                        desc: '瓶身描绘的牡丹一如你初妆，冉冉檀香透过窗心事我了然，宣纸上走笔至此搁一半',
                        img: 'https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg',
                        people: 20
                    },
                ]
            };
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
