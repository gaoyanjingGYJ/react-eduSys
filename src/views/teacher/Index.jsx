import React, { Component } from 'react'
import { Button, Form, Input, Card, Row, Col, Select, Table, Pagination, message } from 'antd';
import { getTeacherList, deleteTeacher, batchDeleteTeacher } from '../../api/teacher';
import AddModal from './addModal';
import moment from 'moment'
const { Option } = Select;
export default class Index extends Component {
    formRef = React.createRef()
    state = {
        disabled: true,
        formList: [],
        loading: false,
        pageData: {
            page: 1,
            pageSize: 10
        },
        visible: false,
        total: 0,
        formData: {},
        record: {},
        title: '',
        selectedRowKeys: []
    }
    getTableList = () => {
        this.setState({ loading: true,disabled:true })

        getTeacherList({ ...this.state.formData, ...this.state.pageData }).then(res => {
            this.setState({
                formList: res.data.list,
                loading: false,
                total: res.data.total
            })
        })
    }

    componentDidMount() {
        this.getTableList()
    }
    // 当用户点击搜索按钮时才获取表单数据，其余的时候用的都是上次的表单数据，把获取到的表单数据放在state中
    search = () => {
        const formData = this.formRef.current.getFieldsValue(true)
        this.setState({
            formData
        }, () => {
            this.getTableList()
        })

    }
    reset = () => {
        //清空表单数据
        this.formRef.current.resetFields()
        //清空分页数据
        this.setState({
            pageData: {
                page: 1,
                pageSize: 10
            },
            formData: {}
        }, () => {
            this.getTableList()
        })

    }
    addTeacher = () => {
        this.setState({
            visible: true,
            title: '新增教师'
        })
    }
    changeVisible = (visible) => {
        this.setState({ visible })
    }
    handleChange = (page, pageSize) => {
        console.log(112, page)
        this.setState({
            pageData: {
                page, pageSize
            }
        }, () => {
            console.log(111, page, pageSize)
            this.getTableList()
        })

    }
    edit = (record) => {
        this.setState({
            visible: true,
            record,
            title: '编辑教师'
        }, () => {
            const date = moment(record.date)
            const birth = moment(record.birth)
            this.myRef.formRef.setFieldsValue({ ...record, date, birth })
        })
    }
    deletes = (id) => {
        deleteTeacher({ id }).then(res => {
            if (res.code === 200) {
                message.success(res.msg);
                this.getTableList()
            }
        })
    }
    selectChange = (selectedRowKeys, selectedRows) => {
        this.setState({
            selectedRowKeys,
            disabled: selectedRowKeys.length ? false : true
        })

    }
    //批量删除
    batchDelete = () => {
        batchDeleteTeacher({ id: this.state.selectedRowKeys }).then(res => {
            if (res.code === 200) {
                message.success(res.msg);
                this.getTableList()
                console.log(111,this.state.selectedRowKeys)
                this.setState({
                    selectedRowKeys: []
                },()=>{
                    console.log(222,this.state.selectedRowKeys)
                })
            }
        })
    }
    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'id',
                key: 'id',
                align: 'center',
                width: 100
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                align: 'center',
                width: 100

            },
            {
                title: '性别',
                dataIndex: 'gender',
                key: 'gender',
                align: 'center',
                render: (text) => {
                    return text === 1 ? '男' : '女'
                },
                width: 80

            },
            {
                title: '级别',
                dataIndex: 'level',
                key: 'level',
                align: 'center',
                render: (text) => {
                    if (text === 1) {
                        return '初级教师'
                    } else if (text === 2) {
                        return '中级教师'
                    } else if (text === 3) {
                        return '高级教师'
                    } else {
                        return '特级教师'
                    }
                },
                width: 100

            },
            {
                title: '年级',
                key: 'grade',
                dataIndex: 'grade',
                align: 'center',
                width: 80
            },
            {
                title: '科目',
                key: 'subject',
                dataIndex: 'subject',
                align: 'center',
                width: 80
            }, {
                title: '入职日期',
                key: 'date',
                dataIndex: 'date',
                align: 'center',
                width: 120
            }, {
                title: '类型',
                key: 'type',
                dataIndex: 'type',
                align: 'center',
                render: (text) => text === 1 ? '全职' : '兼职',
                width: 100
            }, {
                title: '手机号码',
                key: 'tel',
                dataIndex: 'tel',
                align: 'center',
                width: 180
            }, {
                title: '毕业院校',
                key: 'school',
                dataIndex: 'school',
                align: 'center',
                width: 150
            }, {
                title: '出生年月',
                key: 'birth',
                dataIndex: 'birth',
                align: 'center',
                width: 120
            }, {
                title: '家庭住址',
                key: 'address',
                dataIndex: 'address',
                align: 'center',
                width: 120
            }, {
                title: '学历',
                key: 'education',
                dataIndex: 'education',
                align: 'center'
            },
            {
                title: '操作',
                key: 'operate',
                dataIndex: 'operate',
                fixed: 'right',
                align: 'center',
                width: 170,
                render: (text, record) => {
                    return <div>
                        <Button type='primary' onClick={() => { this.edit(record) }}>编辑</Button>
                        <Button type='primary' danger className='ml' onClick={() => this.deletes(record.id)}>删除</Button>
                    </div>
                }
            },
        ];
        const { disabled, formList, loading, visible, total, record, title, selectedRowKeys } = this.state
        return (
            <div>
                <Card className='mt ml'>
                    <Form
                        ref={this.formRef}
                        name="basic"
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 18,
                        }}
                    >
                        <Row gutter={12}>
                            <Col span={6} >
                                <Form.Item
                                    label="姓名"
                                    name="name"
                                >
                                    <Input placeholder='请输入姓名' />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="科目" name="subject">
                                    <Select placeholder='请选择科目'>
                                        <Option value=''>全部</Option>
                                        <Option value="语文">语文</Option>
                                        <Option value="数学">数学</Option>
                                        <Option value="英语">英语</Option>
                                        <Option value="物理">物理</Option>
                                        <Option value="化学">化学</Option>
                                        <Option value="生物">生物</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="手机号" name="tel">
                                    <Input placeholder='请输入手机号'></Input>
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
                    <Button type='primary' onClick={this.addTeacher}>新建员工</Button>
                    <Button type='danger' disabled={disabled} className='ml' onClick={this.batchDelete}>批量删除</Button>
                </Card>
                <Card className='mt ml'>
                    <Table
                        columns={columns}
                        dataSource={formList}
                        rowKey={(record) => record.id}
                        scroll={{ x: 1200 }}
                        loading={loading}
                        pagination={false}
                        rowSelection={{
                            type: 'checkbox',
                            selectedRowKeys: selectedRowKeys,
                            onChange: this.selectChange
                        }}
                    />
                    <Pagination
                        total={total}
                        showSizeChanger
                        showQuickJumper
                        onChange={this.handleChange}
                        style={{ marginTop: '20px', textAlign: "center" }}
                    />
                    <Pagination size="small" total={total} showSizeChanger showQuickJumper />
                </Card>
                <AddModal
                    visible={visible}
                    changeVisible={this.changeVisible}
                    getTableList={this.getTableList}
                    record={record}
                    ref={a => this.myRef = a}
                    title={title}
                >

                </AddModal>
            </div>
        )
    }
}
