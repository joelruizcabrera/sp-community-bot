<?php
$conn = new mysqli('localhost', 'root', 'JoelS007', 'sp-community');
$name=$_POST["name"];
$ctgr=$_POST["ctgr"];
$sql="UPDATE moderator set name='$name', category='$ctgr' where id=1";
if($conn->query($sql)===TRUE){
    echo "DATA updated";
}
?>