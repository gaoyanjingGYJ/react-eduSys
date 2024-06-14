//用于封装axios、请求拦截器和响应拦截器
import axios from "axios";
import { getToken} from "./token";
import {message} from 'antd'
const service=axios.create({
    // baseURL:"http://47.98.219.152:3000",
    baseURL:"http://localhost:8080"
})

//请求拦截器 每次请求前都要在请求头前加token
service.interceptors.request.use(config=>{
    if(getToken()){
        // config.headers['Authorization']=`Bearer ${getToken()}`
        config.headers.token=getToken()
    }
    return config
},()=>{
    message.error('请求错误')
    return Promise.reject('请求错误')
})

//响应拦截器
service.interceptors.response.use(response=>{
    const data=response.data
    if(data.code===-1){
        message.error(data.msg||"操作错误")
        return Promise.reject(data.msg||'操作错误')
    }
    return data  
},()=>{
    message.error("操作错误")
    return Promise.reject("没跑通")
})
export default service