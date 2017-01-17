 
window.xpjcDomReady = function () {
};

function addDomReady(callback) { //加载项目
    var oldLoad = window.xpjcDomReady;
    if (typeof window.xpjcDomReady != 'function') {
        window.xpjcDomReady = callback;
    } else {
        window.xpjcDomReady = function () {
            oldLoad();
            callback();
        }
    }
}

window.xpjcApiReady = function () {
};

function addApiReady(callback) { //加载项目
    var oldLoad = window.xpjcApiReady;
    if (typeof window.xpjcApiReady != 'function') {
        window.xpjcApiReady = callback;
    } else {
        window.xpjcApiReady = function () {
            oldLoad();
            callback();
        }
    }
}