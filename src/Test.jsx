import React, { Component } from 'react'
import { connect } from 'react-redux'
import MyBread from './MyBread'
import { Card, Row, Col, Form, Input, Button, Table, Tag, Badge,Pagination  } from 'antd'
import { getIntentionList } from '@/api/intention'
class Index extends Component {
    state = {
        formData: {},
        tableData: [],
        pageData: {
            page: 1,
            pageSize: 10
        },
        loading: false,
        total:0,
        disabled:true,
        selectedRowKeys:[]
    }

    componentDidMount() {
        this.loadData()
    }
    loadData = () => {
        const { pageData, formData } = this.state
        this.setState({
            loading:true
        })
        getIntentionList({ ...pageData, ...formData }).then(res => {
            this.setState({
                tableData: res.data.list,
                loading:false,
                total:res.data.total
            })
        })
    }
    search = () => {
        const formData = this.formRef.getFieldValue()
        const {pageData}=this.state
        this.setState({
            formData
        },()=>{
            getIntentionList({...formData,...pageData}).then(res=>{
                
            })
        })
        
    }
    handleChange=(selectedRowKeys, selectedRows)=>{
        this.setState({
            disabled:selectedRowKeys.length?false:true
        })
    }
    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'id',
                align: 'center',
                key: 'id',
            },
            {
                title: '姓名',
                dataIndex: 'customer',
                align: 'center',
                key: 'customer',
            }, {
                title: '性别',
                dataIndex: 'gender',
                key: 'gender',
                align: 'center',
                render: (text) => text === 1 ? '男' : '女'
            }, {
                title: '客户状态',
                dataIndex: 'client',
                key: 'client',
                align: 'center',
                render: (text) => {
                    if (text === 1) {
                        return <Tag color='#b8adf7'>待转化</Tag>
                    } else if (text === 2) {
                        return <Tag color='#2db7f5'>转化中</Tag>
                    } else if (text === 3) {
                        return <Tag color='#87d068'>转化成功</Tag>
                    } else {
                        return <Tag color='#f50'>转化失败</Tag>
                    }
                }
            }, {
                title: '试听状态',
                dataIndex: 'trial',
                key: 'trial',
                align: 'center',
                render: (text) => text === 1 ? <Badge color='green' text='已转试听' /> : <Badge color='#ebe7e7' text='未转试听' />
            }, {
                title: '招生来源',
                dataIndex: 'source',
                key: 'source',
                align: 'center',
                render: (text) => {
                    if (text === 1) {
                        return '转介绍'
                    } else if (text === 2) {
                        return '网站'
                    } else if (text === 3) {
                        return '老带新'
                    } else {
                        return '门店'
                    }
                }
            }, {
                title: '手机号码',
                dataIndex: 'tel',
                align: 'center',
                key: 'tel'
            }, {
                title: '年级',
                dataIndex: 'grade',
                align: 'center',
                key: 'grade'
            }, {
                title: '意向级别',
                dataIndex: 'level',
                align: 'center',
                key: 'level'
            }, {
                title: '主负责人',
                dataIndex: 'leader',
                align: 'center',
                key: 'leader'
            }, {
                title: '详情',
                dataIndex: 'detail',
                key: 'detail',
                align: 'center',
                render: () => <Button type='primary'>详情</Button>
            },

        ]
        const { tableData, loading,total,disabled } = this.state
        return (
            <div>
                <div className='mt ml'>
                    <MyBread pathname={this.props.location.pathname}></MyBread>
                </div>
                <Card className='mt ml'>
                    <Form
                        name="basic"
                        labelCol={{ span: 6, }}
                        wrapperCol={{ span: 18, }}
                        ref={a => this.formRef = a}
                    >
                        <Row gutter={24} >
                            <Col span={6}>
                                <Form.Item label='姓名：' name='customer'>
                                    <Input placeholder='请输入客户姓名' />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label='负责人：' name='leader'>
                                    <Input placeholder='请输入负责人姓名' />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Button type='primary' onClick={this.search}>查询</Button>
                                <Button className='ml'>重置</Button>
                            </Col>


                        </Row>

                    </Form>
                </Card>
                <Card className='mt ml'>
                    <Button type='primary' className='mr'>新增</Button>
                    <Button type='danger' className='mr' disabled={disabled}>删除</Button>
                    <Button type='primary' className='mr'>转化为正式学员</Button>
                    <Button type='primary'>取消转化</Button>
                </Card>
                <Card className='mt ml'>
                    <Table
                        columns={columns}
                        dataSource={tableData}
                        rowKey={record => record.id}
                        scroll={{ x: 1200 }}
                        pagination={false}
                        loading={loading}
                        rowSelection={{type:'checkbox',onChange:this.handleChange}}
                    />
                     <Pagination size="small" total={total} showSizeChanger showQuickJumper />
                </Card>
            </div>
        )
    }
}
export default connect(
    state => ({ res: state })
)(Index)