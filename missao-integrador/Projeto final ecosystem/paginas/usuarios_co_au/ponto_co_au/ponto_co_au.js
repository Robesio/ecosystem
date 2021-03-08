const xhr = new XMLHttpRequest();
const btn = document.getElementById("btn");
const msg = document.getElementById("mensagem");
const tablePontos = document.getElementById("corpopontos");
const urlPontos = "https://projetorrw.000webhostapp.com/src/controll/routes/";

function carregarPontos() {
    fetch(urlPontos + "route.pontos.php?id=0")
        .then(function (resp) {
            if (!resp.ok)
                throw new Error("Erro ao executar requisição: " + resp.status)
            return resp.json()
        })
        .then(function (data) {
            data.forEach((val) => {
                let r = document.createElement("tr");
                r.innerHTML = `<tr><td>${val.id} </td>`;
                r.innerHTML += `<td>${val.rotas_id} </td>`;
                r.innerHTML += `<td>${val.lat} </td>`;
                r.innerHTML += `<td>${val.longi} </td>`;
                tablePontos.appendChild(r);
            })
        })
        .catch(function (error) {
            console.error(error.message)
        })
}