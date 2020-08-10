$(function () {

    //点击切换模块
    $('.link_reg').click(function () {
        $(this).parent().hide();
        $('.reg').show();
    })
    $('.link_login').click(function () {
        $(this).parent().hide();
        $('.login').show();
    })
})