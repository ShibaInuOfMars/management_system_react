import React, {Component} from 'react';

import {Card, Breadcrumb} from 'antd';
const {Item} = Breadcrumb;

class OperationPanel extends Component {

    state = {
        currentCourse: {},
        eidtQuestion: {}
    };

    componentDidMount() {
        let locationState = this.props.location.state;
    }

    render() {

        let title = (
            <Breadcrumb>
                <Item>Home</Item>
                <Item>
                    <a href="">Application Center</a>
                </Item>
                <Item>
                    <a href="">Application List</a>
                </Item>
                <Item>An Application</Item>
            </Breadcrumb>
        );

        return (
            <div>
                <Card
                    title="xxx"
                >

                </Card>
            </div>
        );
    }
}

export default OperationPanel;