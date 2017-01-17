/**
 * 得到url请求的参数
 * @param {type} name
 * @returns {unresolved}
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    _s = window.location.search.substr(1);
    if (_s.indexOf("?") > 0) {
        _sArr = _s.split("?");
        _s = _sArr[0];
    }
    var r = _s.match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}


function in_array(stringToSearch, arrayToSearch) {
    for (s = 0; s < arrayToSearch.length; s++) {
        thisEntry = arrayToSearch[s].toString();
        if (thisEntry == stringToSearch) {
            return true;
        }
    }
    return false;
}

function showbigimg(imgs, img) {
    var imgArr = new Array();
    var imgindex = 0;
    k = Math.floor(Math.random() * 2000000000);

    $(img).attr("showbigimgid", k);//防止冲突
    $(imgs).each(function (i, n) {
        if ($(n).attr("showbigimgid") == k) {
            imgindex = i;
        }
        imgArr[i] = $(n).attr("src");
    })

    var obj = api.require('imageBrowser');
    obj.openImages({
        imageUrls: imgArr,
        showList: false,
        activeIndex: imgindex
    });

    return false;
}

// 监控滚动条事件
function scrollpage() {
    $(window).bind("scroll", function () {
        viewH = $(window).height(); //可见高度
        contentH = $(document).height(); //内容高度
        scrollTop = $(window).scrollTop(); //滚动高度
        if (scrollTop >= contentH - viewH - 10) {
            $(window).unbind("scroll");
            loaddata();
        }
    });
}


function storage(key, value) {
    if (typeof (value) != "undefined") {
        localStorage.setItem(key, value);
    } else {
        if (typeof (localStorage.getItem(key)) != "undefined") {
            return localStorage.getItem(key);
        } else {
            return '';
        }
    }
}
function getuserkey() {
    var user = new Object();
    var uk = storage('userkey');
    if (uk != '') {
        user = JSON.parse(uk);
    }
    user = user ? user : new Object();
    return user;
}



/**
 * 计算钱数
 * @param {type} s
 * @param {type} n
 * @returns {Number|String}
 */
function xiaoshu2wei_v1(s, n) {
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    if (s == 'NaN') {
        return 0;
    }
    var l = s.split(".")[0].split("").reverse(),
            r = s.split(".")[1];
    t = "";
    for (i = 0; i < l.length; i++)
    {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "" : "");
    }
    return t.split("").reverse().join("") + "." + r;
}
//js 加法计算  
//调用：accAdd(arg1,arg2)  
//返回值：arg1加arg2的精确结果   
function v1_accAdd(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return ((arg1 * m + arg2 * m) / m).toFixed(2);
}
//js 减法计算  
//调用：Subtr(arg1,arg2)  
//返回值：arg1减arg2的精确结果   
function v1_Subtr(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    //last modify by deeka  
    //动态控制精度长度  
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(2);
}
//js 除法函数  
//调用：accDiv(arg1,arg2)  
//返回值：arg1除以arg2的精确结果   
function v1_accDiv(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length
    } catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length
    } catch (e) {
    }
    with (Math) {
        r1 = Number(arg1.toString().replace(".", ""))
        r2 = Number(arg2.toString().replace(".", ""))
        return (r1 / r2) * pow(10, t2 - t1);
    }
}

//js 乘法函数  
//调用：accMul(arg1,arg2)   
//返回值：arg1乘以arg2的精确结果
function v1_accMul(arg1, arg2)
{
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {
    }
    try {
        m += s2.split(".")[1].length
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}


function xpjc_openWin(str, initflag) {
    _init = false;
    if (typeof (initflag) != "undefined") {
        _init = true;
    } else {
        _init = initappready;
    }
    if (!_init) {
        var timestamp3 = new Date().getTime();
        if ((timestamp3 - isfunctionclick) > 500) {
            isfunctionclick = timestamp3;
        } else {
            return false;
        }
    }
    if (str.indexOf("theme=apicloud") == -1) {
        var iscontaintest = str.indexOf("?") == -1 ? false : true;
        if (iscontaintest) {
            str += '&theme=apicloud';
        } else {
            str += '?theme=apicloud';
        }
    }
    if (typeof (api) != "undefined" && api) {
        api.openWin({
            name: str,
            url: str,
            rect: {
                x: 0,
                y: 0,
                w: 'auto',
                h: 'auto'
            },
            delay: 100,
            showProgress: true,
            reload: false,
            bounces: false,
            vScrollBarEnabled: false,
            hScrollBarEnabled: false
        });
    } else {
        parent.window.location.href = str;
    }
    return false;
}



function openmywin(link) {
    xpjc_openWin(link, 1);
}

function closeWin() {
    if (typeof (api) != "undefined" && api) {
        api.closeWin();
    }else{
        window.history.back()
    }
}