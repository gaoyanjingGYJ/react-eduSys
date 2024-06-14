import React, { Component } from 'react'
import { Row, Col, Badge, Descriptions, Card, Table, Button } from 'antd'
import { getAdministrative } from '@/api/administrative'
import AddModal from './AddModal'
export default class Index extends Component {
    state = {
        tableList: [],
        visible:false
    }
    componentDidMount() {
        this.loadData()
    }
    loadData = () => {
        getAdministrative().then(res => {
            this.setState({
                tableList: res.data.list
            })
        })
    }
    setRole=(record)=>{
        this.setState({
            visible:true
        })
    }
    changeVisible=(visible)=>{
        this.setState({
            visible
        })
    }
    render() {
        const { tableList ,visible} = this.state
        const columns = [
            {
                title: '序号',
                dataIndex: 'id',
                key: 'id', align: 'center'

            },
            {
                title: '手机号',
                dataIndex: 'tel',
                key: 'tel', align: 'center'
            },
            {
                title: '昵称',
                dataIndex: 'nickname',
                key: 'nickname', align: 'center'
            },
            {
                title: '角色',
                key: 'role',
                dataIndex: 'role',
                align: 'center'
            },
            {
                title: '操作',
                key: 'operation',
                render: (text,record) => (
                    <Button type='primary' onClick={()=>this.setRole(record)}>设置权限</Button>
                ),
                align: 'center'
            },
        ];
        return (
            <div>

                <Row>
                    <Col span={12}>
                        <Card className='mt ml ' title='员工信息'>
                            <Table columns={columns} dataSource={tableList} pagination={false} rowKey={record => record.id} scroll={{ y: 700 }} >
                            </Table>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card className='mt ml'>
                            <Descriptions bordered>
                                <Descriptions.Item label="销售冠军">万名军</Descriptions.Item>
                                <Descriptions.Item label="课时冠军">烟绮琦</Descriptions.Item>
                                <Descriptions.Item label="金牌咨询师">果实云</Descriptions.Item>
                                <Descriptions.Item label="统计起始时间">2018-04-24 18:00:00</Descriptions.Item>
                                <Descriptions.Item label="统计截止时间" span={2}>
                                    2019-04-24 18:00:00
                                </Descriptions.Item>
                                <Descriptions.Item label="本月盈亏" span={3}>
                                    <Badge status="processing" text="盈利320万元" />
                                </Descriptions.Item>
                                <Descriptions.Item label="收益科目">数学</Descriptions.Item>
                                <Descriptions.Item label="较差科目">语文</Descriptions.Item>
                                <Descriptions.Item label="进步科目">数学</Descriptions.Item>
                                <Descriptions.Item label="备注">
                                    综合趋势有所下降，主要受国家政策影响，老师离职率较高，需要管控人员走动，数学是主要盈利科目，英语报名人数较少，英语老师有空闲，排班不满的情况。
                                </Descriptions.Item>

                            </Descriptions>
                        </Card>
                    </Col>
                </Row>
                <AddModal visible={visible} changeVisible={this.changeVisible} reload={this.loadData}></AddModal>
            </div>
        )
    }
}
