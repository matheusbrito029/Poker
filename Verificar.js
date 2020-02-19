
function verifica(){

    var Cards, mao1; //Jogador 01
    var Cards2, mao2; //Jogador 02
    var i, j;
    var CardsN1 = new Array();
    var CardsV1 = new Array();
    var CardsN2 = new Array();
    var CardsV2 = new Array();
    var cont = 0;
    var O = P = C = E = 0;

    var RoyalFlush = StraightFlush = Quadra = FullHouse = Flush = Sequencia = Trinca = DoisPares = Par = CartaAlta = 0;



    mao1 = document.getElementById("mao01").value;
    mao2 = document.getElementById("mao02").value;

    Cards = separa (',', mao1);
    Cards2 = separa (',', mao2);
   

    for(i = 0 ; i < 5; i++){
        var aux;
        aux = Cards[i].split('');
        if(aux[0] == '1' && aux[1] == '0') {
            CardsV1[i] = '10';
            CardsN1[i] = aux[2];
        }
        else{
            CardsV1[i] = aux[0];
            CardsN1[i] = aux[1];
        }
        
    }

    for(i = 0 ; i < 5; i++){
        if(CardsN1[i] == 'O' || CardsN1[i] == 'o') O++;
        else if(CardsN1[i] == 'P' || CardsN1[i] == 'c') P++;
        else if(CardsN1[i] == 'E' || CardsN1[i] == 'c') E++;
        else if(CardsN1[i] == 'C' || CardsN1[i] == 'c') C++;  

    }

  //Verificando se foi Royal Flush
    if(O == 5 || P == 5|| E == 5 || C == 5){
        for(i = 0 ; i < 5; i++){
            if(CardsV1[i] == 'K'){
                RoyalFlush ++;
                continue;
            }
            if(CardsV1[i] == 'A'){
                RoyalFlush ++;
                continue;
            }
            if(CardsV1[i] == 'J'){
                RoyalFlush ++;
                continue;
            }
            if(CardsV1[i] == 'Q') {
                RoyalFlush ++;
                continue;
            }
            if(CardsV1[i] == '10'){
                RoyalFlush ++;
                continue;
            }
        }
        
        console.log("=="+RoyalFlush);
        if(RoyalFlush == 5) console.log("ROYAL FLUSH!");
    }
        

    //Verificando se é Straight Flush
        if(O == 5 || P == 5|| E == 5 || C == 5){
            var auxord, vetaux = new Array;
            var auxSF = 0, maiorSF, maiorF;
            
            vetaux = converte(CardsV1);

            

            for(i = 0; i < 5; i++){
                for(j = 0;j < 5; j++){
                    if(vetaux[i] < vetaux[j]){
                        auxord = vetaux[i];
                        vetaux[i] = vetaux[j];
                        vetaux[j] = auxord;
                    }
                }
            }
            for(i = 0;i < 5;i++){
                if(vetaux[i]+1 == vetaux[i+1]){
                    auxSF++;
                }
            }
            
            if(auxSF == 4){
                StraightFlush = 1;
                maiorSF = vetaux[4];
                console.log("Temos um Straight Flush!");
            }
            //flush
            else{
                Flush = 1;
                maiorF = vetaux[4];
                console.log("Temos um Flush!");
            }

            
        }

        //Verificando se temos uma quadra
        if(O != 5 || P != 5|| E != 5 || C != 5){
            var vetaux = new Array, auxquad = 0;
            var cartasquad = 0, cartaseparada = 0;
            var auxFH = 0, auxord = 0;
            var auxtrio = 0, auxpar = 0, auxale, controle = 0, auxS = 0;
            var maiorPar = 0, maiorTrinca = 0, dois_Pares = 0, auxkicker;
            
            vetaux = converte(CardsV1);

           
            for(i = 0;i < 5; i++){
                if(vetaux[i] == vetaux[i+1] && (i+1) < 5) auxquad++;
            }

            if(auxquad == 3){
                //teremos uma quadra, então temos que manter o valor das cartas repetidas e da última carta armazenados para um possível empate.
                for(i = 0;i < 5;i++){
                    if(vetaux[i] == vetaux[i+1] && (i+1) < 5) cartasquad = vetaux[i];
                    else if(vetaux[i] != vetaux[i+1] && (i+1) < 5)cartaseparada = vetaux[i];
                }
                Quadra = 1;

            }
            //console.log("==>"+cartasquad+" "+cartaseparada);
      
            
           //verificando se temos um Full House 

           // vetaux = converte(CardsV1);

            for(i = 0;i < 5;i++){
                for(j = 0;j<5;j++){
                    if(vetaux[i] == vetaux[j]){
                        auxFH++;
                        auxale = vetaux[i];
                    } 
                }
                if(auxFH == 2){
                    auxpar = auxale;
                    if(auxpar > maiorPar) maiorPar = auxpar;
                    //console.log("-->"+auxFH);
                    if(controle = 1) break;
                    else controle = 1;
                    
                }
                if(auxFH == 3){
                    auxtrio = auxale;
                    if(controle = 1) break;
                    else controle = 1;
                    
                }
                auxFH = 0;
            }
            if(auxtrio != 0 && auxpar != 0){
                FullHouse = 1;
                 console.log("-->"+auxtrio+"-->"+auxpar);
            }
            else if(auxtrio != 0 && auxpar == 0){
                Trinca = 1;
                maiorTrinca = MaiorCarta(vetaux);
                console.log("Trinca-->"+maiorTrinca);
            }
            else if(auxtrio == 0 && auxpar != 0){
                Par = 1;
                console.log("maaior Par-->"+maiorPar);
            }

            //verificando se temos uma Sequência 
            //temos que organizar o vetor primeiro
            for(i = 0; i < 5; i++){
                for(j = 0;j < 5; j++){
                    if(vetaux[i] < vetaux[j]){
                        auxord = vetaux[i];
                        vetaux[i] = vetaux[j];
                        vetaux[j] = auxord;
                    }
                }
            }

            for(i = 0;i < 5;i++){
                if(vetaux[i]+1 == vetaux[i+1]){
                    auxS++;
                }
            }
            if(auxS == 4){
                console.log("sequencia-->"+auxS);
                Sequencia = 1;
            }
            //terrmino da verificação se temos uma Sequência 

            //verificando dois pares
            var contPares = 0; //variavel para ajudar a contar os pares
            for(i = 0;i < 5;i++){
                for(j = 0;j < 5;j++){
                    if(vetaux[i] == vetaux[j]) contPares++;
                    if(vetaux[i] != vetaux[j]) auxkicker = vetaux[i];
                }
                if(contPares == 2) dois_Pares++;
                contPares = 0;

            }
            if(dois_Pares == 4) DoisPares = 1;
           // console.log("DOIS PARES = "+dois_Pares+" kicker = "+auxkicker);
            if(Par == 1 && DoisPares == 1) Par = 0;
            //terminamos de verificar se existem dois pares

            if(RoyalFlush == 0 && StraightFlush == 0 && Quadra == 0 && FullHouse == 0 && Flush == 0 &&Sequencia == 0 && Trinca == 0 && DoisPares == 0 && Par == 0){
                console.log("Maior carta = "+vetaux[4]);
            }

        }

  
    //alert("Mao01 = " +aux[1]);

    


}


