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
                r.innerHTML = `<td>${val.veiculos_id} </td>`
                r.innerHTML += `<td>${val.nome} </td>`
                r.innerHTML += `<td>${val.dia_horario} </td>`
                r.innerHTML += `<td style="padding:3px"><button onclick='editponto(this)'><i class="fa fa-pencil" aria-hidden="true"></i></button><button onclick='delponto(this)'><i class="fa fa-trash-o" aria-hidden="true"></i></button></td></tr>`

                bp.appendChild(r)
            })
        })
        .catch(function (error) {
            console.error(error.message)
        })
}

function addponto() {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.rotas.php"
    let id = document.getElementById("id")
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
                    msg.innerHTML = "Ponto Criado Com Sucesso.";
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
function editponto(v) {
    v.parentNode.parentNode.cells[0].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[1].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[2].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[3].innerHTML = "<button onclick='addponto(this)'>Enviar</button>";
}
function delponto(v) {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.rotas.php"
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
                    msg.innerHTML = "Ponto excluido Com Sucesso."
                }
                setTimeout(() => { window.location.reload(); }, 3000)
            }
        });
        xhr.open("POST", url)
        xhr.send(dados)
    }
}
