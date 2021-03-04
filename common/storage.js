const Token = 'token'
const Userinfo = 'userinfo'

module.exports = {
	
	//登录标识
    setToken:(token)=>uni.setStorageSync(Token, token),
    getToken:()=> uni.getStorageSync(Token),
    removeToken:()=> uni.removeStorageSync(Token),
    
    //用户信息
    setUserinfo:(userinfo)=>uni.setStorageSync(Userinfo,userinfo),
	getUserinfo:()=> uni.getStorageSync(Userinfo),
	removeUserinfo:()=> uni.removeStorageSync(Userinfo),
	
    // 同步存储,失败则进行异步存储
    // 方法
    // uni.setStorage({
    //     key: "userinfo",
    //     data: userinfo,
    //     success: function() {
    //         console.log('用户信息本地保存成功');
    //     }
    // })
	setStorageSync:(key,value)=>{
		try {
		    uni.setStorageSync(key, value);
		} catch (e) {
			setStorage(key, value);
		}
	},
	
	// 同步读取缓存
	getStorageSync:(key)=>{
		try {
		    const value = uni.getStorageSync(key);
		    if (value) {
		        return value
		    }
		} catch (e) {
			console.log(e);
			getStorage(key);
		}
	},
	
	// 同步移除某一键值对
	removeStorageSync:(key)=>{
		try {
			uni.removeStorageSync(key);
			console.log("缓存删除成功");
		} catch (e) {
		    removeStorage(key);
		}
	},
	
	clearStorage:()=>uni.clearStorageSync(),
    
}
