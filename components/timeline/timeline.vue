<template>
	<u-time-line>
		<u-time-line-item nodeTop="2">
			<!-- 此处自定义了左边内容，用一个图标替代 -->
			<template v-slot:node>
				<view class="u-node" style="background: #3a43be;">
					<!-- 此处为uView的icon组件 -->
					<u-icon name="calendar-fill" color="#fff" :size="24"></u-icon>
				</view>
			</template>
			<template v-slot:content>
				<view>
					<view class="u-order-title">活动日程</view>
					<!-- <view class="u-order-desc">[自提柜]您的快件已放在楼下侧门，直走前方53.6米，左拐约10步，再右拐直走，见一红灯笼停下，叩门三下，喊“芝麻开门”即可。</view> -->
					<!-- <view class="u-order-time">2019-05-08 12:12</view> -->
				</view>
			</template>
		</u-time-line-item>
		<u-time-line-item v-for="item of timeline">
			<!-- 此处没有自定义左边的内容，会默认显示一个点 -->
			<template v-slot:content>
				<view>
					<view class="u-order-desc">{{item.desc}}</view>
					<view class="u-order-time">{{item.time}}</view>
				</view>
			</template>
		</u-time-line-item>
	</u-time-line>
</template>

<script>
	export default{
		props:["timeline"],
		created() {
			console.log(this.timeline)
		}
	}
</script>

<style lang="scss" scoped>
	.u-node {
		width: 44rpx;
		height: 44rpx;
		border-radius: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #d0d0d0;
	}
	
	.u-order-title {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx;
	}
	
	.u-order-desc {
		color: rgb(150, 150, 150);
		font-size: 28rpx;
		margin-bottom: 6rpx;
	}
	
	.u-order-time {
		color: rgb(200, 200, 200);
		font-size: 26rpx;
	}
</style>