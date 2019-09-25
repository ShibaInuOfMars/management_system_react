import React, {Component} from 'react';

import './category.less';

import {getMenuListWithParentID} from './../../api/sider-api';

import { Card, Table, Icon, Button, Divider, Breadcrumb  } from 'antd';
const {Item} = Breadcrumb;

export default class Category extends Component {

    state = {
        dataSource: [],
        currentParent: {} // 存放当前子菜单的父菜单
    };

    columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center'
        },
        {
            title: '菜单名称',
            dataIndex: 'title',
            key: 'title',
            align: 'center'
        },
        {
            title: '菜单路由',
            dataIndex: '_key',
            key: '_key',
            align: 'center'
        },
        {
            title: '菜单图标',
            dataIndex: 'icon',
            render: (text, record, index) => {
                // console.log(text);
                // console.log(record);

                return (
                    <span>
                        <Icon type={text}></Icon> = <span>{text}</span>
                    </span>
                )
            },
            key: 'icon',
            align: 'center'
        },
        {
            title: '操作',
            render: (text, record, index) => {
                // console.log(text);
                // console.log(record);

                return (
                    <span>
                        {
                            this.state.currentParent.parentID !== 0 ? (<span><Button onClick={() => this._showChildrenMenu(record)}>查看子菜单</Button><Divider type="vertical" /></span>) : ''
                        }

                        <Button>编辑</Button>
                        <Divider type="vertical" />
                        <Button>删除</Button>
                    </span>
                )
            },
            key: 'operation',
            width: 400,
            align: 'center'
        }
    ];

    componentDidMount() {
        this._showMenusWithParentID();
    }

    // 根据parentID查询一级菜单还是二级菜单
    _showMenusWithParentID = async (parentID = 0) => {
        if (parentID ===0 ) {
            // 清空父菜单对象
            this.setState({
                currentParent: {}
            });
        }

        let res = await getMenuListWithParentID(parentID);
        if (res.status === 0) {
            this.setState({
                dataSource : res.data
            });
        }
    };

    // 显示二级菜单
    _showChildrenMenu(pMenu) {
        this.setState({
            currentParent: pMenu
        });

        this._showMenusWithParentID(pMenu.id);
    }

    render() {
        const {dataSource, currentParent} = this.state;

        let title =(
            <Breadcrumb>
                <Item onClick={() => this._showMenusWithParentID(0)} style={{cursor: "pointer"}}>
                    一级菜单
                </Item>
                {
                    currentParent.title ? <Item>{currentParent.title}</Item> : ''
                }
            </Breadcrumb>
        );

        return (
            <Card
                title={title}
                extra={<Button type='primary'>添加</Button>}
                className="categoryWrapper"
            >
                <Table
                    dataSource={dataSource}
                    columns={this.columns}
                    bordered
                    rowKey="id"
                    pagination={{
                        defaultPageSize: 3,
                        showQuickJumper: true
                    }}
                />
            </Card>
        );
    }
}