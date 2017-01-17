;
function ininui() {

    api.setStatusBarStyle({
        style: 'dark'
    });
    w = $(window).width();
    h = $(window).height();
    localStorage.setItem("window_h", h);
    localStorage.setItem("window_w", w);
    $(".header.wrap").css({
        "top": "0px",
    });
    localStorage.setItem("systemType", "android");
    var strDM = api.systemType;
    if (strDM == 'ios') {
        localStorage.setItem("systemType", "ios");
        var strSV = api.systemVersion;
        var numSV = parseInt(strSV, 10);
        var fullScreen = api.fullScreen;
        var iOS7StatusBarAppearance = api.iOS7StatusBarAppearance;
        if (numSV >= 7 && !fullScreen && iOS7StatusBarAppearance) {
            localStorage.setItem("systemType", "ios7");
        }
    }

    var ostype = localStorage.getItem("systemType");
    if (ostype == "ios7") {
        $(".header.wrap").css({
            "padding-top": "20px",
        })
    }


    //$api.fixIos7Bar($(".header.wrap").get(0));

    localStorage.setItem("headerwrap", $(".header.wrap").outerHeight(true))


    headerheight = localStorage.getItem("headerwrap");
    if ($(".shoucang_nav").html()) {
        systemType = localStorage.getItem("systemType");
        if (systemType == "ios7") {
            $(".shoucang_nav").css({
                top: "60px",
                "padding-top": "0px",
                overflow: "hidden",
                "height": 30 + "px",
            })
        }

        $(".container.hasfooter").css({
            "height": h - headerheight - 70 + "px",
            "top": headerheight + 30 + "px",
            overflow: "hidden",
        });
        $(".container.nofooter").css({
            "height": h - headerheight - 30 + "px",
            "top": headerheight + 30 + "px",
            overflow: "hidden",
        });
    } else {
        $(".container.hasfooter").css({
            "height": h - headerheight - 40 + "px",
            "top": headerheight + "px"
        });
        $(".container.nofooter").css({
            "height": h - headerheight + "px",
            "top": headerheight + "px"
        });
    }
    $(".footer.wrap").css({
        "top": h - 40 + "px",
        "height": "40px"
    });
    $("container_fill_all").css({
        "top": "0px",
        overflow: "auto",
    });
}

/**
 * 页面加载成功后执行事件
 * @return {[type]} [description]
 */
function onDeviceReady() {
    if ($("html").attr("init")) {
        return false;
    }
    $("html").attr("init", true);
    /**
     * 初始化布局
     */
    ininui();
    $(window).resize(function () {
        ininui();
    });
    $('.applink').live('touchend', function () {
        api.openWin({
            name: $(this).attr("applink"),
            url: $(this).attr("applink"),
            rect: {
                x: 0,
                y: 0,
                w: 'auto',
                h: 'auto'
            },
            bounces: false,
//            delay: 200
        });
        return false;
    });
    $('.ico_fanhui').live('touchend', function () {
        closeNewWin();
        return false;
    });
}
 
 