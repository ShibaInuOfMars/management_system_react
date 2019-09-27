import React, {Component} from 'react';

import {getAllCourse} from  './../../api/sider-api';

import {Card, Breadcrumb, Button, Form, Input, Select} from 'antd';
const {Item} = Breadcrumb;
const {TextArea} = Input;
const {Option} = Select;

class OperationPanel extends Component {

    state = {
        currentCourse: {},
        editQuestion: {},
        course: []
    };

    componentDidMount() {
        let locationState = this.props.location.state;

        if (locationState.editQuestion) {
            this.setState({
                currentCourse: locationState.currentCourse,
                editQuestion: locationState.editQuestion
            });
        } else {
            this.setState({
                currentCourse: locationState.currentCourse
            });
        }

        this._getAllCourse();
    }

    // 获取所有课程分类
    _getAllCourse = async () => {
        let res = await getAllCourse();
        if (res.status === 0) {
            this.setState({
                course: res.data
            });
        }
    };

    formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 8 },
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

    render() {

        const {currentCourse, editQuestion, course} = this.state;

        const {getFieldDecorator} = this.props.form;

        let courseTitle = currentCourse.title;

        let type = editQuestion.id ? '编辑' : '添加';

        let title = (
            <Breadcrumb>
                <Item><Button>返回</Button></Item>
                <Item>{courseTitle}</Item>
                <Item>{type}</Item>
            </Breadcrumb>
        );

        return (
            <div>
                <Card
                    title={title}
                >
                    <Form {...this.formItemLayout}>
                        <Form.Item label='所属课程'>
                            {
                                getFieldDecorator('categoryID', {
                                    rules: [
                                        {required: true, message: '此项必须选择一个'}
                                    ],
                                    initialValue: currentCourse.id
                                })(
                                    <Select>
                                        {
                                            course.map(item => {
                                                return <Option value={item.id} key={item.id}>{item.title}</Option>
                                            })
                                        }
                                    </Select>
                                )
                            }
                        </Form.Item>
                        <Form.Item label='题目标题'>
                            {
                                getFieldDecorator('title', {
                                    rules: [
                                        {required: true, message: '此项必须填写'}
                                    ],
                                    initialValue: editQuestion.title || ''
                                })(
                                    <Input placeholder='请填写题目标题' />
                                )
                            }
                        </Form.Item>
                        <Form.Item label='题目内容'>
                            {
                                getFieldDecorator('content', {
                                    rules: [
                                        {required: true, message: '此项必须选择一个'}
                                    ],
                                    initialValue: editQuestion.content || ''
                                })(
                                    <TextArea  placeholder='请填写题目内容' />
                                )
                            }
                        </Form.Item>
                        <Form.Item label='题目答案'>
                            {
                                getFieldDecorator('answer', {
                                    rules: [
                                        {required: true, message: '此项必须选择一个'}
                                    ],
                                    initialValue: editQuestion.answer || ''
                                })(
                                    <TextArea  placeholder='请填写题目答案' />
                                )
                            }
                        </Form.Item>
                        <Form.Item {...this.tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">保存</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Form.create()(OperationPanel);