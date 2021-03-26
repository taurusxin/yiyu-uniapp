<template>
    <view>
        <web-view :webview-styles="webviewStyles" :src="src"></web-view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                src: "https://www.everdo.cn/",
            };
        }
    }
</script>

<style lang="scss">

</style>
