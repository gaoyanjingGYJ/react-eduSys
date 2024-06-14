import request from '@/utils/request'
 export function getIntentionList(data){
    return request({
        url:'/user/intentionList',
        method:'post',
        data
    })
}
export function addIntention(data){
    return request({
        url:'/user/addIntention',
        method:'post',
        data
    })
}
export function editIntention(data){
    return request({
        url:'/user/editIntention',
        method:'post',
        data
    })
}
export function batchDeleteIntention(data){
    return request({
        url:'/user/batchDeleteIntention',
        method:"post",
        data
    })
}