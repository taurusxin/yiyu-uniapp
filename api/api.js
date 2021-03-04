// 异步请求封装
import request from "./request.js"

export default {
    // 根据时间戳范围获取课表
    // range 时间戳对象（包含开始和结束时间）
    getClassTable(time) {
        let data = {
            "range": time
        }
        return request("api/classtable", "GET", data)
    }
}
