function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "error:cookiebcz";
}

function setCookie(cname, cvalue, exdays = 114514) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function apigpt() {
    setCookie("api_url", "https://v1.apigpt.cn/")
    return "https://v1.apigpt.cn/"
}

function apixa() {
    setCookie("api_url", "https://v.api.aa1.cn/api/api-xiaoai/talk.php")
    return "https://v.api.aa1.cn/api/api-xiaoai/talk.php"
}

function chat_gpt(text) {
    $.get(api_url, {
            q: text,
            apitype: "sql"
        },
        function(data) {
            out = JSON.parse(data)
            alert(out.ChatGPT_Answer)
        })
}

function chat_xa(text) {
    $.get(api_url, {
        msg: text
    }, function(data) {
        alert(data)
    })
}
api_url = getCookie("api_url")
if (api_url == "error:cookiebcz") {
    setCookie("api_url", "https://v1.apigpt.cn/")
    api_url = "https://v1.apigpt.cn/"
}
api_type = "apigpt"

function chat() {
    // 获取聊天框内容
    var text = document.getElementById("chat_data").value;
    if (text == "") {
        // 防止出现一些奇奇怪怪的问题
        alert("未输入文字");
    } else {
        // 拼接字符串
        var url = api_url;
        // 清空搜索框内容
        // document.getElementById("chat_data").value = "";
        // 跳转
        alert("请稍等，由于api接口较慢，请耐心等待，若显示null,请再次提问")
        if (api_url == "https://v1.apigpt.cn/") {
            chat_gpt(text)
        } else {
            chat_xa(text)
        }
    }
}