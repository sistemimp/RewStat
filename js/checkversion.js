var pjson = require('./package.json');

log.info("Version info->" + pjson.version)
log.info("Version info->" + pjson.version);
const formData = new FormData();

formData.append('version', pjson.version);


fetch(`${sito}kernel/Aj?gp=tools&action=getVersioneRecharge`, {
    method: 'POST',
    body: formData
})
    .then(response => response.json())
    .then(result => {
        log.info("-res-"+result)
        if (result.versione_recharge == pjson.version) {
            log.info('Success:', result);
            log.info('getVersioneRecharge->'+ result);
        } else {
            newversion = true;
            global.version = pjson.version;
            log.info('getVersioneRecharge->'+ result);
            document.getElementById('newversion').style.display = "block"
            document.getElementById('exe').style.display = "none"

        }
    })
    .catch(error => {
        log.info('Error:', error);
        log.info('Error:'+`${sito}kernel/Aj?gp=tools&action=getVersioneRecharge`);
        log.info('Error:'+ error);
        log.info('Controlla la connessione ad internet:');

        console.error('Controlla la connessione ad internet:', error);
        document.getElementById('internet_check').style.display = "block"
        document.getElementById('exe').style.display = "none"
    });



    
document.querySelector("#upgrade").addEventListener('click', () => {
    window.open(`${sito}download/recharge.html`);
})
