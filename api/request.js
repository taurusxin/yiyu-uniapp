// 全局请求封装
// 相当于一个拦截器
let token = uni.getStorageSync('token');

if (token != null) {
    let header = {
        token: token
    };
} else {
    let header = {};
}

export default (uri, method, data) => {
    uni.showLoading({
        title: "加载中"
    });

    return new Promise((resolve, reject) => {
        uni.request({
            url: "https://yiyv.miniapp.client.everdo.cn/api" + uri,
            method: method,
            header: header,
            data: data,
            success(res) {
                console.log("请求成功")
                resolve(res);
            },
            fail(err) {
                console.log("请求失败 " + err.errMsg)
                reject(err);
            },
            complete() {
                uni.hideLoading();
            }
        });

    });
};
