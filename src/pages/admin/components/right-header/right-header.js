import React, {Component} from 'react';

// 进行类型检查
import PropTypes from 'prop-types';

import './right-header.less';

// antd
import {Layout, Icon} from 'antd';
const {Header} = Layout;

export default class RightHeader extends Component {

    static propTypes = {
        collapsed: PropTypes.bool,
        toggle: PropTypes.func
    };

    render() {
        const {collapsed, toggle} = this.props;

        return (
            <Header className="adminHeader">
                <Icon
                    className="trigger"
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={toggle}
                />
            </Header>
        );
    }
}