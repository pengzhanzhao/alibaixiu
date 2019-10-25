$.ajax({
    type: 'get',
    url: '/comments',
    success: function (response) {
        console.log(response);
        var html = template('cpmmentsTpl', {
            data: response
        });
           console.log(html);
        $('#commentsBox').html(html)
        // var page = template('commentsPageTpl', response);
        // $('#commentsPageBox').html(page)
        $('#commentsPageBox').twbsPagination({
            totalPages: response.pages,
            visiblePages: 3,
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '尾页',
            onPageClick: function (event, page) {
                changePage(page)
            }
        });
    }
})

function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page: page
        },
        success: function (response) {
            // console.log(response);
            var html = template('cpmmentsTpl', {
                data: response
            });
            //    console.log(html);
            $('#commentsBox').html(html)
            // var page = template('commentsPageTpl', response);
            // $('#commentsPageBox').html(page)
        }
    })
}


$('#commentsBox').on('click', '#ratifyComments', function () {
    var id = $(this).attr('data-id');
    var state = $(this).attr('data-state');
    console.log(state);
    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: {
            state: state == 0 ? 1 : 0
        },
        success: function (response) {
            // console.log(response);
            location.reload()
        }
    })
})

$('#commentsBox').on('click', '#deleteComments', function () {
    if (confirm('您确定要删除这条评论？')) {
        var id = $(this).siblings().attr('data-id');
        // console.log(id);
        $.ajax({
            type: 'delete',
            url: '/comments/' + id,
            success: function (response) {
                // console.log(response);
                location.reload()
            }
        })
    }
})