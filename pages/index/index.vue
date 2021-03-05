<template>
    <view class="content">
        <!-- 引入登录按钮组件 -->
        <button type="default" @click="goLogin">登录页面测试</button>

    </view>
</template>

<script>
    import $Storage from "../../common/storage.js"
    export default {
        data() {
            return {}
        },
        onLoad() {
            if ($Storage.getToken() == null || $Storage.getToken().length == 0) {
                this.goLogin()
            }
        },
        methods: {
            goLogin() {
                uni.navigateTo({
                    url: "../login/login",
                    success: res => {},
                    fail: () => {},
                    complete: () => {}
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
    }
</style>
