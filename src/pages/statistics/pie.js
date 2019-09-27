import React, {Component} from 'react';

import {Card, Breadcrumb} from 'antd';

export default class Pie extends Component {
    render() {

        const title = (
            <Breadcrumb>
                <Breadcrumb.Item>统计</Breadcrumb.Item>
                <Breadcrumb.Item>饼图</Breadcrumb.Item>
            </Breadcrumb>
        );

        return (
            <div>
                <Card title={title}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </div>
        );
    }
}