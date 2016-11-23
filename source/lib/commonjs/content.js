/**
 * Created by BG236557 on 2016/10/27.
 */
const React = require('react');

class Content extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {title, showLoad, className, children} = this.props;
        return (
            <div className={className || null}>
                {!!title && <h2 className="title">{title}</h2>}
                {children}
                {showLoad &&
                <div className="loading-wrap">
                    <div className="loading"></div>
                </div> }
            </div>
        )
    }
}

module.exports = Content;