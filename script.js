const city = document.querySelector("#search");
const state = document.getElementById("estado");

const btnsearch = document.querySelector(".btnsearch");


 async function getStates(){
    const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
    const dados = await response.json();
    
   
    state.innerHTML=`${dados.map((item)=> `<option value=${item.sigla}>${item.nome}</option>`)}   `
   /*  console.table(dados); 
     */

 }

 getStates()


 function idEstado(name){
    async function findEstado(){

    
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        const dados = await response.json();
        
        const id = dados.find((item) => item.sigla === name)
        idState=(id.id)

        cidadesApi(id.id)
        
    }

    findEstado()
 }


 async function cidadesApi(idState){
    const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idState}/municipios`)
    const data = await response.json();
    console.log(data)

    city.innerHTML=`${data.map((item)=>`<option>${item.nome}</option>`)}`
    
}


function cidades(){
    const stateSearch = state.value;
    idEstado(stateSearch)
    console.log(stateSearch, "nome estado")
    

   
}




function teste() {
    const citySearch = city.value.replace(" ", "%20");
    const stateSigla = state.value;


    async function findEstado(){

    
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        const dados = await response.json();
        
        const id = dados.find((item) => item.sigla === stateSigla)
        getApi(id.nome.replace(" ", "%20"));
        
        
        
    }

    findEstado()

    console.log(citySearch, "estado: ", stateSigla);

   
    async function getApi(stateSearch) {
        const response = await fetch(
            `https://weather.contrateumdev.com.br/api/weather/city/?city=${citySearch},${stateSearch}`
        );
        const data = await response.json();

        if (data) {
        }
        console.log(data, stateSearch);
    }

    
}
