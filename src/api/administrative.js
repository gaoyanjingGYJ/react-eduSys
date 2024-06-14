import request from '@/utils/request'
export function getAdministrative(){
    return request({
        url:'/user/administrativeList',
        method:'get'
    })
}
export function setRole(data){
    return request({
        url:'/user/setRole',
        method:'post',
        data
        // method:'get'
    })
}