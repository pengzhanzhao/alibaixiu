templateTpl({
    url: '/posts/recommend',
    tpl: 'hotTpl',
    box: '#hotBox'
})

var id = getUrl('id');
var review;
if (id != -1) {
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function (response) {
            //  console.log(response);
            var html = template('articlesTpl', response);
            // console.log(html);
            $('#detailsBox').html(html)
        }
    })
}


$('#detailsBox').on('click', '#clickPraise', function () {
    $.ajax({
        type: 'post',
        url: '/posts/fabulous/' + id,
        success: function (response) {
            //  console.log(response);
            alert('点赞成功，感谢您的支持')
        }
    })
})


$.ajax({
    type: 'get',
    url: '/settings',
    success: function (response) {
        // console.log(response);
        review = response.review
        if (response.comment) {
            var html = template('commentsssTpl');
            // console.log(html);

            $('#commentsAdd').html(html)
        }

    }
})

$('#commentsAdd').on('submit', 'form', function () {
    //  alert(1)
    var content = $(this).find('textarea').val();
    //    console.log(content);
    if (review) {
        state = 0;
    } else {
        state = 1;
    }
    $.ajax({
        type: 'post',
        url: '/comments',
        data: {
            content: content,
            post: id,
            state: state
        },
        success: function (response) {
            // console.log(response);
            alert('评论成功')
            location.reload()
        },
        error: function (response) {
            // console.log(response);
            alert('评论失败')
        }
    })
    return false
})