/**
 *  订单消息推送 修改界面 
 */
//var ajpush = null;
function push_ready(reloadflag) {

    if (typeof (reloadflag) != "undefined") {
        if (reloadflag != true) {
            return false;
        }
    } else {
        if (!(url == "index")) { //只有在首页进行监听        
            return false;
        }
    }

    var user = getuserkey();
    var userid = user && user.member_id > 0 ? user.member_id : 0;
    tencentPush = api.require('tencentPush');
    if (userid != 0) {
        var resultCallback = function (ret, err) {
            if (ret.status) {
//                alert("注册成功，token为：" + ret.token);
                storage('pushkey', ret.token);
            } else {
//                alert("注册失败，错误码：" + err.code + "，错误信息：" + err.msg);
            }
        };

        var params = {account: DEVFIX + "" + userid};
        tencentPush.registerPush(params, function (ret, err) {
            if (ret.status) {
                storage('pushkey', ret.token);
            } else {
//                alert("注册失败，错误码：" + err.code + "，错误信息：" + err.msg);
            }
        });

//        var param = {tag: DEVFIX + "" + userid};
//        tencentPush.setTag(param, function (ret, err) {
//            if (ret.status) {
////                alert("注册成功，token为：" + ret.token);
//            } else {
////                alert("注册失败，错误码：" + err.code + "，错误信息：" + err.msg);
//            }
//        });


        // 注册消息透传（消息命令字）的接收回调
        tencentPush.setListener({name: "message"}, function (ret, err) {
//            alert("收到透传消息，title：" + ret.title + "，content：" + ret.content +
//                    "，customContent：" + ret.customContent);
            if (ret && ret.title) {
                if (ret.title == 'member_key10') { //设置订单num
                    var user = getuserkey();
                    user.member_key10 = ret.content;
                    storage('userkey', JSON.stringify(user));
                    api.sendEvent({
                        name: 'event_inc_user_tmpl',
                        extra: {}
                    });
                }
            }

        });

        // 注册通知被展示的回调  
        tencentPush.setListener({name: "notifactionShow"}, function (ret, err) {

            if ($api.getStorage("isnoinited") == 1) { //当在前台的时候

                var json = JSON.parse(ret.customContent);
                if (json.msgtype == 'order_qiangdan') {
                    xpjc_openWin('order_qiangdan.html?post_id=' + json.msgvalue);
                    setTimeout(function () {
//                        var tencentPush = api.require('tencentPush');
                        var params = {nid: ret.msgid};
//                        alert(ret.msgid);
                        tencentPush.cancelNotifaction({nid: -1});

//                        var tencentPush = api.require('tencentPush');
//                        var params = {nid: -1};
//                        tencentPush.cancelNotifaction(params);
                    }, 3000)
                }
//                alert("收到通知被展示的回调，title：" + ret.title + "，content：" + ret.content + "，customContent：" + ret.customContent
//                        + ",activity:" + ret.activity + ",actionType:" + ret.actionType + ",msgid:" + ret.msgid);
            }

        });



        // 注册通知被点击的回调
        tencentPush.setListener({name: "notifactionClick"}, function (ret, err) {
            var json = JSON.parse(ret.customContent);
            if (json.msgtype == 'order_qiangdan') {
                xpjc_openWin('order_qiangdan.html?post_id=' + json.msgvalue);
            }

//            alert("收到通知被点击的回调，title：" + ret.title + "，content：" + ret.content + "，customContent：" + ret.customContent
//                    + ",activity:" + ret.activity + ",actionType:" + ret.actionType + ",msgid:" + ret.msgid);
        });

        // 注册通知被清除的回调
        tencentPush.setListener({name: "notifactionClear"}, function (ret, err) {
//            alert("收到通知被清除的回调，title：" + ret.title + "，content：" + ret.content + "，customContent：" + ret.customContent
//                    + ",activity:" + ret.activity + ",actionType:" + ret.actionType + ",msgid:" + ret.msgid);
        });




    } else {
        // 需要绑定的账号，若为"*"表示解除之前的账号绑定
        var params = {account: "*"};
        var resultCallback = function (ret, err) {
            if (ret.status) {
//                alert("注册成功，token为：" + ret.token);
            } else {
//                alert("注册失败，错误码：" + err.code + "，错误信息：" + err.msg);
            }
        };
        tencentPush.registerPush(params, resultCallback);
    }
}

function unregisterPush() {
    // 反注册设备
    var tencentPush = api.require('tencentPush');

    tencentPush.unregisterPush(function (ret, err) {
//    if(ret.status){
//        alert("反注册成功，token："+ret.token);
//    }else{
//        alert("反注册失败，错误码："+err.code+"，错误信息："+err.msg);
//    }
    });
}