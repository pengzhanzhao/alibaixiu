$('#userform').on('submit', function () {
    // alert(1)
    var formdate = $(this).serialize();
    // console.log(formdate);

    $.ajax({
        type: 'post',
        url: '/users',
        data: formdate,


        success: function (response) {
            location.reload()
        },
        error: function (response) {
            alert('创建失败')
        }
    })
    return false;
})

$('#modifyBox').on('change', '#avatar', function () {
    //    console.log(this.files[0]);
    // this.files[0]  用户当前选择的文件
    // 创建一个空的FormData对象
    var fromDate = new FormData();
    // 添加属性avatar  属性值为用户当前选择的文件
    fromDate.append('avatar', this.files[0])
    $.ajax({
        url: '/upload',
        type: 'post',
        data: fromDate,
        // 告诉$.ajax方法不要解析请求数据类型
        contentType: false,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        success: function (response) {
            console.log(response);
            // 给当前img的src属性设置属性值为图片的地址
            $('#avatarImg').attr('src', response[0].avatar);

            $('#hiddenAvatar').val(response[0].avatar);
        }
    })
})
$.ajax({
    type: 'get',
    url: '/users',
    success: function (response) {
        // console.log(response);
        var html = template('userTpl', {
            data: response
        });
        //   console.log(html);
        $('#userBox').html(html)
    }
})

$('#userBox').on('click', '#edit', function () {
    var id = $(this).attr('data-id');
    //    console.log(id);
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (response) {
            // console.log(response);
            var html = template('modifyTpl', response)
            // console.log(html);

            $('#modifyBox').html(html)
        }
    })
})

$('#modifyBox').on('submit', '#modifyform', function () {
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');

    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function (response) {
            //    console.log(response);
            location.reload()
        }
    })
    return false
})

$('#userBox').on('click', '#delete', function () {
    var id = $(this).siblings().attr('data-id');
    // console.log(id);
    var isConfirm = confirm('您确定删除此用户吗？');
    if (isConfirm) {
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function (response) {
                // console.log(response);
                location.reload()
            }
        })
    }

})

// 获取全选按钮
var checkAll = $('#checkAll')
var deleteMany = $('#deleteMany')
checkAll.on('click', function () {
    var status = $(this).prop('checked');
    //    console.log(status);
    if (status) {
        $('#userBox').find('input').prop('checked', true)
        deleteMany.show()
    } else {
        $('#userBox').find('input').prop('checked', false)
        deleteMany.hide()
    }
})

$('#userBox').on('click', '#checkOne', function () {
    var inputs = $('#userBox').find('input');
    if (inputs.length == inputs.filter(':checked').length) {
        checkAll.prop('checked', true)
    } else {
        checkAll.prop('checked', false)
    }

    if (inputs.filter(':checked').length > 0) {
        deleteMany.show()
    } else {
        deleteMany.hide()
    }
})

deleteMany.on('click', function () {
    var ids = [];
    var ipts = $('#userBox').find('input').filter(':checked')
    // console.log(ipts);

    ipts.each(function (index, element) {
        // console.log($(element));
        ids.push($(element).attr('data-id'))
    });
    // console.log(ids);
    if (confirm('您确定要批量删除吗？')) {
        $.ajax({
            type: 'delete',
            url: '/users/' + ids.join('-'),
            success: function (response) {
                // console.log(response);
                location.reload()
            },
            error: function (response) {
                console.log(response);

            }
        })
    }

})