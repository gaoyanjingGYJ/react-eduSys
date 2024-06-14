//关于权限的相关操作
import {getToken} from './token'
//判断是否登录了 在登陆时我们会把token存到本地，通过能否从本地存储中能否取出token来判断是否登陆了 
export function isLogin(){
    return getToken()?true:false
}
