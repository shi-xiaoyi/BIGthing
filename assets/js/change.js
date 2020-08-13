var $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options);
$('#btnChooseImage').on('click', function () {
    $('#file').click()
})
$('#file').on('change', function (e) {
    // console.log(e);
    var list = e.target.files;
    // console.log(list);
    if (list.length === 0) {
        return layer.msg('选择照片')
    }
    var img = list[0];
    // console.log(img);
    var imgUrl = URL.createObjectURL(img);
    $image
        .cropper('destroy') // 销毁旧的裁剪区域
        .attr('src', imgUrl) // 重新设置图片路径
        .cropper(options) // 重新初始化裁剪区域
})

//点击确定后将头像上传到服务器
$('#btnUpload').on('click', function () {
    var dataURL = $image
        .cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png');
    $.ajax({

        method: 'post',
        url: '/my/update/avatar',
        data: {
            avatar: dataURL
        },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('更换头像失败！')
            }
            layer.msg('更换头像成功！')
            window.parent.getuse()
        }
    })
})