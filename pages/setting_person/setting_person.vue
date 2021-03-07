<template>
    <view class="content">
        <!-- 点击提示 -->
        <u-modal v-model="toastwindow.show" :content="toastwindow.content" :async-close="true" @confirm="toastConfirm">
        </u-modal>
        <!-- 点击提示结束 -->
        <u-form :model="form" ref="uForm">
            <u-form-item label="姓名" prop="name">
                <u-input v-model="form.name" />
            </u-form-item>
            <u-form-item label="性别" prop="sex">
                <u-input v-model="form.sex" type="select" @click="show = true" />
                <u-action-sheet :list="sexSheetList" v-model="show" @click="sexSheetCallback"></u-action-sheet>
            </u-form-item>
            <!-- 后期有条件改成获取手机号 -->
            <u-form-item label="输入手机号" prop="phone" label-width="150">
                <u-input v-model="form.phone" />
            </u-form-item>
        </u-form>
        <view style="margin-top: 90rpx;">
            <u-button v-if="binded" @click="submit" type="primary" plain>修改信息</u-button>
            <u-button v-else @click="submit" type="primary" plain>保存信息</u-button>
        </view>

    </view>
</template>

<script>
    import $api from "../../api/api.js"
    export default {
        data() {
            return {
                binded: false,
                toastwindow: {
                    back: false,
                    show: false,
                    content: ""
                },
                form: {
                    name: '',
                    sex: '',
                    phone: '',
                },
                rules: {
                    name: [{
                        required: true,
                        min: 2,
                        message: '请输入姓名',
                        type: 'string',
                        // 可以单个或者同时写两个触发验证方式 
                        trigger: ['change', 'blur'],
                    }],
                    sex: [{
                        required: true,
                        message: '选择性别',
                        // 可以单个或者同时写两个触发验证方式 
                        trigger: ['change', 'blur'],
                    }],
                    phone: [{
                        min: 11,
                        max: 11,
                        required: true,
                        type: 'number',
                        message: '请正确输入手机号',
                        trigger: ['change', 'blur'],
                    }]
                },
                show: false,
                sexSheetList: [{
                        text: '男'
                    },
                    {
                        text: '女'
                    }
                ],
            };
        },
        methods: {
            toastConfirm(back) {
                this.toastwindow.show = false
                if (this.toastwindow.back) {
                    uni.navigateBack()
                }
            },
            showWindow(content) {
                this.toastwindow.show = true,
                    this.toastwindow.content = content
            },
            submit() {
                this.$refs.uForm.validate(valid => {
                    if (valid) {
                        console.log('验证通过');
                        console.log(this.form)

                        // 这里写异步请求
                        $api.setPersonSetting(this.form).then((res) => {
                            if (res.statusCode == 200) {
                                console.log("成功提交数据到服务端，正在返回")
                                this.showWindow("保存成功")
                                this.toastwindow.back = true
                            } else {
                                console.log("提交数据到服务端失败")
                                this.showWindow("保存失败" + res.data.errmsg)
                                this.toastwindow.back = false
                            }
                        }).catch((e) => {
                            console.log("提交数据到服务端失败")
                            console.log(e)
                        })
                    } else {
                        console.log('验证失败');
                    }
                });
            },
            sexSheetCallback(index) {
                // this.form.school = this.schoolSheetList[index].text;
                if (index == 0) {
                    this.form.sex = "男"
                } else {
                    this.form.sex = "女"
                }
                console.log("已选择的性别为：" + this.form.sex)
            }
        },
        // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
        onReady() {
            this.$refs.uForm.setRules(this.rules);
        },
        onLoad() {
            // 页面启动的时候先向服务端拉去已有数据
            $api.getPersonSetting().then((res) => {
                console.log(res)
                if (res.statusCode == 200) {
                    this.form = res.data.form
                    // 说明用户之前绑定过教务系统
                    this.binded = true
                } else {
                    console.log("状态码不为200，用户之前还没保存")
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    };
</script>

<style lang="scss" scoped>
    .content {
        padding: 30rpx;
    }
</style>
