const xhr = new XMLHttpRequest();
const btn = document.getElementById("btn")
const msg = document.getElementById("mensagem")
const bp = document.getElementById("bp")

var URLbase = "https://projetorrw.000webhostapp.com/src/controll/routes/"

function readall() {
    fetch(URLbase + "route.veiculos.php?id=0")
        .then(function (resp) {
            if (!resp.ok)
                throw new Error("Erro ao executar requisição: " + resp.status)
            return resp.json()
        })
        .then(function (data) {
            data.forEach((val) => {
                let r = document.createElement("tr")
                r.innerHTML = `<td>${val.id} </td>`
                r.innerHTML += `<td>${val.cooperativas_id} </td>`
                r.innerHTML += `<td>${val.placa} </td>`
                r.innerHTML += `<td>${val.modelo} </td>`
                r.innerHTML += `<td>${val.marca} </td>`
                r.innerHTML += `<td>${val.capacidade_carga_kg} </td>`
                r.innerHTML += `<td style="padding:3px"><button onclick='editveiculos(this)'><i class="fa fa-pencil" aria-hidden="true"></i></button><button onclick='delveiculo(this)'><i class="fa fa-trash-o" aria-hidden="true"></i></button></td></tr>`

                bp.appendChild(r)
            })
        })
        .catch(function (error) {
            console.error(error.message)
        })
}

function addveiculo() {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.veiculos.php"
    let id = document.getElementById("id")
    let cooperativas_id = document.getElementById("cooperativas_id")
    let placa = document.getElementById("placa")
    let modelo = document.getElementById("modelo")
    let marca = document.getElementById("marca")
    let capacidade_carga_kg = document.getElementById("capacidade_carga_kg")
    if (id.value != "" && cooperativas_id.value != "" && placa.value != "" && modelo.value != "" && marca.value != "" && capacidade_carga_kg.value != "") {
        let dados = new FormData()
        dados.append("id", id.value)
        dados.append("cooperativas_id", cooperativas_id.value)
        dados.append("placa", placa.value)
        dados.append("modelo", modelo.value)
        dados.append("marca", marca.value)
        dados.append("capacidade_carga_kg", capacidade_carga_kg.value)
        dados.append("verbo", "POST")
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
        msg.innerHTML = "Falta preencher todos os campos!";
        setTimeout(() => { msg.innerHTML = "Mensagens do sistema"; }, 3000);
    }
}
function editveiculos(v) {
    v.parentNode.parentNode.cells[0].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[1].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[2].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[3].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[4].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[5].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[6].innerHTML = "<button onclick='putEcoponto(this)'>Enviar</button>";
}
function putveiculo(e) {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.veiculos.php";
    let id = e.parentNode.parentNode.cells[0].innerHTML;
    let cooperativas_id = e.parentNode.parentNode.cells[1].innerHTML;
    let placa = e.parentNode.parentNode.cells[2].innerHTML;
    let modelo = e.parentNode.parentNode.cells[3].innerHTML;
    let marca = e.parentNode.parentNode.cells[4].innerHTML;
    let capacidade_carga_kg = e.parentNode.parentNode.cells[5].innerHTML;
    let dados = "&id=" + id;
    dados += "&cooperativas_id=" + cooperativas_id;
    dados += "&placa=" + placa;
    dados += "&modelo=" + modelo;
    dados += "&marca=" + marca;
    dados += "&capacidade_carga_kg=" + capacidade_carga_kg;
    dados += "&verbo=", "PUT";
    if (window.confirm("Confirma Alteração dos dados?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Dados do Veiculo Alterado Com Sucesso.";
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
}s