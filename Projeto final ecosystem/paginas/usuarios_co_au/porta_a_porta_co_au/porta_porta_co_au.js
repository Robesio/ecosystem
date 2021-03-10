const msg = document.querySelector("#mensagem");
const xhr = new XMLHttpRequest();
const tablePorta = document.querySelector("#corpoporta");
const urlPorta = "https://projetorrw.000webhostapp.com/src/controll/routes/";

function carregarPorta() {
    fetch(urlPorta + "route.porta_a_porta.php?id=0")
        .then(function (resp) {
            if (!resp.ok)
                throw new Error("Erro ao executar requisição: " + resp.status);
            return resp.json();
        })
        .then(function (data) {
            data.forEach((val) => {
                let row = document.createElement("tr");
                row.innerHTML = `<tr><td>${val.id}</td>`;
                row.innerHTML += `<td>${val.cooperativas_id}</td>`;
                row.innerHTML += `<td>${val.descricao}</td>`;
                row.innerHTML += `<td>${val.lat}</td>`;
                row.innerHTML += `<td>${val.longi}</td>`;
                tablePorta.appendChild(row);
            });
        })
        .catch(function (error) {
            console.error(error.message);
        });
}