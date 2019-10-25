// 获取文章分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        // console.log(response);
        var html = template('cateTpl', {
            data: response
        })
        //    console.log(html);
        $('#category').html(html)
    }
})

$('#modifyPostBox').on('change','#feature', function () {
    // console.log(this.files[0]);
    var formData = new FormData();
    formData.append('cover', this.files[0])
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            // console.log(response);
            $('#coverImg').attr('src', response[0].cover).show()
            $('#hiddenCover').val(response[0].cover)
        }
    })
})


$('#articleAdd').on('submit', function () {
    var formData = $(this).serialize();
    // console.log(formData);
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function (response) {
            // console.log(response);
            location.href = '/admin/posts.html';
        }
    })
    return false
})
function getUrl(name) {
    // console.log();
    var parms = location.search.substr(1).split('&');
    // parms.forEach(function (value, index) {
    //     // console.log(parms[index].split('='));
    //     var temp = parms[index].split('=');
    //     if (temp[0] == name) {
    //         // console.log(temp[1]);
    //         return temp[1]
    //     }

    // })

    for (var i = 0; i < parms.length; i++) {
        var temp = parms[i].split('=');
        if (temp[0] == name) {
            // console.log(temp[1]);
            return temp[1]
        }
    }
    return -1
}

// console.log(getUrl('id'));
var id=getUrl('id');

if (id != -1) {
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function (response) {
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function (cate) {
                    // console.log(response);
                    response.cate=cate;
                    // console.log(response);
                    var html = template('modifyPostTpl', response)
                    console.log(html);
                    $('#modifyPostBox').html(html)
                }
            })
           
        }
    })
}


$('#modifyPostBox').on('submit','#articleModify',function(){
    // alert(1)
    var formData=$(this).serialize();
    // console.log(formData);
    var id=$(this).attr('data-id');
    // console.log(id);
    
    $.ajax({
        type:'put',
        url:'/posts/'+id,
        data:formData,
        success:function(response){
            // console.log(response);
            location.href='/admin/posts.html';
        }
    })
    return false
})