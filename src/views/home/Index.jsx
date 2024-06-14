import React, { Component } from 'react'
import { Col, Row, Card, Tabs, Timeline } from 'antd'
import { InfoCircleOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import request from '@/utils/request'
import * as echarts from 'echarts';
import style from './index.module.css'

export default class Index extends Component {
    state = {
        barData: {},
        saleList: [],
        lineData: {},
        viewList: [],
        operateList: [],
        pieData: []
    }
    componentDidMount() {
        this.drawBar()
        this.getSaleRank()
        this.getViewRank()
        this.getOperate()
        this.drawPie()
    }
    //绘制柱状图
    drawBar = () => {
        request('/user/bar').then(res => {
            const xData = []
            const yData = []
            for (let key in res.data) {
                xData.push(key)
                yData.push(res.data[key])
            }
            this.setState({
                barData: { xData, yData }
            })
            //上面刚修改了state，下面就取值，因为这里的setState是同步的
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(this.myRef);
            //配置项
            const option = {
                xAxis: {
                    type: 'category',
                    data: this.state.barData.xData
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        type: 'bar',
                        data: this.state.barData.yData
                    }
                ]
            };
            // 绘制图表
            myChart.setOption(option);
        })
    }
    //绘制折线图
    drawLine = () => {
        request('/user/line').then(res => {
            const { data } = res
            const xData = []
            const yData = []
            data.forEach(item => {
                xData.push(item.month)
                yData.push(item.number)
            })
            // this.setState({
            //     lineData: { xData, yData }
            // })
            let myChart = echarts.init(this.myRef2);
            const option = {
                xAxis: {
                    type: 'category',
                    data: xData
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        type: 'line',
                        data: yData,
                        smooth: true
                    }
                ]
            };
            myChart.setOption(option);
        })
    }
    //绘制饼图
    drawPie = () => {
        request('/user/pie').then(res => {
            const { data } = res
            let myChart = echarts.init(this.myRef3);
            const option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '10%',
                    left: 'center'
                },
                series: [
                    {
                        center:['50%','65%'],
                        type: 'pie',
                        radius: ['35%', '55%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 40,
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data
                    }
                ]
            };
            myChart.setOption(option)
        })
    }
    //请求获取校区销售额排名
    getSaleRank = () => {
        request('/user/saleRank').then(res => {
            this.setState({
                saleList: res.data
            })
        })
    }
    //请求获取校区访问量排名
    getViewRank = () => {
        request('/user/saleRank').then(res => {
            this.setState({
                viewList: res.data
            })
        })
    }
    //显示校区销售额排名
    saleRank = () => {
        const { saleList } = this.state
        return saleList.map((item, index) => {
            const { campus, sales } = item
            return (<div key={index} className={`mb ${style.row}`}>
                <div className={`${style.rank} ${index < 3 ? style.highlight : null}`}>
                    {index + 1}
                </div>
                <div>{campus}</div>
                <div className={style.sales}>{sales.toLocaleString()}</div>
            </div>)
        })
    }
    //显示校区访问量排名
    viewRank = () => {
        const { viewList } = this.state
        return viewList.map((item, index) => {
            const { campus, sales } = item
            return (<div key={index} className={`mb ${style.row}`}>
                <div className={`${style.rank} ${index < 3 ? style.highlight : null}`}>
                    {index + 1}
                </div>
                <div>{campus}</div>
                {/* 想要每3位数字有,分隔，把数字转换为字符串显示toLocaleString() */}
                <div className={style.sales}>{sales.toLocaleString()}</div>
            </div>)
        })
    }
    //标签页切换
    onChange = (activeKey) => {
        activeKey === '1' ? this.drawBar() : this.drawLine()
    }
    //请求获取操作动态
    getOperate = () => {
        request('/user/operate').then(res => {
            this.setState({
                operateList: res.data
            })
        })
    }
    //渲染操作动态
    renderOperate = () => {
        const { operateList } = this.state
        return operateList.map((item, index) => {
            return (<Timeline.Item color={item.color} key={index} style={{paddingBottom:'10px'}}>
                <p className={style.operate} style={{marginBottom:'5px'}}>{item.content}</p>
                <p className={style.operate} style={{marginBottom:'5px'}}>{item.time}</p>
            </Timeline.Item>)
        })
    }
    render() {
        const sale = <div>
            <div style={{ fontSize: '12px' }}>
                <span className='fl'>总销售额</span>
                <span className='fr'><InfoCircleOutlined /></span>
                <div className="clear"></div>
            </div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', margin: '5px 0' }}>
                ￥1526560
            </div>
            <div style={{ fontSize: '12px' }}>周同比  12%<CaretUpOutlined style={{ color: 'green' }} />  日同比  18%<CaretDownOutlined style={{ color: 'red' }} /></div>
        </div>
        const view = <div>
            <div style={{ fontSize: '12px' }}>
                <span className='fl'>访问量</span>
                <span className='fr'><InfoCircleOutlined /></span>
                <div className="clear"></div>
            </div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', margin: '5px 0' }}>
                1128
            </div>
            <div style={{ fontSize: '12px' }}>周同比  12%<CaretUpOutlined style={{ color: 'green' }} />  日同比  12%<CaretDownOutlined style={{ color: 'red' }} /></div>
        </div>
        const pay = <div>
            <div style={{ fontSize: '12px' }}>
                <span className='fl'>支付笔数</span>
                <span className='fr'><InfoCircleOutlined /></span>
                <div className="clear"></div>
            </div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', margin: '5px 0' }}>
                337
            </div>
            <div style={{ fontSize: '12px' }}>周同比  3%<CaretUpOutlined style={{ color: 'green' }} />  日同比  12%<CaretDownOutlined style={{ color: 'red' }} /></div>
        </div>
        const student = <div>
            <div style={{ fontSize: '12px' }}>
                <span className='fl'>流失学员</span>
                <span className='fr'><InfoCircleOutlined /></span>
                <div className="clear"></div>
            </div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', margin: '5px 0' }}>
                52
            </div>
            <div style={{ fontSize: '12px' }}>周同比  4%<CaretUpOutlined style={{ color: 'green' }} />  日同比  8%<CaretDownOutlined style={{ color: 'red' }} /></div>
        </div>
        return (
            <div>
                <div>
                    <Row gutter={16} style={{ margin: '10px 5px' }}>
                        <Col span={6}>
                            <Card title={sale}>
                                <div style={{ fontSize: '12px' }}>日销售额￥122423</div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card title={view}>
                                <div style={{ fontSize: '12px' }}>日均访问量 78</div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card title={pay}>
                                <div style={{ fontSize: '12px' }}>转化率 74%</div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card title={student}>
                                <div style={{ fontSize: '12px' }}>流失最多科目：英语</div>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Card className='ml'>
                        <Tabs defaultActiveKey="1" onChange={this.onChange} destroyInactiveTabPane={true}>
                            <Tabs.TabPane tab="销售额" key="1">
                                <Row>
                                    <Col span={18}>
                                        <div ref={(a) => this.myRef = a} style={{ height: '300px' }}>
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <p className={style.saleRankTitle}>校区销售额排名</p>
                                        {this.saleRank()}
                                    </Col>
                                </Row>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="访问量" key="2">
                                <Row>
                                    <Col span={18}>
                                        <div ref={(a) => this.myRef2 = a} style={{ height: '300px' }}>
                                        </div>
                                    </Col>
                                    <Col span={6}>
                                        <p className={style.saleRankTitle}>校区访问量排名</p>
                                        {this.viewRank()}
                                    </Col>
                                </Row>
                            </Tabs.TabPane>
                        </Tabs>
                    </Card>
                </div>
                <div className='mt ml'>
                    <Row gutter={12}>
                        <Col span={12}>
                            <Card title='操作动态' headStyle={{ fontWeight: 'bold', fontSize: '14px'}}  >
                                <Timeline>
                                    {this.renderOperate()}
                                </Timeline>
                            </Card>
                        </Col>
                        <Col span={12} style={{display:'flex'}}>
                            <Card title='销售额类别占比' headStyle={{ fontWeight: 'bold', fontSize: '14px'}} style={{flex:1}}> 
                                <div ref={a => this.myRef3 = a} style={{ height: '300px'}}>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
