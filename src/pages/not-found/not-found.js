import React, {Component} from 'react';
import {Button} from 'antd';
import './not-found.less';

export default class NotFound extends Component {

    _backHome = () => {
        this.props.history.replace('/home');
    };

    render() {
        return (
            <div className='not-found'>
                <div>
                    <Button type='primary' onClick={this._backHome} className={"backHome"}>
                        回到首页
                    </Button>
                </div>
            </div>
        )
    }
}
