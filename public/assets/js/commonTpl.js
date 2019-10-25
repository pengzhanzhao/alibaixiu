function templateTpl(obj) {
    $.ajax({
        type: 'get',
        url: obj.url,
        success: function (response) {
            // console.log(response);
            var html = template(obj.tpl, {
                data: response
            })
            //    console.log(html);
            $(obj.box).html(html)
        }
    })

}

templateTpl({
    url: '/comments/lasted',
    tpl: 'commentTpl',
    box: '#comBox'
})

templateTpl({
    url: '/categories',
    tpl: 'navigationTpl',
    box: '#navigationBox'
})

templateTpl({
    url: '/posts/random',
    tpl: 'randomTpl',
    box: '#randomBox'
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

$('.search form').on('submit',function(){
    // alert(1)
   var keys= $(this).find('.keys').val();
//    console.log(key);
    location.href='/search.html?key='+keys
   
    return false
})