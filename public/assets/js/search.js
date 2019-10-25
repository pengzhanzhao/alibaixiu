var keys=getUrl('key');
// console.log(keys);
if(keys!=-1){
    $.ajax({
        type:'get',
        url:'/posts/search/'+keys,
        success:function(response){
            console.log(response);
            var html=template('entryTpl',{data:response})
            $('#entryBox').html(html)
        }
    })
}
