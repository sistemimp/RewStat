
function checkanno() {
    const checkdata = new FormData();
    checkdata.append('id_anagrafica', global.id_anagrafica);

    fetch(
        `${sito}kernel/Aj?gp=recharge&action=checkanno`,
        {
            method: 'POST',
            body: checkdata,
        }
    ).then((response) => response.json())
        .then((result) => {
            console.log(result)
            let annualita = result.anni_dati_recharge.split(",")
            console.log(annualita)
            annualita.forEach(element => {
                if (element == global.current_year) {
                    let InviaDati = document.getElementById("Invia_Dati")
                    console.log("eccolo!");
                    InviaDati.value = "Caricamento per l'anno " + global.current_year + " già eseguito!"
                    InviaDati.setAttribute("disabled", true);
                }
            });
        })
}

