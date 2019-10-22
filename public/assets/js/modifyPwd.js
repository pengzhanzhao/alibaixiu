$('#modifyPwd').on('submit',function(){
    // alert(1)
    var formData=$(this).serialize();
    // console.log(formData);
    $.ajax({
        type:'put',
        url:'/users/password',
        data:formData,
        success:function(response){
            // console.log(response);
            location.href='/admin/login.html';
        }
    })
    return false;
})