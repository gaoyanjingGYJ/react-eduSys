import React, { Component } from 'react'
import { Row, Col, Card, Form, Input, Button, Table, Badge, Tag, Pagination, message } from 'antd'
import MyBread from './MyBread'
import AddModal from './AddModal'
import { getIntentionList, batchDeleteIntention, } from '@/api/intention'
export default class Index extends Component {
    state = {
        formData: {},
        disabled: true,
        tableData: [],
        pageData: {
            page: 1,
            pageSize: 10
        },
        total: 0,
        loading: false,
        selectedRowKeys: [],
        visible: false,
        formal: false,//正式学员,
        title: '',
        record: {}
    }
    componentDidMount() {
        this.loadData()
    }
    loadData = () => {
        const { formData, pageData } = this.state
        this.setState({
            loading: true,
            disabled: true
        })
        //加载表格数据
        getIntentionList({ ...formData, ...pageData }).then(res => [
            this.setState({
                tableData: res.data.list,
                total: res.data.total,
                loading: false
            })
        ])

    }
    search = () => {
        const formData = this.formRef.getFieldsValue(true)
        console.log(formData)
        this.setState({
            formData
        }, () => {
            this.loadData()
        })

    }
    reset = () => {
        this.formRef.resetFields()
        this.setState({
            pageData: {
                page: 1,
                pageSize: 10
            },
            formData: {}
        }, () => {
            this.loadData()
        })
    }
    handleSelectChange = (selectedRowKeys) => {
        // this.setState({
        //     selectedRowKeys,
        //     disabled: selectedRowKeys.length ? false : true
        // })
        this.setState({
            selectedRowKeys,
            disabled: selectedRowKeys.length ? false : true
        })

    }
    changePage = (page, pageSize) => {
        this.setState({
            pageData: {
                page, pageSize
            }
        }, () => {
            this.loadData()
        })
    }
    changeVisible = (visible) => {
        this.setState({
            visible
        })
    }
    addIntention = () => {
        this.setState({
            visible: true,
            title: "新增学员"
        })
    }
    transform = () => {
        //bug
    }
    detail = (record) => {
        this.setState({
            visible: true,
            title: '编辑学员',
            record
        }, () => {
            this.myRef.formRef.setFieldsValue(record)
        })

    }
    batchDelete = () => {
        const { selectedRowKeys } = this.state
        batchDeleteIntention({ id: selectedRowKeys }).then(res => {
            if (res.code === 200) {
                message.success(res.msg)
                this.loadData()
                this.setState({
                    selectedRowKeys:[]
                })
            }
        })

    }
    render() {
        const { disabled, tableData, loading, total, visible, formal, title, record, selectedRowKeys } = this.state

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
                render: (text, record, index) => <Button type='primary' onClick={() => { this.detail(record) }}>详情</Button>
            },

        ]
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
                                <Button className='ml' onClick={this.reset}>重置</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>
                <Card className='mt ml'>
                    <Button type='primary' className='mr' onClick={this.addIntention}>新增</Button>
                    <Button type='danger' className='mr' disabled={disabled} onClick={this.batchDelete}>删除</Button>
                    <Button type='primary' className='mr' onClick={this.transform}>转化为正式学员</Button>
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
                        rowSelection={{ type: 'checkbox', onChange: this.handleSelectChange,selectedRowKeys:selectedRowKeys }}
                    >
                    </Table>
                    <Pagination size="small" total={total} showSizeChanger showQuickJumper onChange={this.changePage} />

                </Card>
                <AddModal visible={visible} changeVisible={this.changeVisible} reload={this.loadData} ref={a => this.myRef = a} title={title} record={record}></AddModal>
            </div>
        )
    }
}

