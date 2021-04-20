<html>
<head>
    <title>Update Data</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
</head>
<body>
<center>
    <h3>UPDATE DATA</h3>
    <?php
    $conn = new mysqli('localhost', 'root', '', 'update');
    $sql = "SELECT * FROM moderator where id=1";
    $result = $conn->query($sql);
    while ( $row=mysqli_fetch_assoc($result)) {
        echo  'Moderator :<input type="text" id="mod" value="'.$row['name'].'">';
        echo  'Category :<input type="text" id="ctgr" value="'.$row['category'].'">';
    }?>
    <button type="submit" id="update">UPDATE</button>
</center>
<script>
    $(document).ready(function(){
        $("#update").click(function(){
            var name=$("#mod").val();
            var ctgr=$("#ctgr").val();
            $.ajax({
                url:'getData.php',
                method:'POST',
                data:{
                    name:name,
                    ctgr:ctgr
                },
                success:function(response){
                    alert(response);
                }
            });
        });
    });
</script>
</body>
</html>