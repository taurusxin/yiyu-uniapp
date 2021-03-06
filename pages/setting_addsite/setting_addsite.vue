<template>
	<view class="wrap">
		<view class="top">
			<view class="item">
				<view class="left">收货人</view>
				<input type="text" v-model="form.name" placeholder-class="line" placeholder="请填写收货人姓名" />
			</view>
			<view class="item">
				<view class="left">手机号码</view>
				<input type="text" v-model="form.phone" placeholder-class="line" placeholder="请填写收货人手机号" />
			</view>
			<view class="item" @tap="showRegionPicker">
				<view class="left">所在地区</view>
				<input disabled v-model="form.area" type="text" placeholder-class="line" placeholder="省市区县、乡镇等" />
			</view>
			<view class="item address">
				<view class="left">详细地址</view>
				<textarea v-model="form.addr" type="text" placeholder-class="line" placeholder="街道、楼牌等" />
			</view>
			<!-- <view class="site-clipboard">
				<textarea placeholder-class="line" value="" placeholder="粘贴文本,可自动识别姓名和地址等" />
				<view class="clipboard">
					地址粘贴板
					<u-icon name="arrow-down" class="icon" :size="20"></u-icon>
				</view>
			</view> -->
		</view>
		<view class="bgroup">
			<view style="width: 300rpx;">
				<u-button type="info" plain>返回</u-button>
			</view>
			<view style="width: 300rpx;">
				<u-button type="primary" plain @click="save">保存</u-button>
			</view>



		</view>
		<u-picker mode="region" ref="uPicker" v-model="show" @confirm="pickeraddr" :default-region="form.area" />

	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				form: {
					num: null,
					name: '',
					phone: '',
					// area: ['浙江省', '宁波市', '鄞州区'],
					area: [],
					addr: ''
				}
			};
		},
		methods: {
			save() {
				console.log(this.form)
			},
			pickeraddr(item) {
				// pircker 的回调参数
				// console.log(item)
				this.form.area.push(item.province.label)
				this.form.area.push(item.city.label)
				this.form.area.push(item.area.label)
			},
			showRegionPicker() {
				this.show = true;
			}
		},
		onLoad(e) {
			console.log("接收到要更改第几个地址：" + e.add)
			this.form.num = e.add
		}
	};
</script>

<style lang="scss" scoped>
	/deep/ .line {
		color: $u-light-color;
		font-size: 28rpx;
	}

	.bgroup {
		display: flex;
		justify-content: space-around;
		width: 700rpx;
		line-height: 80rpx;
		position: absolute;
		bottom: 100rpx;
		left: 25rpx;
		font-size: 30rpx;
	}

	.wrap {
		padding: 20rpx;

		.top {
			background-color: #ffffff;
			// border-top: solid 2rpx $u-border-color;
			padding: 22rpx;

			.item {
				display: flex;
				font-size: 32rpx;
				line-height: 100rpx;
				align-items: center;
				border-bottom: solid 2rpx $u-border-color;

				.left {
					width: 180rpx;
				}

				input {
					text-align: left;
				}
			}

			.address {
				padding: 20rpx 0;

				textarea {
					// width: 100%;
					height: 150rpx;
					background-color: #f7f7f7;
					line-height: 60rpx;
					margin: 40rpx auto;
					padding: 20rpx;
				}
			}

			.site-clipboard {
				padding-right: 40rpx;

				textarea {
					// width: 100%;
					height: 150rpx;
					background-color: #f7f7f7;
					line-height: 60rpx;
					margin: 40rpx auto;
					padding: 20rpx;
				}

				.clipboard {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 26rpx;
					color: $u-tips-color;
					height: 80rpx;

					.icon {
						margin-top: 6rpx;
						margin-left: 10rpx;
					}
				}
			}
		}

		.bottom {
			margin-top: 20rpx;
			padding: 40rpx;
			padding-right: 0;
			background-color: #ffffff;
			font-size: 28rpx;

			.tag {
				display: flex;

				.left {
					width: 160rpx;
				}

				.right {
					display: flex;
					flex-wrap: wrap;

					.tags {
						width: 140rpx;
						padding: 16rpx 8rpx;
						border: solid 2rpx $u-border-color;
						text-align: center;
						border-radius: 50rpx;
						margin: 0 10rpx 20rpx;
						display: flex;
						font-size: 28rpx;
						align-items: center;
						justify-content: center;
						color: $u-content-color;
						line-height: 1;
					}

					.plus {
						//padding: 10rpx 0;
					}
				}
			}

			.default {
				margin-top: 50rpx;
				display: flex;
				justify-content: space-between;
				border-bottom: solid 2rpx $u-border-color;
				line-height: 64rpx;

				.tips {
					font-size: 24rpx;
				}

				.right {}
			}
		}
	}
</style>
