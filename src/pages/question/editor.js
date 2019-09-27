import React, {Component} from 'react';

// 引入编辑器组件
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';

export default class EditorR extends Component {

    state = {
        // 创建一个空的editorState作为初始值
        editorState: BraftEditor.createEditorState(this.props.value)
    };

    _handleEditorChange = (editorState) => {
        this.setState({ editorState });
    };

    // 供外界获取到内容的方法
    _getContent = () => {
        return this.state.editorState.toHTML();
    };

    render() {
        const { editorState } = this.state;

        return (
            <BraftEditor
                value={editorState}
                onChange={this._handleEditorChange}
                style={{border: '1px solid #d1d1d1'}}
            />
        );
    }
}