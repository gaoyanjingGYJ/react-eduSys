import React, { Component } from 'react'
import style from './index.module.css'
import { Card, Tabs, Form, Input, Button } from 'antd';
import { login } from '../../api';
import { setToken } from '../../utils/token';
import { connect } from 'react-redux'
import { loginAction, menuAction } from '../../redux/actions/login';
import { asyncRouterMap } from '../../common/routerMap';
import { menuFilter } from '../../utils/menuFilter';
class Index extends Component {
    login = () => {
        const { loginAction, menuAction,history } = this.props
        this.formRef.validateFields().then(res => {
            //整体表单校验通过，发送登录请求成功后存token，进入到首页
            login(res).then(res => {
                //存储token到本地
                setToken(res.token)
                //存储权限和昵称到redux
                loginAction({ role: res.role, nickname: res.nickname })
                // loginAction({ role: 'teacher', nickname: res.nickname })

                //直接筛选出每个角色所对应的菜单项并且存到redux中:从全部的路由信息对照表中根据role筛选出对应的路由形成新的路由信息对照表，在页面中使用新的路由信息对照表
                menuAction(menuFilter(asyncRouterMap,res.role))
                // menuAction(menuFilter(asyncRouterMap,'teacher'))

               
                //跳转到首页
                history.push('/index/home')

            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            //整体表单校验未通过
            console.log(err)
        })
    }
    render() {
        return (
            <div className={style.wrap}>
                <Card title="好学教育后台管理系统" bordered={false} style={{ width: 500 }} headStyle={{ textAlign: 'center',fontWeight:"bold" }}>
                    <Tabs defaultActiveKey="1">
                        <Tabs.TabPane tab="用户名密码登录" key="1">
                            <Form
                                name="basic"
                                labelCol={{ span: 0 }}
                                wrapperCol={{ span: 24 }}
                                ref={a => this.formRef = a}
                            >
                                <Form.Item
                                    name="username"
                                    rules={[
                                        { required: true, message: '用户名不能为空!', },
                                        { pattern: /^\w{4,8}$/, message: '用户名要求是4-8位数字字母组合' }
                                    ]}
                                >
                                    <Input placeholder='请输入您的用户名' />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: '密码不能为空!', }]}
                                >
                                    <Input.Password placeholder='请输入您的密码' />
                                </Form.Item>
                                <Button type='primary' style={{ width: '100%' }} onClick={this.login}>立即登录</Button>
                            </Form>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="新用户注册" key="2">
                            Content of Tab Pane 2
                        </Tabs.TabPane>

                    </Tabs>
                </Card>

            </div>
        )
    }
}
export default connect(state => ({ res: state }), { loginAction, menuAction })(Index)