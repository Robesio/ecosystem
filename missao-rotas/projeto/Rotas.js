const xhr = new XMLHttpRequest();
const btn = document.getElementById("btn")
const msg = document.getElementById("mensagem")
const bp = document.getElementById("bp")

var URLbase = "https://projetorrw.000webhostapp.com/src/controll/routes/"

function readall() {
    fetch(URLbase + "route.rotas.php?id=0")
        .then(function (resp) {
            if (!resp.ok)
                throw new Error("Erro ao executar requisição: " + resp.status)
            return resp.json()
        })
        .then(function (data) {
            data.forEach((val) => {
                let r = document.createElement("tr")
                r.innerHTML = `<tr><td>${val.id} </td>`
                r.innerHTML += `<td>${val.veiculos_id} </td>`
                r.innerHTML += `<td>${val.nome} </td>`
                r.innerHTML += `<td>${val.dia_horario} </td>`
                r.innerHTML += `<td style="padding:3px"><button onclick='editrota(this)'><i class="fa fa-pencil" aria-hidden="true"></i></button><button onclick='delrota(this)'><i class="fa fa-trash-o" aria-hidden="true"></i></button></td></tr>`

                bp.appendChild(r)
            })
        })
        .catch(function (error) {
            console.error(error.message)
        })
}

function addRota() {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.rotas.php"
    let id = document.getElementById("id_v")
    let nome = document.getElementById("name")
    let dat = document.getElementById("dta_time")
    if (id.value != "" && nome.value != "" && dat.value != "") {
        let dados = new FormData()
        dados.append("veiculos_id", id.value)
        dados.append("nome", nome.value)
        dados.append("dia_horario", dat.value)
        dados.append("verbo", "POST")
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                msg.innerHTML = this.responseText;
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Rota Criada Com Sucesso.";
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
function editrota(v) {
    v.parentNode.parentNode.cells[0].setAttribute("contentEditable", "false");
    v.parentNode.parentNode.cells[1].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[2].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[3].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[4].innerHTML = "<button onclick='putRota(this)'>Enviar</button>";
}
function putRota(v) {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.rotas.php"
    let id_v = v.parentNode.parentNode.cells[1].innerHTML
    let nome = v.parentNode.parentNode.cells[2].innerHTML
    let dat = v.parentNode.parentNode.cells[3].innerHTML
    let dados = "&veiculos_id=" + id_v
    dados += "&nome=" + nome
    dados += "&dia_horario=" + dat
    dados += "&verbo=", "PUT"
    if (window.confirm("Confirma Alteração dos dados?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText)
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro
                } else {
                    msg.innerHTML = "Dados da rota Alterada Com Sucesso."
                }
                setTimeout(() => { window.location.reload(); }, 3000)
            }
        });
        xhr.open("POST", url)
        xhr.send(dados)
    }
}
function delrota(v) {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.rotas.php"
    let id = v.parentNode.parentNode.cells[0].innerText
    let dados = new FormData()
    dados.append("id", id)
    dados.append("verbo", "DELETE")
    if (window.confirm("Confirma Exclusão do id = " + id + "?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText)
                let resp = JSON.parse(this.responseText)
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro
                } else {
                    msg.innerHTML = "Rota excluido Com Sucesso."
                }
                setTimeout(() => { window.location.reload(); }, 3000)
            }
        });
        xhr.open("POST", url)
        xhr.send(dados)
    }
}