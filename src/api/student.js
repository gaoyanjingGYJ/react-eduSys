import request from '@/utils/request'
export  function getStudentList(data){
    return request({
        url:'/user/studentList',
        method:'post',
        data
    })
}
export function editStudent(data){
    return request({
        url:'/user/editStudent',
        method:'post',
        data
    })
}