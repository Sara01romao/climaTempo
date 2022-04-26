
const city = document.querySelector('#search');
const state = document.getElementById("estado");

const  btnsearch = document.querySelector('.btnsearch')




function teste(){
    const citySearch= city.value.replace(" ", "%20")
    const stateSearch=  state.value.replace(" ", "%20")
    
    console.log(citySearch, "estado: ", stateSearch)

    async function getApi(){
    const response = await fetch(`https://weather.contrateumdev.com.br/api/weather/city/?city=${citySearch},${stateSearch}`);
    const data = await response.json()

    if(data){
        
    }
    console.log(data)
}

 getApi()

}



