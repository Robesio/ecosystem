const xhr = new XMLHttpRequest();
const btn = document.getElementById("btn");
const msg = document.getElementById("mensagem");
const tableRotas = document.getElementById("corporotas");
const urlRotas = "https://projetorrw.000webhostapp.com/src/controll/routes/";

function carregarRotas() {
    fetch(urlRotas + "route.rotas.php?id=0")
        .then(function (resp) {
            if (!resp.ok)
                throw new Error("Erro ao executar requisição: " + resp.status)
            return resp.json()
        })
        .then(function (data) {
            data.forEach((val) => {
                let r = document.createElement("tr");
                r.innerHTML = `<tr><td>${val.id} </td>`;
                r.innerHTML += `<td>${val.veiculos_id} </td>`;
                r.innerHTML += `<td>${val.nome} </td>`;
                r.innerHTML += `<td>${val.dia_horario} </td>`;
                tableRotas.appendChild(r);
            })
        })
        .catch(function (error) {
            console.error(error.message)
        })
}