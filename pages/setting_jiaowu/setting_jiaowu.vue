<template>
    <view class="content">
        <!-- 点击提示 -->
        <u-modal v-model="toastwindow.show" :content="toastwindow.content" :async-close="true" @confirm="toastConfirm">
        </u-modal>
        <!-- 点击提示结束 -->
        <u-form :model="form" ref="uForm">
            <u-form-item label="选择学校 / 简称" prop="school" label-width="250">
                <u-input v-model="school" type="select" @click="show = true" />
                <u-action-sheet :list="schoolSheetList" v-model="show" @click="schoolSheetCallback"></u-action-sheet>
            </u-form-item>
            <u-form-item label="输入学号" prop="snumber" label-width="150">
                <u-input v-model="form.snumber" />
            </u-form-item>
            <u-form-item label="教务网密码" prop="spass" label-width="150">
                <u-input v-model="form.spass" type="password" />
            </u-form-item>
        </u-form>
        <view style="margin-top: 90rpx;">
            <u-button v-if="binded" @click="submit" type="primary" plain>重新绑定</u-button>
            <u-button v-else @click="submit" type="primary" plain>提交绑定</u-button>
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
                school: "",
                form: {
                    school: '',
                    snumber: '',
                    spass: '',
                },
                rules: {
                    school: [{
                        required: true,
                        message: '请选择学校',
                        // 可以单个或者同时写两个触发验证方式 
                        trigger: ['change', 'blur'],
                    }],
                    snumber: [{
                        required: true,
                        type: 'number',
                        message: '请正确输入学号',
                        // 可以单个或者同时写两个触发验证方式 
                        trigger: ['change', 'blur'],
                    }],
                    spass: [{
                        min: 5,
                        required: true,
                        message: '请输入5位以上密码',
                        trigger: ['change', 'blur'],
                    }]
                },
                show: false,
                schoolSheetList: [{
                        text: '华南农业大学珠江学院'
                    },
                    {
                        text: '云南师范大学商学院'
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
                        $api.setJwxtSetting(this.form).then(res => {
                            if (res.statusCode == 200) {
                                console.log("成功提交数据到服务端")
                                this.showWindow("恭喜！绑定成功了")
                                this.toastwindow.back = true
                            } else {
                                this.toastwindow.back = false
                                this.showWindow(res.data.errmsg)
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
            schoolSheetCallback(index) {
                // this.form.school = this.schoolSheetList[index].text;
                if (index == 0) {
                    this.school = "华南农业大学珠江学院"
                    this.form.school = "scauzj"
                } else if (index == 1) {
                    this.school = "云南师范大学商学院"
                    this.form.school = "ynnubs"
                } else {
                    this.school = "其他"
                    this.form.school = "others"
                }
                console.log("已选择的学校为：" + this.form.school)
            }
        },
        // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
        onReady() {
            this.$refs.uForm.setRules(this.rules);
        },
        onLoad() {
            // 页面启动的时候先向服务端拉去已有数据
            $api.getJwxtSetting().then(res => {
                console.log(res)
                if (res.statusCode == 200) {
                    this.form = res.data.form
                    // 说明用户之前绑定过教务系统
                    if (this.form.school == "scauzj") {
                        this.school = "华南农业大学珠江学院"
                    } else if (this.form.school == "ynnubs") {
                        this.school = "云南师范大学商学院"
                    } else {
                        this.school = "其他"
                    }
                    this.binded = true
                } else {
                    console.log("状态码不为200，用户之前还没绑定")
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
