$(function () {
    //点击切换模块
    $(".link_reg").click(function () {
        $(this).parent().parent().hide();
        $(".reg").show();
    });
    $(".link_login").click(function () {
        $(this).parent().parent().hide();
        $(".login").show();
    });

    var form = layui.form;

    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $(".reg [name=psd]").val();
            console.log(pwd);
            if (pwd !== value) {
                return "两次密码不一致！";
            }
        },
    });
    // 监听表单的注册事件
    var layer = layui.layer;
    $("#from_reg").on("submit", function (e) {
        e.preventDefault();
        var data = {
            username: $("#from_reg [name=usename]").val(),
            password: $("#from_reg [name=repsd]").val(),
        };
        // console.log(data);
        $.post("/api/reguser", data, function (
            res
        ) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg("注册成功，请登录！");
            // 模拟点击事件
            $(".link_login").click();
        });
    });
    ////

    //
    $("#form_login").submit(function (e) {
        // 阻止默认提交行为
        e.preventDefault();

        $.ajax({
            url: "/api/login",
            method: "POST",
            // 快速获取表单中的数据
            data: {
                username: $("#form_login #use").val(),
                password: $("#form_login #pass").val(),
            },
            success: function (res) {
                if (res.status !== 0) {
                    console.log(res);
                    return layer.msg("登录失败！");
                }
                layer.msg("登录成功！");
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem("token", res.token);
                // 跳转到后台主页
                location.href = "../../index.html";
            },
        });
    });
});