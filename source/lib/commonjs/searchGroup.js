/**
 * Created by BG236557 on 2016/10/25.
 */
const React = require('react');
const SearchButton = require('./searchButton.js');
class SearchGroup extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
        this.setState(old=> {
            old.value = props.value;
            return old;
        })
    }

    render() {
        const {placeholder, value, msg, name, onInit, onChange, onReset, dataSize, children} = this.props;

        return (
            <div className="row">
                <input type="text"
                       onChange={onChange}
                       className="form-control"
                       placeholder={placeholder}
                       name={name} value={value}
                />
                <SearchButton onInit={onInit} onReset={onReset} dataSize={dataSize} msg={msg}/>
                <div className="fr text-right mgr10">
                    {children}
                </div>
            </div>
        )
    }
}

SearchGroup.defaultProps = {
    value: '',
    dataSize: 0
};


module.exports = SearchGroup;
