<template>
	<view>
		<u-button type="primary" plain @click="choseFile">选择文件</u-button>
		{{file_name}}
		{{file_path}}
		<image :src="this.tempFilePath"></image>
		<u-button type="primary" plain @click="upload">上传</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				file_name: '',
				file_path: '',
				tempFilePaths: ''
			};
		},
		methods: {
			choseFile() {
				let _this = this
				wx.chooseMessageFile({
					count: 1,
					type: 'all',
					success(res) {
						// tempFilePath可以作为img标签的src属性显示图片
						const tempFilePaths = res.tempFiles
						console.log(tempFilePaths)
						_this.tempFilePaths = tempFilePaths
						_this.file_name = tempFilePaths[0].name
						_this.file_path = tempFilePaths[0].path
					}
				})
			},
			upload() {
				let _this = this
				let uploadTask = wx.uploadFile({
					url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
					filePath: _this.file_path,
					name: 'file', //随意
					header: {
						'Content-Type': 'multipart/form-data',
						'token': wx.getStorageSync("token"), //如果需要token的话要传
					},
					formData: {
						method: 'POST' //请求方式
					},
					success(res) {
						// const data = res.data
						const data = JSON.parse(res.data)
						// 坑2：与wx.request不同的是，upload返回的是字符串格式，需要字符串对象化
						if (data.code == 200) {
							console.log("上传成功")
							console.log(data)

						} else {
							console.log('上传失败')
							wx.showToast({
								title: res.message,
								icon: 'none'
							})
						}
					},
					fail(res){
						console.log(res)
					}
				})

				uploadTask.onProgressUpdate((res) => {
					console.log('上传进度', res.progress)
					console.log('已经上传的数据长度', res.totalBytesSent)
					console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
