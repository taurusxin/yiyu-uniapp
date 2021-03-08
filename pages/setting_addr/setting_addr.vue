<template>
	<view class="content">
		<view class="item" v-for="(res, index) in siteList" :key="res.id">
			<view class="top">
				<view class="name">{{ res.name }}</view>
				<view class="phone">{{ res.phone }}</view>
				<view class="tag">
					<!-- 数组的第一个作为默认地址 -->
					<text v-if="index == 0" class="red">默认</text>
				</view>
			</view>
			<view class="bottom" @tap="toEidtSite(index)">
				{{res.site}}
				<u-icon name="edit-pen" :size="40" color="#999999"></u-icon>
			</view>
		</view>
		<view class="addSite" @tap="toAddSite" v-if="siteList.length<3">
			<view class="add">
				<u-icon name="plus" color="#ffffff" class="icon" :size="30"></u-icon>新建收货地址
			</view>
		</view>
		<view class="cantAdd" v-else>
			<view class="add">
				最多添加三个地址
			</view>
		</view>
	</view>
</template>

<script>
	import $api from "../../api/api.js"
	export default {
		data() {
			return {
				siteList: []
			};
		},
		onLoad() {
			// this.getData();
		},
        onShow() {
            this.getData();
        },
		methods: {
			getData() {
				// 从后端拿取地址数据
				// api写这里

				$api.getPersonAddr().then(res => {
					if(res.statusCode == 200){
						this.siteList = res.data.siteList
					}
				}).catch(e => {})
			},
			// 地址编号为 0，1，2
			toAddSite() {
				uni.navigateTo({
					url: '/pages/setting_addsite/setting_addsite?add=' + this.siteList.length
				});
			},
			toEidtSite(index) {
				uni.navigateTo({
					url: '/pages/setting_addsite/setting_addsite?add=' + index
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.content {
		padding: 20rpx;
	}

	.item {
		padding: 40rpx 20rpx;

		.top {
			display: flex;
			font-weight: bold;
			font-size: 34rpx;

			.phone {
				margin-left: 60rpx;
			}

			.tag {
				display: flex;
				font-weight: normal;
				align-items: center;

				text {
					display: block;
					width: 60rpx;
					height: 34rpx;
					line-height: 34rpx;
					color: #ffffff;
					font-size: 20rpx;
					border-radius: 6rpx;
					text-align: center;
					margin-left: 30rpx;
					background-color: rgb(49, 145, 253);
				}

				.red {
					background-color: red
				}
			}
		}

		.bottom {
			display: flex;
			margin-top: 20rpx;
			font-size: 28rpx;
			justify-content: space-between;
			color: #999999;
		}
	}

	.addSite {
		display: flex;
		justify-content: space-around;
		width: 300rpx;
		line-height: 100rpx;
		position: absolute;
		bottom: 100rpx;
		left: 225rpx;
		background-color: #5797ff;
		border-radius: 220rpx;
		font-size: 30rpx;

		.add {
			display: flex;
			align-items: center;
			color: #ffffff;

			.icon {
				margin-right: 10rpx;
			}
		}
	}

	.cantAdd {
		display: flex;
		justify-content: space-around;
		width: 300rpx;
		line-height: 100rpx;
		position: absolute;
		bottom: 100rpx;
		left: 225rpx;
		background-color: #8ebbff;
		border-radius: 220rpx;
		font-size: 30rpx;

		.add {
			display: flex;
			align-items: center;
			color: #ffffff;

			.icon {
				margin-right: 10rpx;
			}
		}
	}
</style>
