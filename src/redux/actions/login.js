//关于登录页把角色和昵称存到redux在中的action
export const  loginAction=(payload)=>({type:'add',payload})

//关于把筛选后的路由表存到redux的action
export const menuAction=(payload)=>({type:"generate",payload})