$(function () {

    getuse();
    // 获取用户的基本信息
    function getuse() {

        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return
                }
                // console.log(res);
                getimage(res.data);
            }
        })
    }
    //渲染用户的头像和文字信息

    function getimage(data) {
        // 获取需要的用户名

        var name = data.nickname || data.username;
        $('#welcome').html(`欢迎  ${name}`)

        //渲染那个图片
        if (!data.user_pic) {
            // 渲染文本图片
            $('.layui-nav-img').hide();
            var first_name = name[0].toUpperCase()
            $('.text-avatar').html(first_name).show();
            $('.a-text').html(first_name).show();
        } else {
            $('.layui-nav-img')
                .attr('src', user.user_pic)
                .show()
            $('.text-avatar').hide()
            $('.a-text').hide()
        }
    }
    // 在页面加在后清空本地
    localStorage.removeItem('token');

    //点击退出按钮
    var layer = layui.layer

    // 点击按钮，实现退出功能
    $('#btnout').on('click', function () {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
            location.href = './login.html'

            // 关闭 confirm 询问框
            layer.close(index)
        })
    })

})