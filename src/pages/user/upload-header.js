import React, {Component} from 'react';

import {Upload, Modal, Icon, message} from 'antd';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export default class UploadHeader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [],
        };

        if (props.headerImg) {
            this.state = this.state = {
                previewVisible: false,
                previewImage: '',
                fileList: [
                    {
                        uid: '-1',
                        name: props.headerImg,
                        status: 'done',
                        url: "http://localhost:5000/userImg/" + props.headerImg,
                    },
                ],
            };
        }
    }

    // 获取当前照片墙的所有图片名称
    _getImageName = () => {
        if (this.state.fileList.length > 0) {
            return this.state.fileList[0].name;
        }

        return '';
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
    handleChange = ({ file, fileList, event }) => {
        // console.log(file);
        // console.log(fileList);

        // 判断图片是否上传完成
        if (file && file.status === 'done'){
            // 取得服务端返回的数据
            let res = file.response;
            if (res.status === 0) { // 上传成功
                message.success('上传成功');
                let name = res.data.name;
                let url = res.data.url;

                // 修改最后一项的数据
                fileList[fileList.length - 1].name = name;
                fileList[fileList.length - 1].url = url;
            } else {
                message.error('上传失败');
            }
        }

        this.setState({
            fileList
        });
    };

    render() {

        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        return (
            <div>
                <Upload
                    accept="image/*"
                    action="/api/uploadImg"
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
            </div>
        );
    }
}