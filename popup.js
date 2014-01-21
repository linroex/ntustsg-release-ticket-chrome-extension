$(document).ready(function(){
    var reset_switcher = 0;
    $.get('http://ntustsg.com/tricket/sync.php',function(data){
        chrome.storage.local.set({'stuid-ed':data}); 
        $('#result').html('<span style="font-size:25px">同步完成</span>');
        $('#count').html('(' + (data.count(';')) + ')');
    })
    
    $('#stuid').keypress(function(e){
        if(e.keyCode == 13){
            if($('#stuid').val().length == 10){
                search();
                chrome.storage.local.get('stuid-ed',function(e){
                    var stuid = e['stuid-ed'];
                    $('#count').html('(' + (stuid.count(';')) + ')');
                });
                
            }else{
                $('#stuid').val('');
                $('#result').html('<span style="font-size:25px">請輸入悠遊卡內碼</span>');
            }
        }
        
    });
    String.prototype.count = function(search) {
        var m = this.match(new RegExp(search.toString().replace(/(?=[.\\+*?[^\]$(){}\|])/g, "\\"), "g"));
        return m ? m.length:0;
    }
    $('#reset').click(function(){
        
        if(reset_switcher == 1){
            if($('#passwd').val()=='123456'){
                $.post('http://ntustsg.com/tricket/sync.php',{cmd:'reset'},function(){
                    chrome.storage.local.set({'stuid-ed':''});
                    $('#passwd').hide();
                    $('#result').html('<div class="notice">已清除記錄</div>');    
                });
            }else{
                $('#result').html('<div class="notice">清除專用密碼，輸入錯誤</div>');
            }
            
        }else{
            $('#passwd').show();
            reset_switcher = 1;
            $('#result').html('<div class="notice">輸入密碼後在按一次清除記錄</div>');
        }
        
        
    });
})
function search(){
    chrome.storage.local.get('stuid-ed',function(e){
        if(e['stuid-ed']==undefined){
            var stuid = "";
        }else{
            var stuid = e['stuid-ed'];    
        }
        if($('#stuid').val()==''){
            $('#result').html('<span style="font-size:25px">請輸入悠遊卡內碼</span>');
        }else if(stuid.indexOf($('#stuid').val().toLowerCase())!=-1){
            $('#result').html('<div class="result-id">' + $('#stuid').val().toUpperCase() + '</div>已領票');
        }else{
            $('#result').html('<div class="result-id">' + $('#stuid').val().toUpperCase() + '</div>未領票');
            chrome.storage.local.set({'stuid-ed':stuid + ";" + $('#stuid').val().toLowerCase()});
            $.post('http://ntustsg.com/tricket/sync.php',{id:$('#stuid').val().toLowerCase()});
        }
        $('#stuid').val('');
        
    })
    
}
