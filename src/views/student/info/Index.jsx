import React, { Component } from 'react'
import { Card, Row, Col, Button, Input, Form, Radio ,Table,Pagination} from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import MyBread from '../../admissions/intentional/MyBread'
import { getStudentList } from '../../../api/student';
import AddModal from './AddModal';
export default class Index extends Component {
    state = {
        text: '展开',
        icon: <DownOutlined />,
        display: 'none',
        value: 'All',
        tableData:[],
        formData:{},
        total:0,
        pageData:{
            page:1,
            pageSize:10
        },
        school:'All',
        visible:false,
        
    }
    componentDidMount(){
        this.loadData()
    }
    expand = () => {
        const { text } = this.state
        if (text === '展开') {
            this.setState({
                text: '收起',
                icon: <UpOutlined />,
                display: 'flex'
            })
        } else {
            this.setState({
                text: '展开',
                icon: <DownOutlined />,
                display: 'none'
            })
        }

    }
    handleOnChange = ({ target: { value } }) => {
        
        this.setState({
            value,
            school:value
        },()=>{
            this.loadData()
        })
    }
    loadData=()=>{
        const {formData,pageData,school}=this.state
        getStudentList({...formData,...pageData,school}).then(res=>{
           this.setState({
            tableData:res.data.list,
            total:res.data.total,
           })
        })
    }
    handlePage=(page,pageSize)=>{
        this.setState({
            pageData:{
                page,pageSize
            }
        },()=>{
            this.loadData()
    })
    }
    detail=(record)=>{
        this.setState({
            visible:true,
            record
        },()=>{
           this.myRef.formRef.setFieldsValue(record)
        })
    }
    changeVisible=(visible)=>{
        this.setState({
            visible
        })
    }
    render() {
        const { text, icon, display, value,tableData,total,visible } = this.state

        const options = [
            {
                label: '全部',
                value: 'All',
            },
            {
                label: '中心校区',
                value: 'Middle',
            },
            {
                label: '顺义校区',
                value: 'ShunYi',
            },
            {
                label: '大兴校区',
                value: 'DaXing',
            }, {
                label: '昌平校区',
                value: 'ChangPing',
            },
        ];
        const columns=[
            {
                title: '序号',
                dataIndex: 'id',
                key: 'id',
                align:'center'
              },{
                title: '姓名',
                dataIndex: 'name',
                key: 'name',align:'center'
              },{
                title: '年龄',
                dataIndex: 'age',
                key: 'age',align:'center'
              },{
                title: '年级',
                dataIndex: 'grade',
                key: 'grade',align:'center'
              },{
                title: '科目',
                dataIndex: 'subject',
                key: 'subject',align:'center'
              },{
                title: '班型',
                dataIndex: 'type',
                key: 'type',align:'center'
              },{
                title: '家长姓名',
                dataIndex: 'pname',
                key: 'pname',align:'center'
              },{
                title: '家长电话',
                dataIndex: 'tel',
                key: 'tel',align:'center'
              },{
                title: '班主任姓名',
                dataIndex: 'tname',
                key: 'tname',align:'center'
              },{
                title: '校区',
                dataIndex: 'school',
                key: 'school',align:'center'
              },{
                title: '剩余课时',
                dataIndex: 'hours',
                key: 'hours',align:'center'
              },{
                title: '已缴费用',
                dataIndex: 'cost',
                key: 'cost',align:'center',
                render:(text)=>text===1?'是':'否'
              },{
                title: '课程有效期',
                dataIndex: 'expiration',
                key: 'expiration',align:'center'
              },{
                title: '操作',
                dataIndex: 'operiton',
                key: 'operiton',align:'center',
                render:(text,record)=>{
                    return <Button type='primary' onClick={()=>this.detail(record)}>详情</Button>
                }
              },
        ]
        return (
            <div className='mt ml'>
                <div>
                    <MyBread pathname={this.props.location.pathname}></MyBread>
                </div>
                <Card className='mt ml'>
                    <Form
                        ref={a => this.formRef = a}
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                    >
                        <Row>
                            <Col span={18}>
                                <Row>
                                    <Col span={8}>
                                        <Form.Item label="姓名" name="name">
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label="科目" name="subject">
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label="年级" name="grade">
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row ref={a => this.myref = a} style={{ display }}>
                                    <Col span={8}>
                                        <Form.Item label="班型" name="type">
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label="年龄" name="age">
                                            <Input />
                                        </Form.Item>
                                    </Col>

                                </Row>
                            </Col>
                            <Col span={2}>
                                <Button type='text' onClick={this.expand} style={{ backgroundColor: '#fff', color: '#409eff' }}>
                                    {text}{icon}
                                </Button>
                            </Col>
                            <Col span={4}>
                                <Button type='primary'>查询</Button>
                                <Button className='ml'>重置</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>
                <Card className='mt ml'>
                    <Radio.Group
                        options={options}
                        onChange={this.handleOnChange}
                        value={value}
                        optionType="button"
                        buttonStyle="solid"
                    />
                </Card>
                <Card className='mt ml'>
                <Table columns={columns} dataSource={tableData} rowKey={record=>record.id} pagination={false}/>
                <Pagination size="small" total={total} showSizeChanger showQuickJumper onChange={this.handlePage}/>
                </Card>
                <AddModal visible={visible} ref={a=>this.myRef=a} changeVisible={this.changeVisible} reload={this.loadData}></AddModal>
            </div>
        )
    }
}
