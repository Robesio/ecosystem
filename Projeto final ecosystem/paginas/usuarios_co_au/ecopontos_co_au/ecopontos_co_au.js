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
                let url = "https://www.google.com.br/maps/dir//" + val.lat + "," + val.longi;
                let row = document.createElement("tr");
                row.innerHTML += `<td>${val.nome}</td>`;
                row.innerHTML += `<td>${val.descricao}</td>`;
                row.innerHTML += `<td>${val.lat}</td>`;
                row.innerHTML += `<td>${val.longi}</td>`;
                row.innerHTML += `<td><a href=${url}>Ver no map</a></td>`;
                row.innerHTML += `<td>${val.materiais}</td>`;
                tableEcopontos.appendChild(row);
            });
        })
        .catch(function (error) {
            console.error(error.message);
        });
}