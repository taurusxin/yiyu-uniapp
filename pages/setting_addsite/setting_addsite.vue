<template>
	<view class="wrap">
		<view class="top">
			<u-form :model="form" ref="uForm">
				<u-form-item label="收货人" prop="name" label-width="140">
					<u-input type="text" v-model="form.name" placeholder-class="line" placeholder="请填写收货人姓名" />
				</u-form-item>
				<u-form-item label="手机号码" prop="phone" label-width="140">
					<u-input type="number" v-model="form.phone" placeholder-class="line" placeholder="请填写收货人手机号" />
				</u-form-item>
				<u-form-item label="收货校区" prop="area" label-width="140" @tap="showRegionPicker">
					<u-input type="text" v-model="form.area" placeholder-class="line" placeholder="选择收货学校" disabled
						@click="showRegionPicker" />
				</u-form-item>
				<u-form-item label="详细地址" prop="addr" label-width="140">
					<view style="width: 520rpx;">
						<u-input v-model="form.addr" type="textarea" :border="true" height="200" :auto-height="true"
							placeholder="宿舍号 / 教学楼等" />
					</view>
				</u-form-item>
			</u-form>
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
	import $api from "../../api/api.js"
	export default {
		data() {
			return {
				show: false,
				form: {
					num: null,
					name: '',
					phone: '',
					// area: ['浙江省', '宁波市', '鄞州区'],
					area: '',
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
				rules: {
					name: [{
						required: true,
						message: '请输入正确的姓名',
						min: 2,
						max: 5,
						trigger: ['blur', 'change']
					}],
					phone: [{
						required: true,
						type: 'number',
						min: 11,
						max: 11,
						message: '请输入正确的手机号',
						trigger: ['change', 'blur']
					}],
					area: [{
						required: true,
						message: '请选择校区',
						trigger: ['change', 'blur']
					}],
					addr: [{
						min: 5,
						required: true,
						message: '请输入详细地址(或再写详细点)',
						trigger: ['change', 'blur']
					}]
				},

			};
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			save() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');
						// 保存时提交数据给后端
						console.log("保存地址到后端，表单如下")
						console.log(this.form)
						$api.setPersonAddrByIndex(this.form).then(res => {
							console.log(res)
						}).catch(e => {})
					} else {
						console.log('验证失败');
					}
				});
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
			// 从后端获取数据
			$api.getPersonAddrByIndex(e.add).then(res => {
				console.log(res)
				if (res.statusCode == 200) {
					this.form = res.form
				}
			}).catch(e => {})
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
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
				padding: 20rpx 0rpx;

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
