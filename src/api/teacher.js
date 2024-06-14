/*
    要求参数：
        name:""  姓名  非必填
        subject:""  学科  非必填
        tel:''  电话  非必填
        pagr:1  页码  必填
        pageSize：10   条数   必填
*/
import request from '@/utils/request'
export  function getTeacherList(data){
    return request({
        url:'/user/teacherList',
        method:'post',
        data
    })
}
export function addTeacher(data){
    return request({
        url:'/user/addTeacher',
        method:'post',
        data
    })
}
export function editTeacher(data){
    return request({
        url:'/user/editTeacher',
        method:"post",
        data
    })
}
export function deleteTeacher(data){
    return request({
        url:'/user/deleteTeacher',
        method:"post",
        data
    })
}
export function batchDeleteTeacher(data){
    return request({
        url:'/user/batchDeleteTeacher',
        method:"post",
        data
    })
}