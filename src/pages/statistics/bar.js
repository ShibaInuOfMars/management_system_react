import React, {Component} from 'react';

import {Card, Breadcrumb} from 'antd';

import ReactEcharts from 'echarts-for-react';

import {questionMsg} from './../../api/question-api';

export default class Bar extends Component {

    state = {
        questionInfo : []
    };

    componentDidMount() {
        this._questionMsg();
    }

    _questionMsg = async () => {
        let res = await questionMsg();
        // console.log(res);
        if (res.status === 0) {
            this.setState({
                questionInfo: res.data
            });
        }
    };

    /*option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
        }]
    };*/

    getOption = (data) => {
        return {
            xAxis: {
                type: 'category',
                data: data.map(item => item.title)
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: data.map(item => item.question_count),
                type: 'bar'
            }]
        };
    };

    render() {

        const {questionInfo} = this.state;

        const title = (
            <Breadcrumb>
                <Breadcrumb.Item>各科题目数量统计</Breadcrumb.Item>
                <Breadcrumb.Item>柱状图</Breadcrumb.Item>
            </Breadcrumb>
        );

        return (
            <div>
                <Card title={title}>
                    <ReactEcharts option={this.getOption(questionInfo)} />
                </Card>
            </div>
        );
    }
}