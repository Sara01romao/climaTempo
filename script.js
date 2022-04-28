const city = document.querySelector("#search");
const state = document.getElementById("estado");
const estadoArr = [];

const btnsearch = document.querySelector(".btnsearch");


 async function getStates(){
    const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
    const dados = await response.json();
    
   
    state.innerHTML=`${dados.map((item)=> `<option value=${item.nome}>${item.nome}</option>`)}   `
   /*  console.table(dados); 
     */

 }

 getStates()


 function idEstado(name){
    async function findEstado(){

    
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        const dados = await response.json();
        
        const id = dados.find((item) => item.nome === name)
        console.log(id)
   
    }

    findEstado()
 }

function cidades(){
    const stateSearch = state.value;
    idEstado(stateSearch)
    console.log(stateSearch, "nome estado")
  /*   async function cidades(){
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios`)
        const data = await response.json();

    } */
}




/* function teste() {
    const citySearch = city.value.replace(" ", "%20");
    const stateSearch = state.value.replace(" ", "%20");

    console.log(citySearch, "estado: ", stateSearch);

    if(citySearch !== "" && stateSearch !== ""){
        getApi();
    }
    async function getApi() {
        const response = await fetch(
            `https://weather.contrateumdev.com.br/api/weather/city/?city=${citySearch},${stateSearch}`
        );
        const data = await response.json();

        if (data) {
        }
        console.log(data);
    }

    
}
 */