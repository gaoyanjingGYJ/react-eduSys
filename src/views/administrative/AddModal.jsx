import React, { Component } from 'react'
import { Modal, Radio, Form,message } from 'antd'
import { setRole} from '@/api/administrative'

export default class AddModal extends Component {
    handleCancel = () => {
        this.formRef.resetFields()
        this.props.changeVisible(false)
    }
    handleOk = () => {
        this.formRef.validateFields().then(res=>{
            setRole(res).then(r=>{
                if(r.code===200){
                    message.success(r.message)
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
                <Modal title="权限设置" visible={visible} onOk={this.handleOk} onCancel={this.handleCancel} width={800}>
                    <Form name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        ref={a => this.formRef = a}>

                        <Form.Item
                            name="role"
                            rules={[
                                {
                                    required: true,
                                    message: '不能为空',
                                },
                            ]}
                        >
                            <Radio.Group >
                                <Radio value='admin'>管理员/老板</Radio>
                                <Radio value='teacher'>老师/咨询师</Radio>
                                <Radio value='manager'>部门经理</Radio>
                            </Radio.Group>
                        </Form.Item>





                    </Form>
                </Modal>
            </div>
        )
    }
}
