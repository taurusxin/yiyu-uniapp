<template>
    <view class="content">
        <u-modal v-model="personinfowindow.show" :content="personinfowindow.content" @confirm="confirmFillInfo" @cancel="cancelFillInfo"
            show-cancel-button>
        </u-modal>
        <!-- 点击提示 -->
        <u-modal v-model="toastwindow.show" :content="toastwindow.content" :async-close="true" @confirm="confirmDoDeliver">
        </u-modal>
        <!-- 点击提示结束 -->
        <u-form :model="form" ref="uForm">
            <u-form-item label="运单号" prop="danhao" label-width="150">
                <u-input v-model="form.danhao" placeholder="请输入快递单号" />
            </u-form-item>
            <u-form-item label="取件码" prop="qvjianma" label-width="150">
                <u-input v-model="form.qvjianma" placeholder="请输入取件码" />
            </u-form-item>

            <u-form-item label="驿站信息" prop="yizhan" label-width="150">
                <u-input v-model="form.yizhan" placeholder="填写快递代收点详细信息" />
            </u-form-item>

            <u-form-item label="选择地址" prop="address" label-width="150" :border-bottom="false">
                <u-input v-model="form.address" type="select" @click="show = true" placeholder="若无地址,点击下方添加" />
                <u-action-sheet :list="addrSheetList" v-model="show" @click="addrSheetCallback"></u-action-sheet>
            </u-form-item>

            <u-form-item>
                <view style="display: flex;justify-content: start;flex-direction: row-reverse;">
                    <view style="width: 200rpx;">
                        <u-button type="info" @click="setAddr">设置地址</u-button>
                    </view>
                </view>
            </u-form-item>

            <u-form-item label="备注(可选)" label-width="150">
                <u-input v-model="form.note" placeholder="填写备注信息" />
            </u-form-item>

            <u-form-item label="服务价格" label-width="150">
                <text>本次取快递需要 {{price}} 元</text>
            </u-form-item>

        </u-form>
        <view style="margin-top: 90rpx;">
            <u-button @click="submit" type="primary" plain>提交取件信息</u-button>
        </view>

    </view>
</template>

<script>
    import $api from "../../api/api.js"
    export default {
        data() {
            return {
                price: 2,
                personinfowindow: {
                    back: false,
                    show: false,
                    content: ""
                },
                submittoastwindow: {
                    back: false,
                    show: false,
                    content: ""
                },
                form: {
                    danhao: '',
                    qvjianma: '',
                    yizhan: '',
                    address: '',
                    addrindex: 0,
                    note: '',
                },
                rules: {
                    danhao: [{
                        min: 5,
                        required: true,
                        message: '请输入正确的快递单号',
                        // 可以单个或者同时写两个触发验证方式 
                        trigger: ['change', 'blur'],
                    }],
                    yizhan: [{
                        min: 3,
                        required: true,
                        message: '请输入驿站信息',
                        // 可以单个或者同时写两个触发验证方式 
                        trigger: ['change', 'blur'],
                    }],
                    qvjianma: [{
                        min: 2,
                        required: true,
                        message: '请输入正确的取件码',
                        // 可以单个或者同时写两个触发验证方式 
                        trigger: ['change', 'blur'],
                    }],
                    address: [{
                        required: true,
                        message: '请选择地址',
                        // 可以单个或者同时写两个触发验证方式 
                        trigger: ['change', 'blur'],
                    }],
                },
                show: false,
                addrSheetList: []
            };
        },
        methods: {
            cancelFillInfo() {
                uni.switchTab({
                    url: '/pages/index/index',
                    success: res => {},
                    fail: () => {},
                    complete: () => {}
                })
            },
            confirmFillInfo() {
                uni.navigateTo({
                    url: '/pages/setting_person/setting_person',
                    success: res => {},
                    fail: () => {},
                    complete: () => {}
                });
            },
            confirmDoDeliver(back) {
                this.toastwindow.show = false
                if (this.toastwindow.back) {
                    uni.switchTab({
                        url: "/pages/index/index",
                        success: res => {},
                        fail: () => {},
                        complete: () => {}
                    })
                }
            },
            showPersonInfoWindow(content) {
                this.personinfowindow.show = true,
                    this.personinfowindow.content = content
            },
            showSubmitWindow(content) {
                this.submittoastwindow.show = true,
                    this.submittoastwindow.content = content
            },
            setAddr() {
                uni.navigateTo({
                    url: '/pages/setting_addr/setting_addr',
                    success: res => {},
                    fail: () => {},
                    complete: () => {}
                });
            },
            submit() {
                this.$refs.uForm.validate(valid => {
                    if (valid) {
                        console.log('验证通过');
                        console.log(this.form)

                        // 这里写异步请求
                        $api.setDeliverOrder(this.form).then(res => {
                            if (res.statusCode == 200) {
                                console.log("成功提交数据到服务端")
                                this.showSubmitWindow("取件提交成功！")
                                this.toastwindow.back = true
                            } else {
                                this.toastwindow.back = false
                                this.showSubmitWindow(res.data.errmsg)
                            }
                        }).catch((e) => {
                            console.log("取件提交失败")
                            console.log(e)
                        })
                    } else {
                        console.log('验证失败');
                    }
                });
            },
            addrSheetCallback(index) {
                this.form.address = this.addrSheetList[index].text;
                this.form.addrindex = index;
                console.log("已选择第" + index + "个地址：" + this.form.address)
            }
        },
        // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
        onReady() {
            this.$refs.uForm.setRules(this.rules);
        },
        onShow() {
            $api.getPersonSetting().then(res => {
                console.log(res)
                if (res.statusCode == 200) {} else {
                    console.log("用户还没完善个人信息")
                    this.showPersonInfoWindow("您还没有完善个人信息，请先完善")
                }
            }).catch((err) => {
                console.log(err)
            })
            // 页面启动的时候先向服务端拉去已有数据
            $api.getPersonAddr().then(res => {
                console.log(res)
                if (res.statusCode == 200) {
                    for (let i = 0; i < res.data.siteList.length; i++) {
                        this.addrSheetList[i] = {
                            text: res.data.siteList[i].name + " - " + res.data.siteList[i].site
                        }
                    }
                    // console.log(this.addrSheetList)
                } else {
                    console.log("状态码不为200，地址获取失败")
                }
            }).catch((err) => {
                console.log(err)
            })

            $api.getMoney('qkd').then(res => {
                if (res.statusCode == 200) {
                    this.price = res.data.money
                } else {
                    console.log("快递价格获取失败" + res.data.errmsg)
                }
            }).catch((err) => {
                console.log(err)
            })


        },
        onLoad(e) {}
    };
</script>

<style lang="scss" scoped>
    .content {
        padding: 30rpx;
    }
</style>
