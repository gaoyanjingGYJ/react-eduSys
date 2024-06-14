//关于登录功能的reducer，把角色和昵称存到redux中，在各个页面共享
const initState={role:'',nickname:''}
export function loginReducer(prevState=initState,action){
    const {type,payload}=action
    if(type==='add'){
        return payload
    }else{
        return prevState
    }
}

//关于把筛选后的路由表存到redux中的reducer，在登录成功之后根据角色的不同显示不同的菜单，都写在这是因为这是同一个模块
const menu=[]
export function menuReducer(prevState=menu,action){
    const {type,payload}=action
    if(type==='generate'){
        return payload
    }else{
        return prevState
    }
}