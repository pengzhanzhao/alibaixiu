$('#loginout').on('click', function () {
    var isConfirm = confirm('您确定要退出吗？');
    if (isConfirm) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function (response) {
                location.href = 'login.html';
            },
            error: function (response) {
                alert('退出失败');
            }
        })
    }
})

$.ajax({
    type: 'get',
    url: '/users/' + userId,
    success: function (response) {
        console.log(response);
        $('#userImg').attr('src', response.avatar);
        $('#userName').text(response.nickName)
    }
})


// function templateTpl(obj){
//     $.ajax({
//         type:'get',
//         url:obj.url,
//         success:function(response){
//             // console.log(response);
//            var html= template(obj.tpl,{data:response})
//         //    console.log(html);
//            $(obj.box).html(html)
//         }
//     })
    
// }
