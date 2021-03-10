const xhr = new XMLHttpRequest();
const msg = document.getElementById("mensagem")
const tableMateriais = document.querySelector("#corpomateriais");
const urlMateriais = "https://projetorrw.000webhostapp.com/src/controll/routes/";

function carregaMateriais() {
    fetch(urlMateriais + "route.materiais.php?id=0")
        .then(function (resp) {
            if (!resp.ok)
                throw new Error("Erro ao executar requisição: " + resp.status);
            return resp.json();
        })
        .then(function (data) {
            data.forEach((val) => {
                let r = document.createElement("tr");
                r.innerHTML = `<td>${val.id} </td>`;
                r.innerHTML += `<td>${val.nome} </td>`;
                r.innerHTML += `<td>${val.cor} </td>`;
                tableMateriais.appendChild(r);
            })
        })
        .catch(function (error) {
            console.error(error.message);
        })
}