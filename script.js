const city = document.querySelector("#search");
const state = document.getElementById("estado");

const btnsearch = document.querySelector(".btnsearch");

//fetch list estados
async function getStates() {
    const response = await fetch(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
    );
    const dados = await response.json();

    const arr = `${dados.map((item) => `<option value=${item.sigla}>${item.nome}</option>`)}   `;

    state.lastElementChild.insertAdjacentHTML("afterend", arr);

}

getStates();

//fetch id estado
function idEstado(name) {
    async function findEstado() {
        const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
        const dados = await response.json();

        const id = dados.find((item) => item.sigla === name);

        cidadesApi(id.id);
    }

    findEstado();
}

// list cites
async function cidadesApi(idState) {
    const response = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idState}/municipios`
    );
    const data = await response.json();

    city.innerHTML = `${data.map((item) => `<option>${item.nome}</option>`)}`;
}

//onchange estado
function stadeChoose() {
    const stateSearch = state.value;
    idEstado(stateSearch);
    
}

//result data
function teste() {
    const citySearch = city.value.replace(" ", "%20");
    const stateSigla = state.value;

    if(citySearch !== '' && stateSigla !==""){
        //name state
        async function findEstado() {
            const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
            const dados = await response.json();

            const id = dados.find((item) => item.sigla === stateSigla);
            getApi(id.nome);
        }

        findEstado();

        console.log(citySearch, "estado: ", stateSigla);
        //result api
        async function getApi(state) {
            const stateSearch = state.replace(" ", "%20");
            const response = await fetch(
                `https://weather.contrateumdev.com.br/api/weather/city/?city=${citySearch},${stateSearch}`
            );
            const data = await response.json();

            if (data) {
            }
            console.log(data, stateSearch);
        }
    }else{
        console.log("erro")
    }
}
