import React, { Component } from 'react'
import { Modal, Select, Input, Row, Col, Form, DatePicker, Radio, message } from 'antd'
import moment from 'moment';
import { addTeacher,editTeacher } from '../../api/teacher';
const { Option } = Select;
export default class AddModal extends Component {
   
    handleOk = () => {
        this.formRef.validateFields().then(res => {
            const date = moment(res.date).format('YYYY-MM-DD')
            const birth = moment(res.birth).format('YYYY-MM-DD')
            const fn=this.props.title==='新增教师'?addTeacher({ ...res, date, birth }):editTeacher({ ...res, date, birth ,id:this.props.record.id})
            fn.then(r => {
                if (r.code === 200) {
                    this.formRef.resetFields()
                    this.props.changeVisible(false)
                    message.success(r.msg);
                    this.props.getTableList()
                }
            })
        })
    }
    handleCancel = () => {
        this.formRef.resetFields()
        this.props.changeVisible(false)
    }
    render() {
        const { visible,title } = this.props
        return (
            <div>
                <Modal title={title} visible={visible} onOk={this.handleOk} onCancel={this.handleCancel} width={800}>
                    <Form
                        name='basic'
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16, }}
                        ref={a => this.formRef = a}
                    >
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    label="姓名"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: '姓名不能为空',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="性别"
                                    name="gender"
                                    rules={[
                                        {
                                            required: true,
                                            message: '性别不能为空',
                                        },
                                    ]}
                                >
                                    <Select>
                                        <Option value={1}>男</Option>
                                        <Option value={2}>女</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="级别"
                                    name="level"
                                    rules={[
                                        {
                                            required: true,
                                            message: '级别不能为空',
                                        },
                                    ]}
                                >
                                    <Select>
                                        <Option value={1}>初级教师</Option>
                                        <Option value={2}>中级教师</Option>
                                        <Option value={3}>高级教师</Option>
                                        <Option value={4}>特级教师</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="年级"
                                    name="grade"
                                    rules={[
                                        {
                                            required: true,
                                            message: '年级不能为空',
                                        },
                                    ]}
                                >
                                    <Input placeholder='如初一、初二等' />
                                </Form.Item>
                                <Form.Item
                                    label="科目"
                                    name="subject"
                                    rules={[
                                        {
                                            required: true,
                                            message: '科目不能为空',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="入职日期"
                                    name="date"
                                    rules={[
                                        {
                                            required: true,
                                            message: '入职日期不能为空',
                                        },
                                    ]}
                                >
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="类型"
                                    name="type"
                                    rules={[
                                        {
                                            required: true,
                                            message: '类型不能为空',
                                        },
                                    ]}
                                >
                                    <Radio.Group >
                                        <Radio value={1}>全职</Radio>
                                        <Radio value={2}>兼职</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    label="手机号码"
                                    name="tel"
                                    rules={[
                                        {
                                            required: true,
                                            message: '手机号码不能为空',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="毕业院校"
                                    name="school"
                                    rules={[
                                        {
                                            required: true,
                                            message: '毕业院校不能为空',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="出生年月"
                                    name="birth"
                                    rules={[
                                        {
                                            required: true,
                                            message: '出生年月不能为空',
                                        },
                                    ]}
                                >
                                    <DatePicker style={{ width: '100%' }} />

                                </Form.Item>
                                <Form.Item
                                    label="家庭住址"
                                    name="address"
                                    rules={[
                                        {
                                            required: true,
                                            message: '家庭住址不能为空',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="学历"
                                    name="education"
                                    rules={[
                                        {
                                            required: true,
                                            message: '学历不能为空',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>






            </div>
        )
    }
}
