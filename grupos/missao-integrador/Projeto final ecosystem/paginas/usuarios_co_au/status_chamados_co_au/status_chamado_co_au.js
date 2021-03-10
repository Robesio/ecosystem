const msg = document.querySelector("#mensagem");
const xhr = new XMLHttpRequest();
const tableStatus = document.querySelector("#corpostatus");
const urlchamado = "https://projetorrw.000webhostapp.com/src/controll/routes/";

function carregaChamado() {
    fetch(urlchamado + "route.status_chamado.php?id=0")
        .then(function (resp) {
            if (!resp.ok)
                throw new Error("Erro ao executar requisição: " + resp.status);
            return resp.json();
        })
        .then(function (data) {
            data.forEach((val) => {
                let row = document.createElement("tr");
                row.innerHTML = `<tr><td>${val.id}</td>`;
                row.innerHTML += `<td>${val.status_cha}</td>`;
                tableStatus.appendChild(row);
            });
        })
        .catch(function (error) {
            console.error(error.message);
        });
}