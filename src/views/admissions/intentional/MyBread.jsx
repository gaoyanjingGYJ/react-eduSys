//需要传入属性:当前页面的路径pathname
import React, { Component } from 'react'
import { Breadcrumb } from 'antd'
import { connect } from 'react-redux'
class MyBread extends Component {
    state = {
        breadList: [], //里面放的是Breadcrumb.Item
    }
    componentDidMount() {
        this.renderItems()
    }
    renderItems = () => {
        const routes = this.getRoutes().reverse()
        let arr = []
        function bread(data) {
            data.forEach((route) => {
                const { path: routePath, breadcrumbName, children } = route;
                const item = (
                    <Breadcrumb.Item key={routePath}>
                        <span>{breadcrumbName}</span>
                    </Breadcrumb.Item>
                );
                arr.push(item)
                if (children) {
                    bread(children)
                }

            })
        }
        bread(routes)
        this.setState({
            breadList: arr
        })
    }
    getRoutes = () => {
        const { menuReducer } = this.props.res
        const currentPath = this.props.pathname.split('/index')[1]
        let routes = []
        const fn = (data) => {
            data.forEach(item => {
                //先判相等 再判开头
                if (item.path === currentPath) {
                    //相等
                    routes.push({ path: item.path, breadcrumbName: item.breadcrumbName })
                } else {
                    if (currentPath.startsWith(item.path)) {
                        //不相等，但是是他的children
                        routes.push({ path: item.path, breadcrumbName: item.breadcrumbName, children: fn(item.children) })
                    }
                }
            })
        }
        fn(menuReducer)
        return routes
    }
    render() {
        const { breadList } = this.state
        return (
            <div>
                <Breadcrumb>
                    {breadList}
                </Breadcrumb>
            </div>
        )
    }
}
export default connect(
    state => ({ res: state })
)(MyBread)
