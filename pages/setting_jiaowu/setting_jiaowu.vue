<template>
    <view class="content">

        <u-form :model="form" ref="uForm">
            <u-form-item label="选择学校" prop="school" label-width="150">
                <u-input v-model="form.school" type="select" @click="show = true" />
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
            <u-button @click="submit" type="primary" plain>提交</u-button>
        </view>

    </view>
</template>

<script>
    export default {
        data() {
            return {
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
                        message: '请输入学号',
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
                        text: '北京大学'
                    },
                    {
                        text: '清华大学'
                    }
                ],
            };
        },
        methods: {
            submit() {
                this.$refs.uForm.validate(valid => {
                    if (valid) {
                        console.log('验证通过');
                        console.log(this.form)
                        
                        // 这里写异步请求
                    } else {
                        console.log('验证失败');
                    }
                });
            },
            schoolSheetCallback(index) {
                // this.form.school = this.schoolSheetList[index].text;
                if (index == 0) {
                    this.form.school = "scauzj"
                } else {
                    this.form.school = "others"
                }
                console.log("已选择的学校为：" + this.form.school)
            }
        },
        // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
        onReady() {
            this.$refs.uForm.setRules(this.rules);
        }
    };
</script>

<style lang="scss" scoped>
    .content {
        padding: 20rpx;
    }
</style>
