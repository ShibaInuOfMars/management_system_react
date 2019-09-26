import React, {Component} from 'react';

import { Modal, Form, Input, Select, message } from 'antd';
import {getMenuListWithParentID, updateMenu} from "../../api/sider-api";
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

    // 确认更新菜单
    _confirmUpdateMenu = () => {
        // console.log(111);
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let {parentID, title, icon, _key} = values;

                let res = await updateMenu(this.props.editMenu.id, title, icon, _key, parentID);
                console.log(res);

                if (res.status === 0) {
                    message.success('修改成功');

                    // 刷新界面
                    window.location.reload();
                } else {
                    message.error('修改失败');
                }
            }
        });
    };

    render() {
        const {visible, _handleCancel, editMenu} = this.props;
        const {getFieldDecorator} = this.props.form;
        const {parentMenu} = this.state;

        return (
            <div>
                <Modal
                    title="添加菜单"
                    visible={visible}
                    onCancel={_handleCancel}
                    okText="更新"
                    cancelText="取消"
                    onOk={this._confirmUpdateMenu}
                >
                    <Form>
                        <Item>
                            {
                                getFieldDecorator('parentID', {
                                    initialValue: editMenu.parentID
                                })(
                                    <Select placeholder='选择一个分类'>
                                        <Option value={0}>一级菜单</Option>
                                        {
                                            parentMenu.length > 0 ? (
                                                parentMenu.map(item => {
                                                    if (item.title === editMenu.title) return '';
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
                                    initialValue: editMenu.title,
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
                                    initialValue: editMenu.icon,
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
                                    initialValue: editMenu._key,
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