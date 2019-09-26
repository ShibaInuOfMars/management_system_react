import React, {Component} from 'react';

import { Modal, Form, Input, Select, message  } from 'antd';
import {addOneMenu, getMenuListWithParentID} from "../../api/sider-api";
const {Item} = Form;
const {Option} = Select;

class AddMenu extends Component{

    state = {
        parentMenu: []
    };

    componentDidMount() {
        this._getParentMenu();
    }

    // 获取所有的一级菜单
    _getParentMenu = async () => {
        let res = await getMenuListWithParentID();
        if (res.status === 0) {
            // console.log(res.data);
            this.setState({
                parentMenu: res.data.map(item => {
                    return {id: item.id, title: item.title}
                })
            });
        }
    };

    // 确认添加
    _confimSubmit = () => {
        // console.log(this.props);
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let {parentID, title, icon, _key} = values;

                let res = await addOneMenu(title, icon, _key, parentID);
                // console.log(res);

                if (res.status === 0) {
                    message.success(res.msg);

                    // 刷新界面
                    window.location.reload();
                } else {
                    message.error('添加失败');
                }
            }
        });
    };

    render() {
        const {visible, _handleCancel} = this.props;
        const {getFieldDecorator} = this.props.form;
        const {parentMenu} = this.state;

        return (
            <div>
                <Modal
                    title="添加菜单"
                    visible={visible}
                    onOk={this._confimSubmit}
                    onCancel={_handleCancel}
                    okText="添加"
                    cancelText="取消"
                >
                    <Form>
                        <Item>
                            {
                                getFieldDecorator('parentID', {
                                    initialValue: 0
                                })(
                                    <Select placeholder='选择一个分类'>
                                        <Option value={0}>一级菜单</Option>
                                        {
                                            parentMenu.length > 0 ? (
                                                parentMenu.map(item => {
                                                    return <Option value={item.id} key='id'>{item.title}</Option>
                                                })
                                            ) : ''
                                        }
                                    </Select>
                                )
                            }
                        </Item>
                        <Item>
                            {
                                getFieldDecorator('title', {
                                    rules: [
                                        {required: true, message: '此项不能为空'}
                                    ]
                                })(
                                    <Input placeholder='请填写标题' />
                                )
                            }
                        </Item>
                        <Item>
                            {
                                getFieldDecorator('icon', {
                                    rules: [
                                        {required: true, message: '此项不能为空'}
                                    ]
                                })(
                                    <Input placeholder='请填写图标名称' />
                                )
                            }
                        </Item>
                        <Item>
                            {
                                getFieldDecorator('_key', {
                                    rules: [
                                        {required: true, message: '此项不能为空'}
                                    ]
                                })(
                                    <Input placeholder='请填写路由' />
                                )
                            }
                        </Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Form.create()(AddMenu);