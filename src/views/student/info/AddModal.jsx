import React, { Component } from 'react'
import { Modal, Form, Radio, Row, Col ,Input,message} from 'antd'
import { editStudent } from '../../../api/student'
export default class AddModal extends Component {
    handleCancel = () => {
        this.formRef.resetFields()
        this.props.changeVisible(false)
    }
    handleOk = () => {
        this.formRef.validateFields().then(res=>{
            editStudent({...res,id:this.props.record.id}).then(r=>{
                if(r.code===200){
                    message.success(r.msg)
                    this.props.changeVisible(false)
                    this.formRef.resetFields()
                    this.props.reload()
                }
            })
        })
    }
    
    render() {
        const { visible } = this.props
        return (
            <div>
                <Modal title="详情" visible={visible} onOk={this.handleOk} onCancel={this.handleCancel} width={800}>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: true,
                        }}
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
                                    label="年龄"
                                    name="age"
                                    rules={[
                                        {
                                            required: true,
                                            message: '年龄不能为空',
                                        },
                                    ]}
                                >
                                    <Input />
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
                                    <Input />
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
                                    label="班型"
                                    name="type"
                                    rules={[
                                        {
                                            required: true,
                                            message: '班型不能为空',
                                        },
                                    ]}
                                >
                                    <Radio.Group>
                                        <Radio value='一对一'>一对一</Radio>
                                        <Radio value='小班'>小班</Radio>
                                        <Radio value='大班'>大班</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    label="家长姓名"
                                    name="pname"
                                    rules={[
                                        {
                                            required: true,
                                            message: '家长姓名不能为空',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="家长电话"
                                    name="tel"
                                    rules={[
                                        {
                                            required: true,
                                            message: '家长电话不能为空',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="班主任姓名"
                                    name="tname"
                                    rules={[
                                        {
                                            required: true,
                                            message: '班主任姓名不能为空',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="校区"
                                    name="school"
                                    rules={[
                                        {
                                            required: true,
                                            message: '校区不能为空',
                                        },
                                    ]}
                                >
                                    
                                    <Radio.Group>
                                        <Radio value='中心校区'>中心校区</Radio>
                                        <Radio value='顺义校区'>顺义校区</Radio>
                                        <Radio value='大兴校区'>大兴校区</Radio>
                                        <Radio value='昌平校区'>昌平校区</Radio>
                                    </Radio.Group>

                                </Form.Item>
                                <Form.Item
                                    label="剩余课时"
                                    name="hours"
                                    rules={[
                                        {
                                            required: true,
                                            message: '剩余课时不能为空',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="已缴费用"
                                    name="cost"
                                    rules={[
                                        {
                                            required: true,
                                            message: '已缴费用不能为空',
                                        },
                                    ]}
                                >
                                   <Radio.Group>
                                        <Radio value={1}>是</Radio>
                                        <Radio value={2}>否</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    label="课程有效期"
                                    name="expiration"
                                    rules={[
                                        {
                                            required: true,
                                            message: '课程有效期不能为空',
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
