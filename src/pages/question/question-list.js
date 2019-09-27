import React, {Component} from 'react';

import {getCurrentCategory, getQuestionList, delQuesiotn} from './../../api/question-api';

import {Card, Table, Button, Divider, Modal, message, Popconfirm} from 'antd';

export default class QuestionList extends Component {

    state = {
        currentCategoryDetail: {},
        dataSource: [],
        isLoading: true,
        pageSize: 0,
        totalSize: 0
    };

    columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center'
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            align: 'center'
        },
        {
            title: '内容',
            dataIndex: 'content',
            key: 'content',
            align: 'center'
        },
        {
            title: '所属课程',
            dataIndex: 'categoryTitle',
            key: 'categoryTitle',
            align: 'center'
        },
        {
            title: '操作',
            render: (text, record, index) => {
                // console.log(text);
                // console.log(record);

                return (
                    <span>
                        <Button onClick={() => this._showAnswer(record)}>查看答案</Button>
                        <Divider type="vertical"/>
                        <Button onClick={() => this._jumpToEdit(this.state.currentCategoryDetail, record)}>编辑</Button>
                        <Divider type="vertical"/>
                        <Popconfirm title="确定要删除吗？" okText="删除" cancelText="取消" okType="danger" onConfirm={() => this._deleteQuestion(record)}>
                            <Button type="danger">删除</Button>
                        </Popconfirm>
                    </span>
                )
            },
            key: 'operation',
            width: 400,
            align: 'center'
        }
    ];

    componentDidMount() {
        let pathname = this.props.location.pathname;
        this._getCurrentCategoryDetail(pathname);
    }

    // 属性每次发送变化时调用
    componentWillReceiveProps(nextProps, nextContext) {
        // console.log(nextProps);
        let pathname = nextProps.location.pathname;
        this._getCurrentCategoryDetail(pathname);
    }

    // 获取当前所在分类
    /*_getCurrentCategory = () => {
        let pathname = this.props.location.pathname;
        this.setState({
            currentCategory: pathname
        });
    };*/

    // 根据路径获取对应的题目分类
    _getCurrentCategoryDetail = async (path) => {
        let res = await getCurrentCategory(path);
        if (res.status === 0) {
            this.setState({
                currentCategoryDetail: res.data[0]
            });

            this._getQuestionList(res.data[0].id);
        }
    };

    _getQuestionList = async (id, pageNum = 1, pageSize = 3) => {
        this.setState({
            isLoading: true
        });

        // 根据当前所在的分类获取对应的题目列表
        let q_res = await getQuestionList(id, pageNum, pageSize);
        // console.log(q_res);

        if (q_res.status === 0) {
            this.setState({
                dataSource: q_res.data,
                pageSize: q_res.pageSize,
                totalSize: q_res.totalSize
            });
        }

        this.setState({
            isLoading: false
        });
    };

    // 查看答案
    _showAnswer = (question) => {
        Modal.info({
            title: question.title,
            content: question.answer,
            okText: '确认'
        });
    };

    // 删除问题
    _deleteQuestion = async (question) => {
        let res = await delQuesiotn(question.id);
        console.log(res);
        if (res.status === 0) {
            window.location.reload();

            message.success('删除成功');
        } else {
            message.error('删除失败');
        }
    };

    // 跳转到添加界面
    _jumpToAdd(currentCourse) {
        this.props.history.push('/question/operationPanel', {currentCourse})
    }

    // 跳转到编辑界面
    _jumpToEdit(currentCourse, editQuestion) {
        this.props.history.push('/question/operationPanel', {currentCourse, editQuestion})
    }

    render() {

        const {currentCategoryDetail, dataSource, isLoading, pageSize, totalSize} = this.state;

        return (
            <div>
                <Card
                    title={currentCategoryDetail.title}
                    extra={<Button type='primary' onClick={() => this._jumpToAdd(currentCategoryDetail)}>添加</Button>}
                >
                    <Table
                        dataSource={dataSource}
                        columns={this.columns}
                        bordered
                        rowKey="id"
                        pagination={{
                            pageSize: pageSize,
                            total: totalSize,
                            showQuickJumper: true,
                            onChange: (page, pageSize) => {
                                this._getQuestionList(currentCategoryDetail.id, page, pageSize);
                            }
                        }}
                        loading={isLoading}
                    />
                </Card>

                {/*<AddMenu visible={visible === 1} _handleCancel={this._handleCancel} />
                <EditMenu visible={visible === 2} _handleCancel={this._handleCancel} editMenu={editMenu} />*/}
            </div>
        );
    }
}