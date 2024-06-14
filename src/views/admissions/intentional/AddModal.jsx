import React, { Component } from 'react'
import { Modal, Form, Row, Col, Input, Radio, message } from 'antd'
import { addIntention, editIntention } from '@/api/intention'
export default class AddModal extends Component {
    handleCancel = () => {
        this.formRef.resetFields()
        this.props.changeVisible(false)
    }
    handleOk = () => {
        this.formRef.validateFields().then(res => {
            const { title } = this.props
            const fn = title === '新增学员' ? addIntention(res) : editIntention({ ...res, id: this.props.record.id })
            fn.then(r => {
                if (r.code === 200) {
                    message.success(r.msg);
                    this.formRef.resetFields()
                    this.props.changeVisible(false)
                    this.props.reload()
                }
            })
        })
    }
    render() {
        const { visible, title } = this.props
        return (
            <div>
                <Modal title={title} visible={visible} onOk={this.handleOk} onCancel={this.handleCancel} width={800}>
                    <Form
                        name="basic"
                        labelCol={{ span: 6, }}
                        wrapperCol={{ span: 18, }}
                        ref={a => this.formRef = a}
                    >
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    label="姓名"
                                    name="customer"
                                    rules={[
                                        {
                                            required: true,
                                            message: '姓名不能为空',
                                        },
                                    ]}
                                >
                                    <Input></Input>
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
                                    <Radio.Group>
                                        <Radio value={1}>男</Radio>
                                        <Radio value={2}>女</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    label="客户状态"
                                    name="client"
                                    rules={[
                                        {
                                            required: true,
                                            message: '客户状态不能为空',
                                        },
                                    ]}
                                >
                                    <Radio.Group>
                                        <Radio value={1}>待转化</Radio>
                                        <Radio value={2}>转化中</Radio>
                                        <Radio value={3}>转化成功</Radio>
                                        <Radio value={4}>转化失败</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    label="试听状态"
                                    name="trial"
                                    rules={[
                                        {
                                            required: true,
                                            message: '试听状态不能为空',
                                        },
                                    ]}
                                >
                                    <Radio.Group>
                                        <Radio value={1}>未转试听</Radio>
                                        <Radio value={2}>已转试听</Radio>

                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    label="招生来源"
                                    name="source"
                                    rules={[
                                        {
                                            required: true,
                                            message: '招生来源不能为空',
                                        },
                                    ]}
                                >
                                    <Radio.Group>
                                        <Radio value={1}>转介绍</Radio>
                                        <Radio value={2}>网站</Radio>
                                        <Radio value={3}>老带新</Radio>
                                        <Radio value={4}>门店</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
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
                                    <Input></Input>
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
                                    <Input></Input>
                                </Form.Item>
                                <Form.Item
                                    label="意向级别"
                                    name="level"
                                    rules={[
                                        {
                                            required: true,
                                            message: '意向级别不能为空',
                                        },
                                    ]}
                                >
                                    <Radio.Group>
                                        <Radio value={1}>1</Radio>
                                        <Radio value={2}>2</Radio>
                                        <Radio value={3}>3</Radio>
                                        <Radio value={4}>4</Radio>
                                        <Radio value={5}>5</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    label="主负责人"
                                    name="leader"
                                    rules={[
                                        {
                                            required: true,
                                            message: '主负责人不能为空',
                                        },
                                    ]}
                                >
                                    <Input></Input>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>
        )
    }
}
