// 全局请求封装
// 相当于一个拦截器

export default (uri, method, data) => {
    uni.showLoading({
        title: "加载中"
    });
    
    // 一定要放在 export default 内
    let token = uni.getStorageSync('token');
    
    let header = {
        'content-type': 'application/x-www-form-urlencoded',
        token: token
    };
    

    return new Promise((resolve, reject) => {

        uni.request({
            url: "https://yiyv.miniapp.client.everdo.cn/" + uri,
            method: method,
            header: header,
            data: data,
            success(res) {
                console.log("请求成功")
                if(res.statusCode == 401){
                    console.log("服务端 token 过期")
                    uni.navigateTo({
                        url: "../login/login",
                        success: res => {},
                        fail: () => {},
                        complete: () => {}
                    });
                }
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
