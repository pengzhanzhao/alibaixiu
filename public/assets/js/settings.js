$('#logo').on('change', function () {
    var formData = new FormData();
    formData.append('settingsLogo', this.files[0]);
    // console.log(this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            // console.log(response);
            $('#settingsImg').attr('src', response[0].settingsLogo);
            $('#hiddenLogo').val(response[0].settingsLogo);
        }
    })
})


$('#settingsForm').on('submit', function () {
    var formData = $(this).serialize();
    // console.log(formData);
    $.ajax({
        type:'post',
        url:'/settings',
        data: formData,
        success:function(response){
            // console.log(response);
            location.reload()
        }
    })
    return false
})

$.ajax({
    type:'get',
    url:'/settings',
    success:function(response){
        console.log(response);
        $('#hiddenLogo').val(response.logo)
        $('#settingsImg').attr('src',response.logo)
        $('#site_name').val(response.title)
        $('#site_description').val(response.description)
        $('#site_keywords').val(response.keywords)
        $('#comment_status').prop('checked',response.comment)
        $('#comment_reviewed').prop('checked',response.review)
    }
})