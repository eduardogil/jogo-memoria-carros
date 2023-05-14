const configusuario = document.getElementById( 'id' )

function selecionarDificuldade(id) {
    if (id==1) {
      document.getElementById( 'nivel' ).innerHTML = 'Dificuldade Selecionada: Fácil'
    } else if ( id==2 ) {
      document.getElementById( 'nivel' ).innerHTML = 'Dificuldade Selecionada: Média'
    } else if( id==3){
      document.getElementById( 'nivel' ).innerHTML = 'Dificuldade Selecionada: Difícil'
    } else{
        document.getElementById( 'nivel' ).innerHTML = 'Dificuldade não selecionada!'
    }
  }

function abrirRegras(){
    regrasWindow = window.open (
    'regras.html',
    'regras',
    "width=350, height=255, top=100, left=110, scrollbars=no " );
}

function fecharRegras(){
    fecharWindow = regrasWindow.close()
}

function abrirRanking(){
    rankingWindow = window.open (
        'ranking.html',
        'ranking',
        "width=450, height=255, top=100, left=480, scrollbars=yes " );
}

function fecharRanking(){
  fecharWindow = rankingWindow.close()
}
