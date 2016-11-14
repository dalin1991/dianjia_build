const React = require('react');
const ReactDOM = require('react-dom');
let dateFormat = require('beyond-lib/lib/dateFormat');
let getStoreStatisInfo = require('../../remotes/public.js').getStoreStatisInfo;
require('./lib/index.less');
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cashierStatisList: [],
            salesStatisList: [],
            storeskuList: []
        }
    }

    componentDidMount() {
        getStoreStatisInfo().done(res=> {
            this.setState(old=> {
                old.cashierStatisList = res.cashierStatisList || [];
                old.salesStatisList = res.salesStatisList || [];
                old.storeskuList = res.storeskuList || [];
                return old
            }, ()=> {
                this.firstRender();
                this.secondRender();
                this.thirdRender();
            })
        })
    }

    firstRender() {
        let storeskuList = this.state.storeskuList;
        if (storeskuList.length < 1) {
            return
        }
        let valueList = [];
        let skuList = [];
        storeskuList.forEach(item=> {
            valueList.push(item.count);
            skuList.push(item.skuName);
        });

        let myChart = echarts.init(ReactDOM.findDOMNode(this.refs.firstView));
        let option = {
            title: {
                text: '本周畅销商品',
                padding: [20, 0, 20, 40]
            },
            tooltip: {},
            color: ['#ffd800'],
            backgroundColor: '#fff',
            grid: {
                top: 90,
                right: 40,
                bottom: 30,
                left: 40,
                width: 820,
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: skuList,
                    axisTick: {
                        alignWithLabel: true
                    },
                    name: '商品',
                    nameGap: 6,
                    axisLabel: {
                        formatter: function (data) {
                            return data.slice(0, 5) + "..."
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '周销量'
                }
            ],
            series: [
                {
                    name: "周销量",
                    type: 'bar',
                    barWidth: '30px',
                    data: valueList,
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#333'
                            }
                        }
                    },
                }
            ]
        };
        myChart.setOption(option);
    }

    secondRender() {
        let salesStatisList = this.state.salesStatisList;
        if (salesStatisList.length < 1) {
            return
        }
        let xList = [];
        let yList = [];
        salesStatisList.forEach(item=> {
            xList.push(dateFormat('yyyy-MM-dd', item.statTime));
            yList.push(item.totleSalesPrice)
        });

        let myChart = echarts.init(ReactDOM.findDOMNode(this.refs.secondView));
        let option = {
            tooltip: {trigger: 'axis'},
            title: {
                text: '本周销量统计',
                padding: [20, 0, 20, 40]
            },
            grid: {
                top: 90,
                right: 40,
                bottom: 30,
                left: 40,
                width: 350,
                containLabel: true
            },
            color: ['#ffd800'],
            backgroundColor: '#fff',
            xAxis: {
                type: 'category',
                data: xList,
                name: '时间'
            },
            yAxis: {
                type: 'value',
                name: '日销量'
            },
            series: [{
                name: '日销量',
                type: 'line',
                data: yList,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#fff9cf'
                        }, {
                            offset: 1,
                            color: '#fffef3'
                        }])
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: '#333'
                        }
                    }
                }
            }]
        };
        myChart.setOption(option);
    }

    thirdRender() {
        let cashierStatisList = this.state.cashierStatisList;
        if (cashierStatisList.length < 1) {
            return
        }
        let xList = [];
        let yList = [];
        cashierStatisList.forEach(item=> {
            let str = item.cashierName.slice(0, 5) + ' ' + item.percentage + '%';
            xList.push({name: str, value: item.cashiercollectMoney});
            yList.push(str)
        });

        let myChart = echarts.init(ReactDOM.findDOMNode(this.refs.thirdView));
        let option = {
            title: {
                text: '收银员业绩对比',
                padding: [20, 0, 20, 40]
            },
            grid: {
                top: 90,
                right: 40,
                bottom: 20,
                left: 40,
                containLabel: true
            },
            backgroundColor: '#fff',
            color: ['#ffd800', '#bee929', '#24e2d7', '#27a2e1', '#7444ee', '#c536df', '#ed1b3b', '#f37c34'],
            tooltip: {
                trigger: 'item',
                formatter: "{a} {b}: {c}"
            },
            legend: {
                orient: 'vertical',
                bottom: 'center',
                right: 20,
                left: 290,
                data: yList
            },
            series: [
                {
                    name: '业绩',
                    type: 'pie',
                    center: ['35%', '55%'],
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: xList
                }
            ]
        };
        myChart.setOption(option);
    }

    render() {
        return (
            <div>
                <div ref="firstView"
                     className="chart-panel"
                     style={{width: 932, height: 465, lineHeight: '405px'}}>
                    <h3 className="chart-title">本周畅销商品</h3>
                    暂无数据
                </div>
                <div className="clearfix mgt30">
                    <div ref="secondView"
                         className="fl mgr30 chart-panel"
                         style={{width: 464, height: 310, lineHeight: '250px'}}>
                        <h3 className="chart-title">本周销量统计</h3>
                        暂无数据
                    </div>
                    <div ref="thirdView"
                         className="fl chart-panel"
                         style={{width: 434, height: 310, lineHeight: '250px'}}>
                        <h3 className="chart-title">收银员业绩对比</h3>
                        暂无数据
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = Index;
let body = document.querySelector('.content');

if (body) {
    ReactDOM.render(<Index/>, body);
}