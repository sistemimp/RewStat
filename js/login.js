const tempDirectory = require('temp-dir');
const fs = require('fs');
const { shell } = require('electron')

document.querySelector('#btn_login').addEventListener('click', () => {
    let email = document.querySelector("#email").value;
    let pwd = document.querySelector("#password").value;
    log.info(email + " " + pwd)

    const formData = new FormData();

    formData.append('email', email);
    formData.append('password', pwd);

    fetch(`${sito}kernel/Aj?gp=tools&action=login`, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(result => {
            if (result.msg == true) {

                console.warn("Temp->" + tempDirectory)

                let temp_config = `${tempDirectory}\\ReCharge\\config.cfg`

                fs.mkdir(`${tempDirectory}\\ReCharge\\`, (err) => {
                    if (err) {
                        log.info("error occurred in creating new directory", err);
                        return;
                    }
                }
                )
                let txt_cfg = result._data
                fs.writeFile(temp_config, JSON.stringify(txt_cfg), () => { log.info("File Creato!") })
                document.getElementById("nomecentro").innerHTML = '<span><strong>' + result._data._dati.anagrafica + '</strong></span>'
                log.info('Success:', result);
                global.id_anagrafica = result._data.id_anagrafica
                global.cod_reweicoli = result._data._dati.cod_reweicoli
                log.info("id=" + global.id_anagrafica)
                document.getElementById("exe").style.display = "block"
                document.getElementById("logout").style.display="block"
                log.info(temp_config);
                fs.readFile(temp_config, 'utf8', (err, data) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                    log.info(data);
                    let obj = JSON.parse(data);

                    global.cod_reweicoli = obj._dati.cod_reweicoli
                    let localtoken = obj._dati.token_recharge
                    log.info("localtoken-> " + obj._dati.token_recharge);
                    const formData = new FormData();

                    formData.append('token_recharge', localtoken);

                    fetch(`${sito}kernel/Aj?gp=tools&action=tokenRecharge&token_recharge=${localtoken}`, {
                        method: 'POST',
                        body: formData
                    }).then(response => response.json())
                        .then(result => {
                            log.info('Success:', result);
                            if (result.msg == true) {
                                global.cod_reweicoli = result._data._dati.cod_reweicoli
                                global.id_anagrafica = result._data.id_anagrafica
                                log.info("id=" + global.id_anagrafica)
                                log.info("cod_rew---->" + global.cod_reweicoli)


                                document.getElementById('exe').style.display = "block"
         
                                document.getElementById('login').style.display = "none"


                                log.info(result._data._dati.statistiche)         
                                checkanno()
                            }


                        })
         
                })
            } else {
                document.getElementById('login_result').innerHTML = "<center><strong>Login Errata<br>Verifica Le tue credenziali</strong></center>"
                //document.getElementById('email').value = ""
                document.getElementById('password').value = ""
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
})


document.querySelector('#recupero_pwd').addEventListener('click', () => {
    shell.openExternal('https://app.reweicoli.it/clienti/reset?reset=forgot')
})

document.querySelector('#logout').addEventListener('click', () => {
    // *** logout ** 

    if (confirm("Sicuro di voler disconnettere questa postazione?") == false) {
        return
    }
    fs.unlinkSync(`${tempDirectory}\\ReCharge\\config.cfg`);
    window.location.reload();

})