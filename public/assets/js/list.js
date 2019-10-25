 var id = getUrl('id');

 if (id != -1) {
     $.ajax({
         type: 'get',
         url: '/posts/category/' + id,
         success: function (response) {
             console.log(response);
             var html = template('entryTpl', {
                 data: response
             })
             console.log(html);
            //  console.log(data.category.title);
             $('#entryBox').html(html)

         }
     })
 }



$.ajax({
    type:'get',
    url:'/categories/'+id,
    success:function(response){
        // console.log(response.title);
        $('#cateTitle').html(response.title);
    }
})



