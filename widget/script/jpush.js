/**
 *  订单消息推送 修改界面 
 */
//var ajpush = null;
function push_ready(reloadflag) {
   
    if (typeof (reloadflag) != "undefined") {
        if(reloadflag != true){
            return false;
        }
    } else {
        if (!(url == "index")) { //只有在首页进行监听        
            return false;
        }
    }


    var user = getuserkey();
    var userid = user && user.member_id > 0 ? user.member_id : 0;

    ajpush = api.require('ajpush');    
    ajpush.init(function (ret) {
        if (ret && ret.status) {

        }
    });
 
    if (userid != 0) {
        var param = {alias: DEVFIX + "" + userid, tags: [DEVFIX + "" + userid]};
        ajpush.bindAliasAndTags(param, function (ret) {
            var statusCode = ret.statusCode;
//            alert(statusCode+'------------');
        });
    }

    api.addEventListener({name: 'appintent'}, function (ret, err) {
        if (ret && ret.appParam && ret.appParam.ajpush) {
            var ajpush = api.require('ajpush');
            var param = {id: -1};
            ajpush.clearNotification(param, function (ret) {
                if (ret && ret.status) {
                }
            });
//            var ajpush = ret.appParam.ajpush;
//            var id = ajpush.id;
//            var title = ajpush.title;
//            var content = ajpush.content;
//            var extra = ajpush.extra;
//            obj = JSON.parse(extra);
//            if (obj.state == 1) {
//                if (obj.url != "") {
//                    xpjc_openWin(obj.url);
//                }
//            }
        }
    })
}
