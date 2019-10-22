$('#cateGories').on('submit', function () {
    var formData = $(this).serialize()
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function (response) {
            //    console.log(response);
            location.reload()
        }
    })
    return false;
})

$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        // console.log(response);
        var html = template('categoriesTpl', {
            data: response
        });
        $('#categoriesBox').html(html)
    }
})

$('#categoriesBox').on('click', '#modifyCategories', function () {
    var id = $(this).attr('data-id')
    // console.log(id);
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function (response) {
            // console.log(response);
            var html = template('modifycateTpl', response);
            //    console.log(html);
            $('#modifycateBox').html(html)
        }
    })
})

$('#modifycateBox').on('submit', '#modifycate', function () {
    var id = $(this).attr('data-id');
    var formData = $(this).serialize();
    console.log(formData);

    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function (response) {
            // console.log(response);
            location.reload()
        }
    })
    return false;
})

$('#categoriesBox').on('click', '#deleteCate', function () {
    var id = $(this).siblings().attr('data-id');
    // console.log(id);
    if (confirm('您确定要删除此分类吗？')) {
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function (response) {
                // console.log(response);
                location.reload()
            }
        })
    }
})

var cateAll = $('#cateAll');
var deleteMany = $('#deleteMany');
cateAll.on('click', function () {
    var checkedAll = $(this).prop('checked');
    var ipts = $('#categoriesBox').find('input');
    // console.log(checkedAll);
    if (checkedAll) {
        ipts.prop('checked', true)
        deleteMany.show()
    } else {
        ipts.prop('checked', false)
        deleteMany.hide()
    }

})

$('#categoriesBox').on('click', '#cateOne', function () {
    var ipts = $('#categoriesBox').find('input');
    if (ipts.length == ipts.filter(':checked').length) {
        cateAll.prop('checked', true)

    } else {
        cateAll.prop('checked', false)
    }
    if (ipts.filter(':checked').length > 0) {
        deleteMany.show()
    } else {
        deleteMany.hide()
    }
})

deleteMany.on('click', function () {
    var ids = [];
    var checkMany = $('#categoriesBox').find('input').filter(':checked');
    checkMany.each(function (index, element) {
        // console.log($(element));
        ids.push($(element).attr('data-id'))
    })
    // console.log(ids);
    if(confirm('您确定要批量删除吗？')){
        $.ajax({
            type:'delete',
            url:'/categories/'+ids.join('-'),
            success:function(response){
                location.reload()
            }
        })
    }
})