function separa(sep, mao) {
    var arr = new Array();
    index = -1;
 
    while (mao.indexOf(sep) != -1) {
        index++;
        arr[index] = mao.substring(0, mao.indexOf(sep));
        mao = mao.substring(mao.indexOf(sep) + sep.length);
    }
    index++;
 
    if (mao) arr[index] = mao;
 
    return arr;
}

function converte(CardsV1){
    var i;
    var vetaux = new Array;
    
    for(i = 0;i < 5;i++){
               
        if(CardsV1[i] == 'K' || CardsV1[i] == 'k') vetaux[i] = 13;
        else if(CardsV1[i] == 'Q' || CardsV1[i] == 'q') vetaux[i] = 12;
        else if(CardsV1[i] == 'J' || CardsV1[i] == 'j') vetaux[i] = 11;
        else if(CardsV1[i] == '10') vetaux[i] = 10;
        else if(CardsV1[i] == '9') vetaux[i] = 9;
        else if(CardsV1[i] == '8') vetaux[i] = 8;
        else if(CardsV1[i] == '7') vetaux[i] = 7;
        else if(CardsV1[i] == '6') vetaux[i] = 6;
        else if(CardsV1[i] == '5') vetaux[i] = 5;
        else if(CardsV1[i] == '4') vetaux[i] = 4;
        else if(CardsV1[i] == '3') vetaux[i] = 3;
        else if(CardsV1[i] == '2') vetaux[i] = 2;
        else if(CardsV1[i] == 'A' || CardsV1[i] == 'a') vetaux[i] = 1;  
    }

    return vetaux;

}


function MaiorCarta(vetaux){

    var maior = 0, i, j;

    for(i = 0; i < 5; i++){
        for(j = 0;j < 5; j++){
            if(vetaux[i] > vetaux[j]) maior = vetaux[i];
        }
    }

    return maior;

}