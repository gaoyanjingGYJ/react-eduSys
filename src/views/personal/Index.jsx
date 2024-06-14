import React, { Component } from 'react'
import { Card, Row, Col, Divider, Badge, Calendar, List } from 'antd'
import { connect } from 'react-redux'
import style from './index.module.css'
import { CodepenOutlined } from '@ant-design/icons';

const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];
class Index extends Component {
    greeting = () => {
        const { nickname } = this.props.msg.loginReducer
        const date = new Date().getHours()
        if (date >= 0 && date < 6) {
            return `凌晨好，${nickname}，抓紧时间休息吧！`
        } else if (date >= 6 && date < 12) {
            return `上午好，${nickname}，准备吃什么呢？`
        } else if (date >= 12 && date < 18) {
            return `下午好，${nickname}，努力工作吧！`
        } else {
            return `晚上好，${nickname}，下班了要开心啊！`
        }
    }

    getListData = (value) => {
        let listData = [];

        switch (value.date()) {
            case 8:
                listData = [
                    {
                        type: 'warning',
                        content: '王浩妈妈约回访',
                    },
                    {
                        type: 'success',
                        content: '刘立签合同',
                    },
                ];
                break;
            case 10:
                listData = [
                    {
                        type: 'warning',
                        content: '写月度总结',
                    },
                    {
                        type: 'success',
                        content: '发工资',
                    },
                    {
                        type: 'error',
                        content: '例会',
                    },
                ];
                break;
            case 15:
                listData = [
                    {
                        type: 'warning',
                        content: '还房贷',
                    },
                    {
                        type: 'success',
                        content: '下午去北京出差',
                    },
                    {
                        type: 'error',
                        content: '去财务报销发票',
                    },
                    {
                        type: 'error',
                        content: '招聘，新人培训',
                    }
                ];
                break;
            default:
        }
        return listData;
    };

    dateCellRender = (value) => {
        const listData = this.getListData(value);
        return (
            <ul className={style.events}>
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} style={{ fontSize: '10px' }} />
                    </li>
                ))}
            </ul>
        );
    };

    getMonthData = (value) => {
        console.log('mounth', value.month())
        if (value.month() === 8) {
            return 1314;
        } else if (value.month() === 11) {
            return 20
        }
    };

    monthCellRender = (value) => {
        console.log(11, value)
        const num = this.getMonthData(value);
        return num ? (
            <div className={style.notesMonth}>
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    render() {
        return (
            <div>
                <Card className='mt ml'>
                    <Row>
                        <Col span={8}>
                            <p className={style.greet}>{this.greeting()}</p>
                            <p className={style.identity}>课程咨询师 | 禾苗教育-IT技术部-教育管理系统后台</p>

                        </Col>
                        <Col span={8} offset={8}>
                            <Row className='tac'>
                                <Col span={6}>
                                    <p className={style.title}>转化学员数</p>
                                    <p className={style.number}>56</p>
                                </Col>
                                <Col span={3}>
                                    <Divider type='vertical' style={{ height: '100%' }} ></Divider>
                                </Col>
                                <Col span={6}>
                                    <p className={style.title}>团队排名</p>
                                    <p className={style.number}>5/23</p>
                                </Col>
                                <Col span={3}>
                                    <Divider type='vertical' style={{ height: '100%' }}></Divider>
                                </Col>
                                <Col span={6}>
                                    <p className={style.title}>本月目标</p>
                                    <p className={style.number}>2345</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
                <Card className='mt ml'>
                    <Row className='tac'>
                        <Col span={8}>
                            <p className={style.title}>我的待办</p>
                            <p className={style.item}>8个任务</p>
                        </Col>
                        <Col span={8}>
                            <p className={style.title}>本周任务平均处理时间</p>
                            <p className={style.item}>30分钟</p>
                        </Col>
                        <Col span={8}>
                            <p className={style.title}>本周对接学员数</p>
                            <p className={style.item}>33个</p>
                        </Col>
                    </Row>
                </Card>
                <div className='mt ml'>
                    <Row gutter={12}>
                        <Col span={18}>
                            <Card>
                                <Calendar dateCellRender={this.dateCellRender} monthCellRender={this.monthCellRender} />
                            </Card>
                        </Col>
                        <Col span={6} style={{ display: 'flex', flexDirection: 'column' }}>
                            <Row>
                                <Col span={24}>
                                    <Card>
                                        <div style={{ fontWeight: 'bold' }}>操作面板</div>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    <Card>
                                        <div>操作一</div>
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card>
                                        <div>操作二</div>
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card>
                                        <div>操作三</div>
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card>
                                        <div>操作四</div>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    <Card>
                                        <div>操作五</div>
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card>
                                        <div>操作六</div>
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card>
                                        <div>操作七</div>
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card>
                                        <div>操作八</div>
                                    </Card>
                                </Col>
                            </Row>
                            <Row style={{ flex: 1, display: 'flex' }} className='mt'>
                                <Col span={24} style={{ flex: 1, display: 'flex' }}>
                                    <Card style={{ flex: 1, }}>
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={data}
                                            size="small"
                                            renderItem={(item) => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        avatar={<CodepenOutlined />}
                                                        title={item.title}
                                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
export default connect(
    state => ({ msg: state })
)(Index)