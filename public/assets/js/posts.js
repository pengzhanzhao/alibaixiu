$.ajax({
    url: '/posts',
    type: 'get',
    success: function (response) {
        // console.log(response);
        var html = template('postsTpl', {
            posts: response.records
        })
        //    console.log(html);
        $('#postsBox').html(html)
        var page = template('pageTpl', response)
        $('#pages').html(page)

    }
})

function formateDate(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

function changePage(page) {
    $.ajax({
        url: '/posts',
        type: 'get',
        data: {
            page: page
        },
        success: function (response) {
            // console.log(response);
            var html = template('postsTpl', {
                posts: response.records
            })
            //    console.log(html);
            $('#postsBox').html(html)
            var page = template('pageTpl', response)
            $('#pages').html(page)

        }
    })
}

$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        // console.log(response);
        var cate = template('cateTpl', {
            cates: response
        })
        $('#cateBox2').html(cate)
    }
})

$('#cateFilter').on('submit', function () {
    var formData = $(this).serialize();
    // console.log(formData);
    $.ajax({
        url: '/posts',
        type: 'get',
        data: formData,
        success: function (response) {
            // console.log(response);
            var html = template('postsTpl', {
                posts: response.records
            })
            //    console.log(html);
            $('#postsBox').html(html)
            var page = template('pageTpl', response)
            $('#pages').html(page)

        }
    })
    return false
})

// $('#postsBox').on('click','#modifyPost',function(){
//     var id=$(this).attr('data-id');
//     // console.log(id);
//     $.ajax({
//         type:'put',
//         url:'/posts/'+id,
//         success:function(response){
//             console.log(response);

//         }
//     })
// })

$('#postsBox').on('click', '#deletePost', function () {
    if (confirm('您确定要删除此文章吗？')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function (response) {
                // console.log(response);
                location.reload()
            }
        })
    }
})