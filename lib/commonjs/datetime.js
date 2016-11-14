/**
 * Created by BG236557 on 2016/10/25.
 */
const React = require('react');
const Time = require('react-datetime');
class Datetime extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange(name, moment) {
        const {startValue, endValue} = this.props;
        let data = {startTime: startValue, endTime: endValue};
        data[name] = moment.valueOf();
        this.props.onChange(data);
    }

    render() {
        const {timeFormat, startValue, endValue} = this.props;
        return (
            <div className="timeGroup">
                <label>时间：</label>
                <Time dateFormat="YYYY-MM-DD" timeFormat={timeFormat ? 'HH:mm' : ''}
                      locale="zh-cn" viewMode="days" value={startValue}
                      onChange={this.handleChange.bind(this, 'startTime')}/>
                <span> 至 </span>
                <Time dateFormat="YYYY-MM-DD" timeFormat={timeFormat ? 'HH:mm' : ''}
                      locale="zh-cn" viewMode="days" value={endValue}
                      onChange={this.handleChange.bind(this, 'endTime')}/>
            </div>
        )
    }
}

module.exports = Datetime;