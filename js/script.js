const city = document.querySelector("#cidade");
const state = document.getElementById("estado");
const btnsearch = document.querySelector(".btnsearch");
const error = document.querySelector(".error");
const temp = document.querySelector(".temp");


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

async function findEstado(name) {
    const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
    const dados = await response.json();

    const id = dados.find((item) => item.sigla === name);

    cidadesApi(id.id);
}

function idEstado(name) {
    if (name) {
        findEstado(name);
    }
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
    temp.innerHTML = "";
    const stateSearch = state.value;
    if (stateSearch !== "") {
        idEstado(stateSearch);
        city.removeAttribute("disabled");
    } else {
        city.innerHTML = `<option value="" disabled="disabled">Selecione</option>`;
        city.setAttribute("disabled", "disabled");
    }
}

function cityChoose() {
    temp.innerHTML = "";
}

//result data
function teste() {
    const citySearch = city.value.replace(" ", "%20");
    const stateSigla = state.value;

    if (citySearch !== "" && stateSigla !== "") {
        //name state
        error.innerHTML = "";
        async function findEstado() {
            const response = await fetch(
                "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
            );
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
            console.log(data);

            if (data.cod === 200) {
                temp.innerHTML = `
                <p>${data.name} -${stateSigla}</p> 
                <h2>${data.main.temp.toFixed()} ºC </h2> 
                `;
            } else {
                temp.innerHTML = `<p>Cidade não encontrada<br></p> <img src="./images/cloud.svg" alt=""/>`;
            }
        }
    } else {
        error.innerHTML = "Selecione o estado";
        console.log("erro");
    }
}
