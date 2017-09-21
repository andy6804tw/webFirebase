// Initialize Firebase
var config = {
    apiKey: "AIzaSyBOOrsP1xiZESmcuWg3iHdOw4j-fCmOCGc",
    authDomain: "webfirebase-88e1c.firebaseapp.com",
    databaseURL: "https://webfirebase-88e1c.firebaseio.com",
    projectId: "webfirebase-88e1c",
    storageBucket: "webfirebase-88e1c.appspot.com",
    messagingSenderId: "1057133298025"
};
firebase.initializeApp(config);
    
//jquery執行
$(document).ready(function(){

    var msgRef =firebase.database().ref('/messages/');
    //按鈕處發事件
    $('#btn').on('click',function(){
        var msg = $('#input').val();
        console.log(msg)
        //寫資料
        msgRef.push({
            messages:msg
        })
          

    });
    //讀資料
    msgRef.on('value', function(snapshot) {
        var val = snapshot.val();
        console.log(val)
        let list='';
        $.each(val,function(i,item){
            console.log('each',i,item)
            list=`${list}<li>${(item.messages)}  <button type='button' class='remove' data-key='${i}'>移除</button></li>`
        });
        $('#ul').html(list)
    });
    
    //刪除資料
    $('#ul').on('click','.remove',function(){
        console.log('remove',$(this).data('key'))
        var key=$(this).data('key');
        msgRef.child(key).remove();
    });

})

