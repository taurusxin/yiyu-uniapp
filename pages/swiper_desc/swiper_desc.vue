<template>
    <view>
        <web-view :webview-styles="webviewStyles" :src="src"></web-view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                src: "",
            };
        },
        onLoad(e) {
            let id = e.id
            let src = e.src
            console.log(id, src)
            this.src = src
        }
    }
</script>

<style lang="scss">

</style>
