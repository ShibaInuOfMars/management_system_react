import React, {Component} from 'react';

import {Card, Breadcrumb} from 'antd';

import ReactEcharts from 'echarts-for-react';

// import {questionMsg} from './../../api/question-api';

// import store from "../../store";

import {connect} from 'react-redux';

class Bar extends Component {

    /*state = {
        questionInfo : []
    };*/

    componentDidMount() {
        // this._questionMsg();

        // 订阅数据更新
        /*store.subscribe(() => {
            this.forceUpdate();
        });*/
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

        // const {questionInfo} = this.state;

        // let data = store.getState().question_msg;
        // console.log(data);

        let data = this.props.question_msg;

        const title = (
            <Breadcrumb>
                <Breadcrumb.Item>各科题目数量统计</Breadcrumb.Item>
                <Breadcrumb.Item>柱状图</Breadcrumb.Item>
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

const mapStateToProps = (state) => {
    return {
        question_msg: state.question_msg
    };
};

export default connect(mapStateToProps, null)(Bar);