import React, {Component} from 'react';

import {getLoginInfo} from './../../api/user-api';

import {Form, Input, Button, Upload, Icon, Modal} from 'antd';
const {Item} = Form;

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class User extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [
            {
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }
        ],
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

    // 取消预览图片
    handleCancel = () => this.setState({ previewVisible: false });

    // 预览图片展示（url或base64编码）
    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    // 添加图片
    handleChange = ({ fileList }) => this.setState({ fileList });

    render() {
        const {getFieldDecorator} = this.props.form;

        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        let user = getLoginInfo();
        console.log(user);

        return (
            <Form {...this.formItemLayout}>
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
                    <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                    >
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </Item>
                <Item {...this.tailFormItemLayout}>
                    <Button type="danger">修改</Button>
                </Item>
            </Form>
        );
    }
}

export default Form.create()(User);