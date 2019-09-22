import React, {Component} from 'react';

// 动态粒子特效
import Particles from 'react-particles-js';

// 登录界面的样式
import './login.less';

// 图片（必须先引入才能使用）
import loginLogo from './../../static/images/login-logo.jpg';

// 登录
import {reqLogin} from './../../api/user-api';

// 存储到本地
import {saveLoginInfo} from './../../utils/user-tool';

// antd
import {Form, Icon, Input, Button, message} from 'antd';
let {Item} = Form;

class Login extends Component {

    state = {
        particlesParams: {
            "particles": {
                "number": {
                    "value": 60,
                    "density": {
                        "enable": true,
                        "value_area": 1000
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                    "image": {
                        "src": "img/github.svg",
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 5,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 30,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 200,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 6,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true,
            "config_demo": {
                "hide_card": false,
                "background_color": "#b61924",
                "background_image": "",
                "background_position": "50% 50%",
                "background_repeat": "no-repeat",
                "background_size": "cover"
            }
        }
    };

    // 点击登录按钮触发的函数
    _handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);

                // 1. 发送登录请求
                const {account, password} = values;
                let res = await reqLogin('/login', {account, password});
                if (res.status === 0) { // 验证成功
                    // console.log(res);
                    // 2. 将数据存储到本地
                    message.success('登录成功');
                    saveLoginInfo(res.data[0]);

                    // 3. 跳转到主页
                    this.props.history.replace('/');
                } else { // 验证失败
                    message.error(res.msg);
                }
            }
        });
    };

    render() {

        // 粒子特效参数
        const {particlesParams} = this.state;

        // 用于和表单进行双向绑定
        const {getFieldDecorator} = this.props.form;

        return (
            <div className="loginWrapper">
                {/* 粒子特效 */}
                <Particles params={particlesParams}/>
                {/* 登录面板 */}
                <div className="loginPanel">
                    <div className="loginTop">
                        <img src={loginLogo} alt="动感超人"/>
                        <span>动感-刷题后台管理系统</span>
                    </div>
                    <div className="loginForm">
                        <Form onSubmit={this._handleSubmit} className="login-form">
                            <Item>
                                {
                                    getFieldDecorator('account', {
                                        // 输入的规则，key是固定的
                                        rules: [
                                            {required: true, message: '请输入账号！'}
                                        ]
                                    })(<Input
                                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        placeholder="Username"
                                    />)
                                }
                            </Item>
                            <Item>
                                {
                                    getFieldDecorator('password', {
                                        rules: [
                                            {required: true, message: '请输入密码！'},
                                            {min: 5, message: '最少5个字符！'},
                                            {max: 16, message: '最少16个字符！'}
                                        ]
                                    })(<Input
                                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        type="password"
                                        placeholder="Password"
                                    />)
                                }
                            </Item>
                            <Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                            </Item>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

// 经 Form.create() 包装过的组件会自带 this.props.form 属性
export default Form.create({})(Login);


