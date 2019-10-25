$.ajax({
    type:'get',
    url:'/categories/count',
    success:function(response){
        // console.log(response.categoryCount);
        $('#categoriesCount').text(response.categoryCount ? response.categoryCount : 0)
    }
})
$.ajax({
    type:'get',
    url:'/posts/count',
    success:function(response){
    //    console.log(response);
       $('#postCount').text(response.postCount ? response.postCount : 0);
       $('#draftCount').text(response.draftCount ? response.draftCount : 0);
    }
})

$.ajax({
    type:'get',
    url:'/comments/count',
    success:function(response){
        // console.log(response);
        $('#commentCount').text(response.commentCount ? response.commentCount : 0)
        $('#uncheckedCount').text(response.uncheckedCount ? response.uncheckedCount : 0)
        
    }
})

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

