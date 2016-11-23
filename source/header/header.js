/**
 * Created by BG236557 on 2016/5/25.
 */
const React = require('react');
const ReactDOM = require('react-dom');
const storage = require('beyond-lib/lib/storage');
const {logout} = require('../remotes/public.js');
const {Dropdown} = require('el-table');
require('./lib/header.less');

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick(item) {
        if (item === '退出') {
            logout().done(()=> {
                location.href = '/login';
            })
        }
    }

    render() {
        return (
            <div className="container clearfix">
                <div className="fl">
                    <div className="logo"></div>
                    <span className="font24">POS后台管理系统</span>
                </div>
                <div className="fr">
                    <Dropdown list={[{label: '店铺信息', href: "/shopInformation"}, '退出']}
                              onClick={this.handleClick.bind(this)}>
                        <span className="user_icon"/>
                        <span className="mgr10">您好，{storage.getCookie('username') || ''}</span>
                    </Dropdown>
                </div>
            </div>
        )
    }
}

module.exports = Header;

try {
    ReactDOM.render(<Header />, document.querySelector('.header'));
} catch (e) {
}