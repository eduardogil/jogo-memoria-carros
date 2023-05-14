<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Listar Ranking</title>

    </head>
    <body>
        <h1>Ranking Geral:</h1>
        <table width="100%" border="1" bordercolor="#EEE"  cellspacig='0' cellpadding='10'>
            <tr>
                <td><strong>NOME</strong></td>
                <td><strong>PONTOS</strong></td>
            </tr>   
               <?php
                    include("conecta.php");
                    $seleciona=mysqli_query($DBA, "select * from ranking order by pontos desc");
                    while($campo=mysqli_fetch_array($seleciona)){?>
                        <tr>
                            <td><?=$campo["nome"]?></td>
                            <td><?=$campo["pontos"]?></td>
                        </tr>
                    
                <?php }?>    
        </table>
    </body>
</html>