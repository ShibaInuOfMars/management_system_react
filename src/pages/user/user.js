import React, {Component} from 'react';

import {getLoginInfo} from './../../api/user-api';

import {updateInfo, saveLoginInfo} from './../../api/user-api';

import UploadHeader from './upload-header';

import {Form, Input, Button, message} from 'antd';
const {Item} = Form;

class User extends Component {
    constructor(props) {
        super(props);

        this.uploadImg = React.createRef();
    }

    state = {
        imageName: ''
    };

    formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 4 },
        },
    };

    tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    // 提交表单
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const {id, account, password, userName} = values;
                const headerImg = this.uploadImg.current._getImageName();

                let res = await updateInfo('/update', id, account, password, userName, headerImg);

                if (res.status === 0) {
                    message.success('更新成功');
                    // console.log(res);

                    // 更新本地数据
                    saveLoginInfo(res.data[0]);
                } else {
                    message.error('更新失败');
                }
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        let user = getLoginInfo();
        // console.log(user);

        return (
            <Form onSubmit={this.handleSubmit} {...this.formItemLayout}>
                <Item>
                    {
                        getFieldDecorator('id', {
                            initialValue: user.id,
                            rules: [
                                {required: true, message: '此项不能为空'}
                            ]
                        })(<Input type="hidden" disabled={true} />)
                    }
                </Item>
                <Item label="账号：">
                    {
                        getFieldDecorator('account', {
                            initialValue: user.account,
                            rules: [
                                {required: true, message: '账号不能为空'}
                            ]
                        })(<Input disabled={true} />)
                    }
                </Item>
                <Item label="密码：">
                    {
                        getFieldDecorator('password', {
                            initialValue: user.password,
                            rules: [
                                {required: true, message: '密码不能为空'},
                                {min: 5, message: '最少输入5位'},
                                {max: 16, message: '最多输入16位'}
                            ]
                        })(<Input placeholder="请输入密码" />)
                    }
                </Item>
                <Item label="用户名：">
                    {
                        getFieldDecorator('userName', {
                            initialValue: user.userName,
                            rules: [
                                {required: true, message: '用户名不能为空'}
                            ]
                        })(<Input placeholder="请输入用户名" />)
                    }
                </Item>
                <Item label="头像：">
                    <UploadHeader ref={this.uploadImg} headerImg={user.headerImg} />
                </Item>
                <Item {...this.tailFormItemLayout}>
                    <Button htmlType="submit" type="danger">修改</Button>
                </Item>
            </Form>
        );
    }
}

export default Form.create()(User);