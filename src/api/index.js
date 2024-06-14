//在这里把所有的请求都单独封装一下，之后在页面中使用的时候就不用再引入request发请求了，直接调用该函数
import request from '../utils/request'
//登录时发送的请求
export function login(data){
    return request({
        url:'/user/login',
        method:'post',
        data
    })
}
//根据token值获取用户权限发送的请求
export function getInfo(){
    return request({
        url:'/user/getInfo',
        method:'get'
    })
}