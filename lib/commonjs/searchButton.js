/**
 * Created by BG236557 on 2016/10/28.
 */
const React = require('react');
class SearchButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {msg, onInit, onReset, dataSize, showDataSize} = this.props;

        return (
            <div className="search-button">
                <button className="btn" type="button" onClick={()=>onInit(1, 0, {})}>搜索</button>
                <button className="btn btn-default mgr12" type="button" onClick={onReset}>重置</button>
                {showDataSize && <span>共{dataSize}条{msg}</span>}
            </div>
        )
    }
}

SearchButton.defaultProps = {
    msg: '商品信息',
    dataSize: 0,
    showDataSize: true,
};
module.exports = SearchButton;