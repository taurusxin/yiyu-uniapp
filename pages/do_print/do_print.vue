<template>
    <view class="content">
        <u-top-tips ref="uTips"></u-top-tips>
        <view class="plus" @click="choseFile">
            <u-icon name="plus-circle-fill" style="margin-right: 20rpx;">
            </u-icon>
            <view style="font-size: 40rpx;">点击来选择文件</view>
        </view>
        <view style="color: #555555;">
            {{file_name}}
            <u-line-progress v-if="upprogress > 0" active-color="#899099" :percent="upprogress"></u-line-progress>
            <!-- {{file_path}} -->
        </view>
         <view style="height: 300rpx;width: 330rpx;">
            <u-button type="primary" plain @click="upload">上传</u-button>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                file_name: '',
                file_path: '',
                tempFilePaths: '',
                upprogress: 0
            };
        },
        methods: {
            showTopToast(title, type) {
                this.$refs.uTips.show({
                    title: title,
                    type: type,
                    duration: '2300'
                })
            },
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
                    url: 'http://43.128.26.205:6789/upload', //仅为示例，非真实的接口地址
                    filePath: _this.file_path,
                    name: 'file', //随意
                    header: {
                        'Content-Type': 'multipart/form-data',
                        'token': uni.getStorageSync("token"), //如果需要token的话要传
                    },
                    formData: {
                        method: 'POST' //请求方式
                    },
                    success(res) {
                        if (res.statusCode == 200) {
                            // const data = res.data
                            const data = JSON.parse(res.data)
                            // 坑2：与wx.request不同的是，upload返回的是字符串格式，需要字符串对象化
                            console.log("上传成功")
                            console.log(data)
                            _this.showTopToast("上传成功", "success")
                        } else {
                            console.log('上传失败，状态码：' + res.statusCode)
                            _this.showTopToast("上传失败 " + res.data.errmsg, "warning")
                        }
                    },
                    fail(res) {
                        console.log('上传失败')
                        _this.showTopToast("上传失败，网络异常", "warning")
                    }
                })

                uploadTask.onProgressUpdate((res) => {
                    console.log('上传进度', res.progress)
                    _this.upprogress = res.progress
                    console.log('已经上传的数据长度', res.totalBytesSent)
                    console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .content {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        .plus {
            font-size: 400rpx;
            color: #80b3ff;
            height: 500rpx;
            display: flex;
            flex-direction: column;
            justify-content: start;
            align-items: center;
        }
    }
</style>
