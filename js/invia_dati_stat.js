

function csv_temp_line(csv_temp) {
    let csv_temp_string = ""
    for (let i = 0; i < csv_temp.length; i++) {
        //  log.info(csv_temp)
        csv_temp_string += csv_temp[i]
    }
    return (csv_temp_string + "\n")
}




document.querySelector('#Invia_Dati_Stat').addEventListener('click', () => {
    log.info('********Invia_Dati_Stat*******');
    const NOTIFICATION_TITLE = 'Recharge'
    const NOTIFICATION_BODY = 'Grazie per averci inviato i tuoi dati, le statistiche sono state aggiornate e pubblicate sul sito www.reweicoli.it'
    const NOTIFICATION_BODY_ERROR = 'Qualcosa è andato storto,contatta lo staff Reweicoli per ricevere assistenza'
    let file_dir = fs.readdirSync("C:\\MCTC\\Archivio")
    log.info(file_dir)
    log.info('file_dir'+file_dir);

    let start_dir = "C:\\MCTC\\Archivio\\"
    file_dir = fs.readdirSync(start_dir)

    let intestazione = "NomeFileMCTCNet;CAP;Nome;Tipo;Citta;Targa;Fabbrica;EsitoRevisione;CognomeDenominazione;Indirizzo;Provincia;DataEffettiva"
    let csv_temp = []
    //dichiaro le variabili dei futuri fogli csv
    let csv = ""
    let gennaio = ""
    let febbraio = ""
    let marzo = ""
    let aprile = ""
    let maggio = ""
    let giugno = ""
    let luglio = ""
    let agosto = ""
    let settembre = ""
    let ottobre = ""
    let novembre = ""
    let dicembre = ""

    let mm = 0
    for (let i = 0; i < file_dir.length; i++) {
        if (file_dir[i].includes(".REV") || file_dir[i].includes(".rev")) {
            let filename = start_dir + file_dir[i]
            try {
                const data = fs.readFileSync(filename, 'utf8')
                let txt = data.split("\r\n")
                let row_name = null
                let start = false
                csv_temp = []
                for (let y = 0; y < txt.length; y++) {
                    if (txt[y].includes("tipo=\"AC2\"")) {
                        start = true
                    } else if (txt[y].includes("</rev:test>")) {
                        start = false
                    }
                    if (start) {
                        row_name = txt[y].split("=")
                        csv_temp[0] = ""
                        // log.info("row_name->"+row_name)
                        switch (row_name[0]) {
                            case "NomeFileMCTCNet":
                                csv_temp[1] = write_txt(row_name[1]);
                                // csv += write_txt(row_name[1]);
                                continue;
                            case "CAP":
                                csv_temp[2] = write_txt(row_name[1]);
                                // csv += write_txt(row_name[1]);
                                continue;
                            case "Nome":
                                csv_temp[3] = write_txt(row_name[1]);
                                // csv += write_txt(row_name[1]);
                                continue;
                            case "Tipo":
                                csv_temp[4] = write_txt(row_name[1]);
                                // csv += write_txt(row_name[1]);
                                continue;
                            case "Citta":
                                csv_temp[5] = write_txt(row_name[1]);
                                // csv += write_txt(row_name[1]);
                                continue;
                            case "Targa":
                                csv_temp[6] = write_txt(row_name[1]);
                                // csv += write_txt(row_name[1]);
                                continue;
                            case "Fabbrica":
                                csv_temp[7] = write_txt(row_name[1]);
                                // csv += write_txt(row_name[1]);
                                continue;
                            case "EsitoRevisione":
                                csv_temp[8] = write_txt(row_name[1]);
                                // csv += write_txt(row_name[1]);
                                continue;
                            case "CognomeDenominazione":
                                csv_temp[9] = write_txt(row_name[1]);
                                // csv += write_txt(row_name[1]);
                                continue;
                            case "Indirizzo":
                                csv_temp[10] = write_txt(row_name[1]);
                                // csv += write_txt(row_name[1]);
                                continue;
                            case "Provincia":
                                csv_temp[11] = write_txt(row_name[1]);
                                // csv += write_txt(row_name[1]);
                                continue;
                            case "DataEffettiva":
                                csv_temp[12] = write_txt(row_name[1]);
                                // csv += write_txt(row_name[1]);
                                mm = parseInt(write_txt(row_name[1]).substring(2, 4));
                                continue;
                        }
                    }
                }
            } catch (err) {
                //console.error(err)
            }
            csv += "\n"

            switch (mm) {
                case 1:
                    gennaio += csv_temp_line(csv_temp); continue;
                case 2:
                    febbraio += csv_temp_line(csv_temp); continue;
                case 3:
                    marzo += csv_temp_line(csv_temp); continue;
                case 4:
                    aprile += csv_temp_line(csv_temp); continue;
                case 5:
                    maggio += csv_temp_line(csv_temp); continue;
                case 6:
                    giugno += csv_temp_line(csv_temp); continue;
                case 7:
                    luglio += csv_temp_line(csv_temp); continue;
                case 8:
                    agosto += csv_temp_line(csv_temp); continue;
                case 9:
                    settembre += csv_temp_line(csv_temp); continue;
                case 10:
                    ottobre += csv_temp_line(csv_temp); continue;
                case 11:
                    novembre += csv_temp_line(csv_temp); continue;
                case 12:
                    dicembre += csv_temp_line(csv_temp); continue;
            }
        }
    }
    csv = gennaio + febbraio + marzo + aprile + maggio + giugno + luglio + agosto + settembre + ottobre + novembre + dicembre

    start_dir += global.CodRew + "-"
    anno_ultima_revisione = document.getElementById('annoStat').value

    fs.writeFile(start_dir + anno_ultima_revisione + '.csv', csv, () => { log.info("File Creato!") })
    i = 1;
    //  if(document.getElementById('1').checked){
    fs.writeFile(start_dir + anno_ultima_revisione + '_' + i + '.csv', gennaio, () => { log.info("File " + i + " Creato!") })
    // }
    i++;
    //if(document.getElementById('2').checked){
    fs.writeFile(start_dir + anno_ultima_revisione + '_' + i + '.csv', febbraio, () => { log.info("File " + i + " Creato!") })
    //}
    i++
    //if(document.getElementById('3').checked){
    fs.writeFile(start_dir + anno_ultima_revisione + '_' + i + '.csv', marzo, () => { log.info("File " + i + " Creato!") })
    // }
    i++;
    //if(document.getElementById('4').checked){
    fs.writeFile(start_dir + anno_ultima_revisione + '_' + i + '.csv', aprile, () => { log.info("File " + i + " Creato!") })
    // }
    i++;
    //if(document.getElementById('5').checked){
    fs.writeFile(start_dir + anno_ultima_revisione + '_' + i + '.csv', maggio, () => { log.info("File " + i + " Creato!") })
    //}
    i++;
    //if(document.getElementById('6').checked){
    fs.writeFile(start_dir + anno_ultima_revisione + '_' + i + '.csv', giugno, () => { log.info("File " + i + " Creato!") })
    //}
    i++;
    //if(document.getElementById('7').checked){
    fs.writeFile(start_dir + anno_ultima_revisione + '_' + i + '.csv', luglio, () => { log.info("File " + i + " Creato!") })
    //}
    i++;
    //if(document.getElementById('8').checked){
    fs.writeFile(start_dir + anno_ultima_revisione + '_' + i + '.csv', agosto, () => { log.info("File " + i + " Creato!") })
    //}
    i++;
    //if(document.getElementById('9').checked){
    fs.writeFile(start_dir + anno_ultima_revisione + '_' + i + '.csv', settembre, () => { log.info("File " + i + " Creato!") })
    //}
    i++;
    //if(document.getElementById('10').checked){
    fs.writeFile(start_dir + anno_ultima_revisione + '_' + i + '.csv', ottobre, () => { log.info("File " + i + " Creato!") })
    //}
    i++;
    //if(document.getElementById('11').checked){
    fs.writeFile(start_dir + anno_ultima_revisione + '_' + i + '.csv', novembre, () => { log.info("File " + i + " Creato!") })
    //}
    i++;
    //if(document.getElementById('12').checked){
    fs.writeFile(start_dir + anno_ultima_revisione + '_' + i + '.csv', dicembre, () => { log.info("File " + i + " Creato!") })
    //}
    i++;

    setTimeout(() => {
        const formData_load = new FormData();
        let contents = []
        let blob_single = []
        let blob_log = []
        let contentslog=[]
     
        contents[0] = fs.readFileSync(start_dir + anno_ultima_revisione + '.csv');
        contentslog[0] = fs.readFileSync(global.appDataPath + '/logs'+ '/main.log');
        blob_single[0] = new Blob([contents[0]])
        blob_log[0] = new Blob([contentslog[0]])

        for (let i = 0; i < 13; i++) {
            if (fs.existsSync(start_dir + anno_ultima_revisione + '_' + i + '.csv')) {
                contents[i] = fs.readFileSync(start_dir + anno_ultima_revisione + '_' + i + '.csv');
                blob_single[i] = new Blob([contents[i]])
            }
        }

        formData_load.append('id_anagrafica', global.id_anagrafica);
        formData_load.append('CodRew', global.CodRew);
        formData_load.append('anno', global.current_year);
        formData_load.append('Anagrafica', global.anagrafica);
        formData_load.append('Tipo', "dati statistici");
        for (let i = 0; i < blob_single.length; i++) {
            formData_load.append('blob' + i, blob_single[i]);
        }
        formData_load.append('blob_log', blob_log[0]);
        fetch(
            `${sito}/kernel/Aj?gp=recharge&action=caricaFilesDaRechargeStat`,
            {
                method: 'POST',
                body: formData_load,
            }
        )
            .then((response) => response.json())
            .then((result) => {
                log.info(result)
                // new window.Notification(result.type, { body: result.msg }).onclick = () => shell.openExternal('https://app.reweicoli.it/')
                document.getElementById('invia_dati_result_stat').innerHTML = "<center><strong>Aggiornamento eseguito con successo<br></strong></center>"
                document.getElementById('invia_dati_result_stat').classList.add("successo")
                
               
            })
            .catch((error) => {
                log.info(error)
                document.getElementById('invia_dati_result_stat').innerHTML = "<center class='text-danger'><strong>Qualcosa è andato storto, <br>contatta lo staff Reweicoli per ricevere assistenza</strong></center>"
                document.getElementById('invia_dati_result_stat').classList.add("errore")
                fetch(
                    `${sito}/kernel/Aj?gp=recharge&action=sendLog`,
                    {
                        method: 'POST',
                        body: formData_load,
                    }
                ).then((response) => response.json())
                .then((result) => {console.log(result)})
            });
    }, 128);
})


document.querySelector('#aprisito').addEventListener("click",()=>{
    shell.openExternal('https://app.reweicoli.it/')
})
//
//
