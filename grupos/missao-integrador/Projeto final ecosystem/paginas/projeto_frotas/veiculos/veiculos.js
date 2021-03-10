const xhr = new XMLHttpRequest();
const btn = document.getElementById("btn");
const msg = document.getElementById("mensagem");
const tableVeiculos = document.getElementById("corpoveiculos");
const urlbase = "https://projetorrw.000webhostapp.com/src/controll/routes/";

function carregarVeiculos() {
    fetch(urlbase + "route.veiculos.php?id=0")
        .then(function (resp) {
            if (!resp.ok)
                throw new Error("Erro ao executar requisição: " + resp.status)
            return resp.json()
        })
        .then(function (data) {
            data.forEach((val) => {
                let r = document.createElement("tr");
                r.innerHTML = `<td>${val.id} </td>`;
                r.innerHTML += `<td>${val.cooperativas_id} </td>`;
                r.innerHTML += `<td>${val.placa} </td>`;
                r.innerHTML += `<td>${val.modelo} </td>`;
                r.innerHTML += `<td>${val.marca} </td>`;
                r.innerHTML += `<td>${val.capacidade_carga_kg} </td>`;
                r.innerHTML += `<td style="padding:3px"><button onclick='editveiculos(this)'><i class="fa fa-pencil" aria-hidden="true"></i></button><button onclick='delveiculos(this)'><i class="fa fa-trash-o" aria-hidden="true"></i></button></td></tr>`;
                tableVeiculos.appendChild(r);
            })
        })
        .catch(function (error) {
            console.error(error.message)
        })
}

function addveiculo() {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.veiculos.php";
    let cooperativas_id = document.querySelector("#cooperativas_id");
    let placa = document.querySelector("#placa");
    let modelo = document.querySelector("#modelo");
    let marca = document.querySelector("#marca");
    let capacidade = document.querySelector("#capacidade");
    if (cooperativas_id.value != "" && placa.value != "" && modelo.value != "" && marca.value != "" && capacidade.value != "") {
        let dados = new FormData();
        dados.append("cooperativas_id", cooperativas_id.value);
        dados.append("placa", placa.value);
        dados.append("modelo", modelo.value);
        dados.append("marca", marca.value);
        dados.append("capacidade", capacidade.value);
        dados.append("verbo", "POST");
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                msg.innerHTML = this.responseText;
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Veículo Criado Com Sucesso.";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        })
        xhr.open("POST", url);
        xhr.send(dados);
    } else {
        msg.innerHTML = "Favor preencher todos os campos!";
        setTimeout(() => { msg.innerHTML = "Mensagens do sistema"; }, 3000);
    }
}
function editveiculos(v) {
    v.parentNode.parentNode.cells[1].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[2].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[3].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[4].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[5].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[6].innerHTML = "<button onclick='putEcopoVeiculo(this)'>Enviar</button>";
}

function putEcopoVeiculo(v) {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.veiculos.php";
    let id = v.parentNode.parentNode.cells[0].innerHTML;
    let cooperativas_id = v.parentNode.parentNode.cells[1].innerHTML;
    let placa = v.parentNode.parentNode.cells[2].innerHTML;
    let modelo = v.parentNode.parentNode.cells[3].innerHTML;
    let marca = v.parentNode.parentNode.cells[4].innerHTML;
    let capacidade = v.parentNode.parentNode.cells[5].innerHTML;

    let dados = new FormData();
    dados.append("id", id);
    dados.append("cooperativas_id", cooperativas_id);
    dados.append("placa", placa);
    dados.append("modelo", modelo)
    dados.append("marca", marca);
    dados.append("capacidade", capacidade);
    dados.append("verbo", "PUT");
    if (window.confirm("Confirma Alteração dos dados?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Dados do Veículo Alterada Com Sucesso.";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("POST", url);
        xhr.send(dados);
    }
}

function delveiculos(v) {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.veiculos.php"
    let id = v.parentNode.parentNode.cells[0].innerText
    let dados = new FormData();
    dados.append("id", id);
    dados.append("verbo", "DELETE");
    if (window.confirm("Confirma Exclusão do id = " + id + "?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                //console.log(this.responseText)
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro
                } else {
                    msg.innerHTML = "Veículo excluido Com Sucesso."
                }
                setTimeout(() => { window.location.reload(); }, 3000)
            }
        });
        xhr.open("POST", url)
        xhr.send(dados)
    }
} 