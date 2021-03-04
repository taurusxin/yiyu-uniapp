// 全局请求封装
// 相当于一个拦截器

export default (uri, method, data) => {
    uni.showLoading({
        title: "加载中"
    });
    
    // 一定要放在 export default 内
    let token = uni.getStorageSync('token');
    
    let header = {
        token: token
    };
    

    return new Promise((resolve, reject) => {

        uni.request({
            url: "https://yiyv.miniapp.client.everdo.cn/api/" + uri,
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
