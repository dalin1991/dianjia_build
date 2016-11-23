const React = require('react');
const ReactDOM = require('react-dom');
var upload = require('../remotes/public.js').upload;
require('./lib/index.less');
class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    handleUpload() {
        var formData = new FormData(document.querySelector('.form'));
        upload(formData)
    }


    render() {
        return (
            <div>
                <form className="form">
                    <input type="file" name="file" onChange={this.handleUpload.bind(this)}/>
                </form>
            </div>
        )
    }
}

module.exports = Index;
let body = document.querySelector('.content');

if (body) {
    ReactDOM.render(<Index/>, body);
}