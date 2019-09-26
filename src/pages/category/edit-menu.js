import React, {Component} from 'react';

import { Modal, Form, Input, Select  } from 'antd';
import {getMenuListWithParentID} from "../../api/sider-api";
const {Item} = Form;
const {Option} = Select;

class EditMenu extends Component{

    state = {
        parentMenu: []
    };

    componentDidMount() {
        this._getParentMenu();
    }

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

    render() {
        const {visible, _handleCancel} = this.props;
        const {getFieldDecorator} = this.props.form;
        const {parentMenu} = this.state;

        return (
            <div>
                <Modal
                    title="添加菜单"
                    visible={visible}
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

export default Form.create()(EditMenu);