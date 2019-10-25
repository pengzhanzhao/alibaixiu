$('#image').on('change',function(){
    var formData=new FormData();
    formData.append('img',this.files[0])
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        processData:false,
        contentType:false,
        success:function(response){
            // console.log(response);
            $('#imgUrl').attr('src',response[0].img).show();
            $('#hiddenImg').val(response[0].img);
        }
    })
})

$('#slidesForm').on('submit',function(){
    var formData=$(this).serialize();
    // console.log(formData);
    $.ajax({
        type:'post',
        url:'/slides',
        data:formData,
        success:function(response){
            // console.log(response);
            location.reload()
        }
    })
    return false
})

$.ajax({
    type:'get',
    url:'/slides',
    success:function(response){
        console.log(response);
      var html=  template('slidesTpl',{data:response});
    //   console.log(html);
      $('#slidesBox').html(html)
    }
})

$('#slidesBox').on('click','#deleteSlides',function(){
   if(confirm('您确定要删除这个轮播图片吗？')){
    var id=$(this).attr('data-id');
    // console.log(id);
    $.ajax({
        type:'delete',
        url:'/slides/'+id,
        success:function(response){
            // console.log(response);
            location.reload()
        }
    })
   }
})