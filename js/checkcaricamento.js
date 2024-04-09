function checkcaricamento(anno) {
    let checkdata = new FormData();
    checkdata.append('id_anagrafica', global.id_anagrafica);

    fetch(
        `${sito}kernel/Aj?gp=recharge&action=checkanno`,
        {
            method: 'POST',
            body: checkdata,
        }
    ).then((response) => response.json())
        .then((result) => {
            global.annotrovato="false";
            console.log(result)
            let annualita = result.anni_dati_recharge.split(",")

            console.log(annualita)
            annualita.forEach(element => {
                if (element == anno) {
                    console.log("eccolo!");
                    global.annotrovato=true;
                   return;

                    
                }
                
            });
            console.log("annotrovato"+global.annotrovato)
            let InviaDati=document.getElementById("Invia_Dati")
            if(global.annotrovato==true){
                InviaDati.setAttribute("disabled",true);
                InviaDati.value="Caricamento per l'anno "+anno+ " già eseguito!"
                log.info("Caricamento per l'anno "+anno+ " già eseguito!");
            }else{
                console.log("rimuovi")
                InviaDati.removeAttribute("disabled");
                InviaDati.value="Esegui Caricamento"
                log.info("Caricamento per l'anno "+anno+ " da eseguire!");
            }
        })
}

document.querySelector('#anno').addEventListener("change",(event)=>{
    checkcaricamento( event.target.value)
})