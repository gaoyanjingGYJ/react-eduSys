//筛选出相应角色对应的路由，实现菜单过滤
//这里必须要有data形参，因为第一次默认的是asyncRouterMap，第二次递归的时候就不是他了而是他的children项
export function menuFilter(data,role){
    //先把符合角色的一级路由筛选出来形成一个新数组(如果一级路由不符合角色，二级酷游根本就不用看了)，然后再对新数组的每一项循环判断，如果该项还有children，那么就对该项的children进行递归的筛选，然后赋值给该项的children(又不符合角色的children项就不再是该项的children了)，如果该项没有children，直接就把该项返回即可
    return data.filter(item=>{
        return item.meta.role.indexOf(role)!==-1
    }).map(item=>{
        if(item.children){
            //如果还有children
            item.children=menuFilter(item.children,role)
        }
        return item
       
    })
}