<?php
    if(isset($_POST['id'])){
        file_put_contents('id.txt', trim($_POST['id']) . ';',FILE_APPEND);

    }elseif ($_POST['cmd']=='reset') {
        file_put_contents('id.txt', '');
    }else{
        echo file_get_contents('id.txt');
    }
?>