const sito = "https://app.reweicoli.it/"
const  log =require ('electron-log/renderer')
async function internet_status() {

    fetch(`${sito}/kernel/Aj?gp=recharge&action=checkOnline`).then(response => response.json()).then(result => {
        
        
        console.log("-res-"+result.online)
        if(result.online){
            document.getElementById("internet_status").innerHTML = 'online'
            document.getElementById('internet_check').style.display = "none"
            console.log('online')
            log.info("internet check - > online")
        }else{
            document.getElementById("internet_status").innerHTML = 'offline'
            document.getElementById('internet_check').style.display = "block"
            document.getElementById('login').style.display = "none"
            log.info("internet check - > online")
        }
    })
}

