var theme = localStorage.getItem('theme');
if (theme == 'dark') {
    $('body').addClass('mdui-theme-layout-dark');
    $('#change_style').html('<i class="mdui-icon material-icons">brightness_7</i>');
}
$('#change_style').click(function() {
    var theme = localStorage.getItem('theme');
    if (theme == 'dark') {
        localStorage.setItem('theme', 'white');
        $(this).html('<i class="mdui-icon material-icons">brightness_4</i>');
        $('body').removeClass('mdui-theme-layout-dark');
    } else {
        localStorage.setItem('theme', 'dark');
        $(this).html('<i class="mdui-icon material-icons">brightness_7</i>');
        $('body').addClass('mdui-theme-layout-dark');
    }
});


var page = getRequestParam('page');
var action = getRequestParam('action');
if (action == 'admin') {
    if (!page) {
        page = 'index';
    }
    $('.' + page).addClass('mdui-color-theme-100');
} else {
    if (!action) {
        action = 'index';
    }
    $('.' + action).addClass('mdui-color-theme-100');
}

function getRequestParam(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}


$(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
    if (scrollTop > 130) {
        $('#fabUp').removeClass('mdui-fab-hide');
    } else {
        $('#fabUp').addClass('mdui-fab-hide');
    }
});

function goTop() {
    document.querySelector('#top').scrollIntoView({ behavior: 'smooth' });
    setTimeout(function() {
        mdui.snackbar({
            message: '一不小心撞到头了',
            position: 'top',
            timeout: 800
        });
    }, 500);
}

var loadingDialog = new mdui.Dialog('#loading', {
    history: false,
    modal: true,
    closeOnEsc: false,
});

