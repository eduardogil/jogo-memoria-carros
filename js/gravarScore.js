$(document).ready(function() {
    $('#insert_form').on("submit", function(event){
        event.preventDefault();
        alert("Cadastrar");

        var dados = $("#insert_form").serialize();

        var url = $('#url').val();
        console.log('Estive Aqui!');
        $.post(url, dados, function(retorno){
            
        })
    });
});