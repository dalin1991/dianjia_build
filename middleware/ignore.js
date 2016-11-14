var installed = false;
function install() {
    if (installed) {
        return;
    }
    var extensions = ['.css', '.scss', '.sass', '.less', '.sss', '.gif', '.jpeg', '.jpg', '.png', '.svg', '.mp4', '.ogv'];
    for (let i = 0, len = extensions.length; i < len; i++) {
        require.extensions[extensions[i]] = function () {
            return false;
        };
    }
    installed = true;
}
install();