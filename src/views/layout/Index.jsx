import React, { Component, lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import { Layout, Menu } from 'antd';
import { getInfo } from '../../api';
import { loginAction, menuAction } from '../../redux/actions/login'
import { asyncRouterMap } from '../../common/routerMap';
import { menuFilter } from '../../utils/menuFilter';
import { Route, NavLink } from 'react-router-dom';
import HeaderItem from '@/components/header/Index'
import * as Icons from '@ant-design/icons'

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
class Index extends Component {
    state = {
        menuTree: [],
        openKeys: [''],
        selectedKey: [''],
       
    }

    //     //this.changeSelectKeys()这个函数要在componentDidUpdate中调用，而不是componentDidMount中，componentDidMount执行一次，就是在第一次render后，后续render执行后会执行componentDidUpdate。


   // this.changeSelectKeys()这个函数要在要在componentDidMount中调用一次，再在componentUpdate中再调用。这是因为componentDidMount只在第一次render之后执行一次，后续的rendr执行后会执行componentDidUpdate；从登录页进入到首页后会先mount，然后有setState，会发生update，点击切换菜单栏只会再执行componentUpdate，不会再执行componentDidMount了。
   //在componentDidUpdate生命周期方法中加入判断当前页面路径是否与上一个页面路径相同是为了避免不必要的状态更新和重新渲染，从而防止死循环的发生。如果没有这个判断，每次组件更新时都会执行changeSelectedKey方法，该方法会根据当前路径更新菜单状态。然而，更新状态又会导致组件重新渲染，这将再次触发componentDidUpdate方法，形成一个无限循环。通过添加判断，我们可以确保只有在当前页面路径与上一个页面路径不同时才会更新菜单状态，从而避免了不必要的循环更新。
    componentDidUpdate(prevProps) {
        // 这里必须要有这个前后路径是否一致的判断，否则会出现死循环
        if (prevProps.location.pathname !== this.props.location.pathname) {
        
            this.changeSelected();
            this.changeOpenKey()
           
        }
    }
    
    componentDidMount() {
        
        this.changeSelected();
      this.changeOpenKey()

        //如果是首次加载的话直接渲染菜单项，如果是刷新的话发送请求获取role和nickname，然后把role和nickanme以及根据role筛选出来相应的路由信息表都重新存储到redux中，然后再根据重新存储的路由信息表渲染菜单
        if (this.props.res.menuReducer.length) {
            //首次加载直接渲染菜单
            const menuTree = this.renderMenu(this.props.res.menuReducer)
         
            this.setState({
                menuTree
            })
           
        } else {
            //刷新
            getInfo().then(res => {
                const { loginAction, menuAction } = this.props
                //重新存储role和nickname到redux中
                loginAction({ role: res.data.role, nickname: res.data.nickname })
                // loginAction({ role: 'teacher', nickname: res.data.nickname })

                //重新存储筛选过后的路由信息表到redux中
                menuAction(menuFilter(asyncRouterMap, res.data.role))
                // menuAction(menuFilter(asyncRouterMap, 'teacher'))

                //渲染菜单项
                const menuTree = this.renderMenu(this.props.res.menuReducer)
               
                this.setState({
                    menuTree
                })

            })
        }
    }

    //菜单渲染
    renderMenu = (data) => {
        
        return data.map((item) => {
            const icon = React.createElement(Icons[item.meta.icon])
            if (item.children) {
                return <SubMenu key={item.path} title={item.meta.title} icon={icon}>
                    {this.renderMenu(item.children)}
                </SubMenu>
            } else {
                return <Menu.Item key={item.path} icon={icon}>
                    <NavLink to={'/index' + item.path}>{item.meta.title}</NavLink>
                </Menu.Item>
            }
        })
    }

    //创建路由列表，异步路由：根据筛选后的路由表有几项就有几个Route，递归实现
    renderRoute = (menu) => {
        const routeList = []
        const asyncRoute = (data) => {
            data.forEach(item => {
                if (item.children) {
                    asyncRoute(item.children)
                } else {
                    routeList.push(
                        <Route path={'/index' + item.path} component={lazy(() => import(`@/views${item.path}/Index.jsx`))} key={item.path}></Route>
                    )
                }
            });
        }
        asyncRoute(menu)

        return routeList
    }

    //展开和回收某项菜单,把openKeys的数组值变为keys数组的最后一项
    handleOpenChange = (keys) => {
        ///keys是一个字符串数组，记录了当前哪一项是展开的(用key来记录)
        // console.log(keys)  
        /* 点击page3输出["",'/page3']，再点击page4输出["",'/page4']，点击谁keys数组的最后一项就是谁*/
        this.setState({
            openKeys: [keys[keys.length - 1]]
        })
        
    }




    //获取当前路径 切割后的key
    getCurrentRoute=()=>{
        return  this.props.location.pathname.split('/index')[1]
    }

    changeOpenKey=()=>{
        const currentRoute = this.getCurrentRoute()
         // pathname:  /home   /student/exam    /student/exam/a
        // 想要的结果  /home   /student          /student/exam
        //先拆开在拼起来
        //拆开    ['',home] ['','student','exam']    ['','student','exam','a']
        //取1~倒数第二项    ['student']   ['student','exam']
        //拼接起来
        let openKeys=['']
        if(currentRoute.split('/').length>2){
            openKeys=[`/${currentRoute.split('/').slice(1, -1).join('/')}`]
        }
        this.setState({
            openKeys
        })
    }
    changeSelected = () => {
        //根据当前页面路由修改当前选中的菜单项key数组
        //获取当前页面路径(切割后的key)  由于我们设计的当前页面路径与key不完全一致需要做切割
        const currentRoute = this.getCurrentRoute()

        // pathname:  /home   /student/exam    /student/exam/a
        // 想要的结果  /home   /student          /student/exam
        //先拆开在拼起来
        //拆开    ['',home] ['','student','exam']    ['','student','exam','a']
        //取1~倒数第二项    ['student']   ['student','exam']
        //拼接起来
        // let openKeys=[]
        // if(currentRoute.split('/').length>2){
        //     openKeys=[`/${currentRoute.split('/').slice(1, -1).join('/')}`]
        // }
        // // console.log(openKeys)
        this.setState({
            selectedKey: [currentRoute],
            // openKeys
        })        
    }






    render() {
        const { menuReducer } = this.props.res
        let { openKeys, selectedKey } = this.state

        return (
            <div>
                <Layout style={{ backgroundColor: 'f4f4f4' }}>
                    <Sider style={{ backgroundColor: '#001529' }}>
                        <h1 style={{ color: '#fff', textAlign: 'center', marginTop: '10px', fontWeight: "bold" }}>好学教育</h1>
                        <Menu
                            defaultSelectedKeys={['home']}
                            selectedKeys={selectedKey}
                            mode="inline"
                            theme="dark"
                            style={{ height: "100vh" }}
                            openKeys={openKeys}  //当前菜单展开项的key数组。
                            onOpenChange={this.handleOpenChange}  //展开和回收某项菜单时的事件。
                        >
                            {this.state.menuTree}
                        </Menu>
                    </Sider>
                    <Layout style={{ overflow: 'auto' }}>
                        <Header style={{ backgroundColor: '#fff', textAlign: 'right', fontSize: '14px' }}>
                            <HeaderItem history={this.props.history}></HeaderItem>
                        </Header>
                        <Suspense fallback={<div>loading...</div>}>
                            <Content>
                                {this.renderRoute(menuReducer)}
                            </Content>
                        </Suspense>
                    </Layout>
                </Layout>

            </div>
        )
    }
}
export default connect(state => ({ res: state }), { menuAction, loginAction })(Index)