<template>
    <view class="content">
        <!-- 点击提示 -->
        <u-modal v-model="toastwindow.show" :content="toastwindow.content" :async-close="true" @confirm="toastConfirm">
        </u-modal>
        <!-- 点击提示结束 -->
        <u-form :model="form" ref="uForm">
            <u-form-item label="文件名" label-width="150">
                <u-input v-model="form.fname" disabled placeholder="上传后显示文件名" />
            </u-form-item>

            <u-form-item label="打印份数" label-width="150">
                <u-slider v-model="form.number" min="1" max="100"></u-slider>
            </u-form-item>
            <u-form-item>
                <view style="text-align: end;">
                    <text>共 {{form.number}} 份</text>
                </view>
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
                <text>当前打印单价 {{price}} 元，共 {{form.number*price}} 元</text>
            </u-form-item>

        </u-form>
        <view style="margin-top: 90rpx;">
            <u-button @click="submit" type="primary" plain>提交打印</u-button>
        </view>

    </view>
</template>

<script>
    import $api from "../../api/api.js"
    export default {
        data() {
            return {
                price: 1.5,
                toastwindow: {
                    back: false,
                    show: false,
                    content: ""
                },
                form: {
                    fid: '',
                    fname: '',
                    address: '',
                    addrindex: 0,
                    number: '',
                    note: '',
                },
                rules: {
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
            toastConfirm(back) {
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
            showWindow(content) {
                this.toastwindow.show = true,
                    this.toastwindow.content = content
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
                        $api.setPrintOrder(this.form).then(res => {
                            if (res.statusCode == 200) {
                                console.log("成功提交数据到服务端")
                                this.showWindow("打印提交成功！")
                                this.toastwindow.back = true
                            } else {
                                this.toastwindow.back = false
                                this.showWindow(res.data.errmsg)
                            }
                        }).catch((e) => {
                            console.log("提交打印失败")
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
            // TODO 获取地址列表
            // 页面启动的时候先向服务端拉去已有数据
            $api.getPersonAddr().then(res => {
                console.log(res)
                if (res.statusCode == 200) {
                    for (let i = 0; i < res.data.siteList.length; i++) {
                        this.addrSheetList[i] = {
                            text: res.data.siteList[i].name + " - " + res.data.siteList[i].site
                        }
                    }
                } else {
                    console.log("状态码不为200，地址获取失败")

                    // TODO remove when api finished
                    this.addrSheetList = [{
                            text: '广东省深圳市宝安区 自由路66号'
                        },
                        {
                            text: '广东省深圳市宝安区 翻身路xx号'
                        },
                        {
                            text: '广东省深圳市宝安区 平安路13号'
                        }
                    ]
                    // TODO remove when api finished

                }
            }).catch((err) => {
                console.log(err)
            })

            $api.getMoney('ddy').then(res => {
                if (res.statusCode == 200) {
                    this.price = res.data.money
                } else {
                    console.log("打印价格获取失败" + res.data.errmsg)
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        onLoad(e) {
            // 获取上级页面传来的 fid fname
            this.form.fid = e.fid
            this.form.fname = e.fname
            console.log(this.form)
        }
    };
</script>

<style lang="scss" scoped>
    .content {
        padding: 30rpx;
    }
</style>
