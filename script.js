
const city = document.querySelector('#search');

const  btnsearch = document.querySelector('.btnsearch')




function teste(){
    
    console.log(city.value.replace(" ", "%20"))
}


/* async function getApi(){
    const response = await fetch('https://weather.contrateumdev.com.br/api/weather/city/?city=presidente%20prudente,são%20paulo');
    const data = await response.json()
    console.log(data)
}

getApi() */