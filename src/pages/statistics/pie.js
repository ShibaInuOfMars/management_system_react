import React, {Component} from 'react';

import {Card, Breadcrumb} from 'antd';

import ReactEcharts from 'echarts-for-react';

// import {questionMsg} from './../../api/question-api';

import store from './../../store/index';

export default class Pie extends Component {

    state = {
        // questionInfo : []
    };

    componentDidMount() {
        // this._questionMsg();

        store.subscribe(() => {
            this.forceUpdate();
        });
    }

    /*_questionMsg = async () => {
        let res = await questionMsg();
        // console.log(res);
        if (res.status === 0) {
            this.setState({
                questionInfo: res.data
            });
        }
    };*/

    getOption = (data) => {
        return  {
            title : {
                text: '各科题目数量',
                subtext: '动感数据库提供',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: data.map(item => item.title)
            },
            series : [
                {
                    name: '题目数量',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    /*
                    [
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1548, name:'搜索引擎'}
                    ]
                    * */
                    data: data.map(item => ({value: item.question_count, name: item.title})),
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
    };

    render() {

        // const {questionInfo} = this.state;

        let data = store.getState().question_msg;

        const title = (
            <Breadcrumb>
                <Breadcrumb.Item>各科题目数量统计</Breadcrumb.Item>
                <Breadcrumb.Item>饼图</Breadcrumb.Item>
            </Breadcrumb>
        );

        return (
            <div>
                <Card title={title}>
                    <ReactEcharts option={this.getOption(data)} />
                </Card>
            </div>
        );
    }
}