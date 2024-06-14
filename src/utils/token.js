//取token
export function getToken(){
    return sessionStorage.getItem('token')
 }
 //放token
 export function setToken(token){
     sessionStorage.setItem('token',token)
 }