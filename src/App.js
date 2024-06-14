import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Home from './views/layout/Index'
import Login from './views/login/Index'
import { isLogin } from './utils/auth'
import './App.css';
// import Test from './Test'
export default class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    {/* Switch虽然在v5版本不是必须的，但是基本都会用到，只让页面匹配上一个，不能匹配上多个 */}
                    <Switch>
                        <Route path='/' exact render={() => <Redirect to='/index'></Redirect>}></Route>
                        <Route path='/index' render={(props) => {
                            //想要进入到主页，如果此时还未登录就重定向到登录页，如果已经登陆了就进入首页
                            if (isLogin()) {
                                // Home组件并不是路由组件，render的函数式组件才是真正的路由组件，需要把props的内容传到Home组件中。
                                return <Home {...props}></Home>
                            } else {
                                return <Redirect to='/login'></Redirect>
                            }
                        }}></Route>
                        <Route path='/login' render={(props)=>{
                            if(isLogin()){
                                return <Redirect to='/index/home'></Redirect>
                            }else{
                                return <Login {...props}></Login>
                            }
                        }}></Route>
                    </Switch>
                </Router>
            </div>
        )
        // return (<div>
        //     <Router>
        //      <Test></Test>
        //     </Router>
        // </div>)
    }
}

