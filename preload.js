const pjson = require('./package.json');
const tempDirectory = require('temp-dir');
let appData = require('app-data-folder')
let applicationName = 'RewStat';
const fs = require('fs');
const sito = "https://app.reweicoli.it/"
const  log =require ('electron-log/renderer')


//console.log(global.appdata)
let appDataPath = appData(applicationName); // returns a platform specific path to the default location for application data
/* rimuovi il log */

if(fs.existsSync(appDataPath + "/logs/main.log")){
    fs.unlinkSync(appDataPath + "/logs/main.log")
}

console.log("appDataPath->"+appDataPath)
global.appDataPath=appDataPath

log.initialize();  
log.info('Log from the renderer process');


window.addEventListener('DOMContentLoaded', () => {
   
    document.getElementById("logout").style.display="none"
    internet_status();
    setInterval(internet_status, 50000)

    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron', 'app']) {
        replaceText(`${dependency}-version`, process.versions[dependency])

    }

    document.getElementById("noaccess").style.display = "none"
    document.getElementById("newversion").style.display = "none"
    document.getElementById("login").style.display = "none"
    document.getElementById('internet_check').style.display = "none"

    console.log(pjson.version);
    log.info('Check Version: '+pjson.version);
    ///////////////////////////////////////////////////////////////////////////
    // acquisisce l'anno corrente
    let date = new Date().getFullYear();
    document.getElementById('anno').value=date
    document.getElementById('annoStat').value=date
    log.info('Anno Statistiche->'+date);
    console.log(date)
    global.current_year = date;
    ///////////////////////////////////////////////////////////////////////////
    /* cerca il nome del cliente dal file config creato nella login*/
    let temp_config = `${tempDirectory}\\ReCharge\\config.cfg`
    fs.mkdir(`${tempDirectory}\\ReCharge\\`, (err) => {
        if (err) {
            console.log("Directory:", err);
            return;
        }
    })
    console.log("preload->" + temp_config);
    log.info('TempConfig:'+temp_config);

    fs.readFile(temp_config, 'utf8', (err, data) => {
        document.getElementById("exe").style.display = "block"
        try {
            let obj = JSON.parse(data)
            console.warn(obj);
            if( obj._dati.anagrafica.length>0 ){
              global.anagrafica=obj._dati.anagrafica
              document.getElementById("nomecentro").innerHTML = "<strong>" + obj._dati.anagrafica + "</strong>"
              document.getElementById("logout").style.display="block"
            }else{
                document.getElementById("nomecentro").innerHTML = "<strong>" + obj._dati.anagrafica + "</strong>"
                document.getElementById("logout").style.display="none"
            }
            ///////////////////////////////////////////////////////////////////////////
            // controllo se quest'anno è già stato attivato Recharge
            const checkdata = new FormData();
            checkdata.append('id_anagrafica', obj.id_anagrafica);
            global.id_anagrafica=obj.id_anagrafica;
            global.CodRew=obj._dati.cod_reweicoli;
            console.log(obj.id_anagrafica);
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
                            let InviaDati=document.getElementById("Invia_Dati")
                            console.log("eccolo!");
                            InviaDati.value="Caricamento per l'anno "+global.current_year+ " già eseguito!"
                            InviaDati.setAttribute("disabled", true);
                        }
                    });
                })
                //////////////////////////////////////////////////////////////////////
        } catch (error) {
            console.warn("%temp% config non trovata")
            document.getElementById('login').style.display = "block"
            document.getElementById("exe").style.display = "none"
        }

    })



})


