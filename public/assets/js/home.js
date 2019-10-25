window.onload= function () {



    $.ajax({
        type: 'get',
        url: '/slides',
        success: function (response) {
            // console.log(response);
            var html = template('swipeTpl', {
                data: response
            });
            //    console.log(html);
            $('#swipeBox').html(html)
            var swiper = Swipe(document.querySelector('.swipe'), {
                auto: 3000,
                transitionEnd: function (index) {
                    // index++;

                    $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
                }
            });

            // 上/下一张
            $('.swipe .arrow').on('click', function () {
                var _this = $(this);

                if (_this.is('.prev')) {
                    swiper.prev();
                } else if (_this.is('.next')) {
                    swiper.next();
                }
            })
        }
    })

    // $.ajax({
    //     type:'get',
    //     url:'/posts/recommend',
    //     success:function(response){
    //         // console.log(response);
    //        var html= template('hotTpl',{hotData:response})
    //     //    console.log(html);
    //        $('#hotBox').html(html)
    //     }
    // })
    templateTpl({
        url: '/posts/lasted',
        tpl: 'releaseTpl',
        box: '#releaseBox'
    })

    templateTpl({
        url: '/posts/recommend',
        tpl: 'hotTpl',
        box: '#hotBox'
    })
    // templateTpl({
    //     url: '/posts/random',
    //     tpl: 'randomTpl',
    //     box: '#randomBox'
    // })

    // templateTpl({
    //     url: '/comments/lasted',
    //     tpl: 'commentTpl',
    //     box: '#comBox'
    // })


    // templateTpl({
    //     url: '/categories',
    //     tpl: 'navigationTpl',
    //     box: '#navigationBox'
    // })

}