// 异步请求封装
import request from "./request.js"

export default {
    // 根据时间戳范围获取课表
    // range 时间戳对象（包含开始和结束时间）

    // 获取首页轮播图
    getIndexSwiper() {
        return request("api/indexswiper", "GET", )
    },
    getClassTable(time) {
        let data = {
            "range": time
        }
        return request("api/classtable", "GET", data)
    },

    // 课程提醒状态
    getReminder(status) {
        return request("api/reminder", "GET", )
    },
    setReminder(status) {
        let data = {
            "mind": status
        }
        return request("api/reminder", "POST", data)
    },

    // 教务系统绑定状态
    getJwxtSetting() {
        return request("api/setting_jwxt", "GET", )
    },
    setJwxtSetting(data) {
        return request("api/setting_jwxt", "POST", data)
    },

    // 用户个人信息
    getPersonSetting() {
        return request("api/setting_person", "GET", )
    },
    setPersonSetting(data) {
        return request("api/setting_person", "POST", data)
    },

    // 用户地址列表
    getPersonAddr() {
        return request("api/setting_addr", "GET", )
    },
    getPersonAddrByIndex(index) {
        let data = {
            "index": index
        }
        return request("api/setting_addr", "GET", data)
    },
    setPersonAddrByIndex(data) {
        return request("api/setting_addr", "POST", data)
    },

    getOrderDfh() {
        // 获取待发货数据
        return request("api/orders_dfh", "GET", )
    },

    getOrderDsh() {
        // 获取待收货数据
        return request("api/orders_dsh", "GET", )
    },
    setOrderDsh(id) {
        // 确认收获
        let data = {
            "id": id
        }
        return request("api/orders_dsh", "POST", data)
    },

    getOrderAll(page) {
        // 按页面获取全部订单
        let data = {
            "page": page
        }
        return request("api/orders_all", "GET", data)
    },

    setPrintOrder(data) {
        // 提交打印订单
        return request("api/do_print", "POST", data)
    },
    
    setDeliverOrder(data) {
        // 提交取快递订单
        return request("api/do_deliver", "POST", data)
    },
    
    getMoney(type) {
        // 金钱接口（查询余额，显示价格）
        let data = {
            "type": type
        }
        return request("api/do_money", "GET", data)
    },

}
