/**
 * Created by BG236557 on 2016/5/12.
 */
const React = require('react');
const menuList = require('../../property/menu.json');
require('@best/dianjia_alertModal');
require('@best/dianjia_alertModal/alertModal.css');
require('./lib/menu.less');
require('../lib/style/dianjia_publice.less');

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList: menuList.list,
            crtSubMenu: props.crtSubMenu
        };
    }

    mainMenuRender() {
        const {menuList, crtSubMenu} = this.state;
        const {crtClassName} = this.props;
        let mainMenu = [];
        menuList.forEach((item, index) => {
            const crtMenu = crtFilter(item, crtSubMenu);
            const url = prettyUrl(item.url);
            mainMenu.push(
                <li key={item.id}
                    className={crtSubMenu === url ? crtClassName : ''}>
                    <a href={url}
                       style={url !== 'javascript:;' ? {color: '#333'} : {}}>
                        <i className={`menu-icon glyphicon glyphicon-tags ${item.icon} ${crtMenu > -2 ? crtClassName : ''}`}/>
                        <span className="menu-text">{`  ${item.name}  `}</span>
                    </a>
                    <ul className="submenu" ref={"submenu" + index}>
                        {this.subMenuRender(item.children, crtMenu)}
                    </ul>
                </li>
            )
        });
        return mainMenu;
    }

    subMenuRender(data, crtMenu) {
        var subMenu = [];
        if (!data || data.length < 1) {
            return;
        }
        const {crtClassName} = this.props;
        data.forEach((item, index) => {
            const url = prettyUrl(item.url);
            subMenu.push(
                <li className={index === crtMenu ? crtClassName : ""} key={item.id}>
                    <a href={typeof url === "string" ? url : "javascript:;" }>
                        <span className="menu-text">{' ' + item.name + ' '}</span>
                    </a>
                </li>
            )
        });

        return subMenu;
    }

    render() {
        const {style, id, className, crtClassName} = this.props;
        const isIndex = this.state.crtSubMenu === '/index';
        return (
            <div style={style}>
                <ul id={id} className={className}>
                    <li className={`no-border ${isIndex ? crtClassName : ''}`}>
                        <a href="/index" style={{color: '#333'}}>
                            <i className={`menu-icon glyphicon glyphicon-bookmark index_icon ${isIndex ? crtClassName : ''}`}/>
                            <span className="menu-text"> 首页 </span>
                        </a>
                    </li>
                    {this.mainMenuRender()}
                </ul>
            </div>
        )
    }
}

function prettyUrl(url) {
    if (!url) {
        return 'javascript:;';
    } else if (!/^\//.test(url)) {
        return '/' + url;
    }
    return url;
}

function crtFilter(obj, crtSubMenu) {
    var output = -2; //none
    if (crtSubMenu === undefined) {
        return output;
    }
    if (obj.id === crtSubMenu || obj.url === crtSubMenu) {
        output = -1; //parent
        return output;
    }
    if (obj.children && obj.children.length > 0) {
        obj.children.map((item, index) => {
            if (item.parentId === obj.id && (item.id == crtSubMenu || prettyUrl(item.url) === crtSubMenu)) {
                output = index;
            }
        })
    }
    return output;
}

Menu.defaultProps = {
    id: "nav",
    className: "nav nav-list",
    crtClassName: "active",
    style: {
        width: 208,
        minHeight: 850
    }
};

module.exports = Menu;
