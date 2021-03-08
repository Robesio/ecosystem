const msg = document.querySelector("#mensagem");
const xhr = new XMLHttpRequest();
const tableEcopontos = document.querySelector("#corpoecoponto");
const urlEcoponto = "https://projetorrw.000webhostapp.com/src/controll/routes/";

function carregaEcoponto() {
    fetch(urlEcoponto + "route.ecopontos.php?id=0")
        .then(function (resp) {
            if (!resp.ok)
                throw new Error("Erro ao executar requisição: " + resp.status);
            return resp.json();
        })
        .then(function (data) {
            data.forEach((val) => {
                let row = document.createElement("tr");
                //row.innerHTML = `<tr><td>${val.id}</td>`;
                //row.innerHTML += `<td>${val.cooperativas_id}</td>`;
                row.innerHTML += `<td>${val.nome}</td>`;
                row.innerHTML += `<td>${val.descricao}</td>`;
                row.innerHTML += `<td>${val.lat}</td>`;
                row.innerHTML += `<td>${val.longi}</td>`;
                //row.innerHTML += `<td style="padding:3px"><button onclick='editEcoponto(this)'><i class="fa fa-pencil" aria-hidden="true"></i></button><button onclick='delEcoponto(this)'><i class="fa fa-trash-o" aria-hidden="true"></i></button></td></tr>`;
                tableEcopontos.appendChild(row);
            });
        })
        .catch(function (error) {
            console.error(error.message);
        });
}