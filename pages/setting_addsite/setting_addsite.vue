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
			<!-- 			<view class="item" @tap="showRegionPicker">
				<view class="left">所在地区</view>
				<input disabled v-model="form.area" type="text" placeholder-class="line" placeholder="省市区县、乡镇等" />
			</view> -->

			<view class="item" @tap="showRegionPicker">
				<view class="left">所在地区</view>
				<input disabled v-model="form.area" type="text" placeholder-class="line" placeholder="选择收货学校" />
			</view>

			<view class="item address">
				<view class="left">详细地址</view>
				<textarea v-model="form.addr" type="text" placeholder-class="line" placeholder="街道、楼牌等" />
			</view>
		</view>
		<view class="bgroup">
			<view style="width: 300rpx;">
				<u-button type="info" plain @click="back">返回</u-button>
			</view>
			<view style="width: 300rpx;">
				<u-button type="primary" plain @click="save">保存</u-button>
			</view>
		</view>
		<u-select v-model="show" :list="schoolSheetList" @confirm="confirmRegionPicker"></u-select>
		<!-- <u-picker mode="region" ref="uPicker" v-model="show" @confirm="pickeraddr" :default-region="form.area" /> -->

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
				},

				schoolSheetList: [{
						value: '1',
						label: '华南农业大学珠江学院'
					},
					{
						value: '2',
						label: '北京大学'
					},
					{
						value: '3',
						label: '清华大学'
					}
				],

			};
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			save() {
				console.log(this.form)
			},
			// pickeraddr(item) {
			//	// 地区选择器回调 
			// 	// pircker 的回调参数
			// 	// console.log(item)
			// 	this.form.area.push(item.province.label)
			// 	this.form.area.push(item.city.label)
			// 	this.form.area.push(item.area.label)
			// },
			confirmRegionPicker(e) {
				console.log("选择了：" + e[0].label);
				this.form.area = e[0].label
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
