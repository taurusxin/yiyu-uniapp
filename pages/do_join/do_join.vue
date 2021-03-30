<template>
    <view>
        <web-view :webview-styles="webviewStyles" :src="src"></web-view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                src: "https://yiyv.blog.client.everdo.cn/about",
            };
        }
    }
</script>

<style lang="scss">

</style>
