import React, { Component } from 'react'
import { Menu, Dropdown, Badge } from 'antd';
import { DownOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { BellOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import {loginAction,menuAction} from '../../redux/actions/login'
class Index extends Component {
    //退出登录：先删除token，在删除redux中的个人信息和菜单项，最后再跳转到登录页，否则直接跳转到登录页的话由于已经登录了会重定向到首页
    logOut=()=>{
        const {loginAction,menuAction,history}=this.props
        //删除token
        sessionStorage.clear()
        //删除个人信息
        loginAction({role:'',nickname:''})
        //删除菜单项
        menuAction([])
        history.push('/login')
    }
    render() {
        const { nickname } = this.props.res.loginReducer
        const menu = (
            <Menu>
                <Menu.Item icon={<UserOutlined />} key='1' style={{ fontSize: '12px' }}><NavLink to='/index/personal'>个人中心</NavLink></Menu.Item>
                <Menu.Item icon={<HomeOutlined />} key='2' style={{ fontSize: '12px' }} onClick={this.logOut}>退出登录</Menu.Item>
            </Menu>
        );
        return (
            <div>
                <Badge count={36} size="small">
                    <BellOutlined style={{ fontSize: '25px', color: '#1890ff' }} />
                </Badge>
                <Dropdown overlay={menu} >
                    <a className="ant-dropdown-link" style={{ marginLeft: '15px' }} >
                        欢迎您，{nickname}<DownOutlined />
                    </a>
                </Dropdown>
            </div>
        )
    }
}
export default connect(
    state => ({ res: state }),
    {loginAction,menuAction}
)(Index)