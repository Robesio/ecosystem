const xhr = new XMLHttpRequest();
const btn = document.getElementById("btn");
const msg = document.getElementById("mensagem");
const bp = document.getElementById("bp");
const urlTipologin = "https://projetorrw.000webhostapp.com/src/controll/routes/";

function readall() {
    fetch(urlTipologin + "route.tipos_login.php?id=0")
        .then(function (resp) {
            if (!resp.ok)
                throw new Error("Erro ao executar requisição: " + resp.status)
            return resp.json()
        })
        .then(function (data) {
            data.forEach((val) => {
                let r = document.createElement("tr");
                r.innerHTML = `<td>${val.id} </td>`;
                r.innerHTML += `<td>${val.tipo} </td>`;
                r.innerHTML += `<td style="padding:3px"><button onclick='edittipologin(this)'><i class="fa fa-pencil" aria-hidden="true"></i></button><button onclick='deltipologin(this)'><i class="fa fa-trash-o" aria-hidden="true"></i></button></td></tr>`;
                bp.appendChild(r);
            })
        })
        .catch(function (error) {
            console.error(error.message)
        })
}

function addtipo() {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.tipos_login.php";
    let tipo = document.getElementById("tipo");
    if (tipo.value != "") {
        let dados = new FormData();
        dados.append("tipo", tipo.value);
        dados.append("verbo", "POST");
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                msg.innerHTML = this.responseText;
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Tipo de Login Criado Com Sucesso.";
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
<<<<<<< HEAD:missao-frotas/projeto/view/tiposlogin/tiposlogin.js
function edittipologin(v) {
    v.parentNode.parentNode.cells[0].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[1].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[2].innerHTML = "<button onclick='putEcoponto(this)'>Enviar</button>";
}

function puttipologin(e) {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.tipos_login.php";
    let id = e.parentNode.parentNode.cells[0].innerHTML;
    let tipo = e.parentNode.parentNode.cells[1].innerHTML;
    let dados = "&id=" + id;
    dados += "&tipo=" + tipo;
    dados += "&verbo=", "PUT";
=======
function edittipologin(t) {
    t.parentNode.parentNode.cells[1].setAttribute("contentEditable", "true");
    t.parentNode.parentNode.cells[2].innerHTML = "<button onclick='putTipologin(this)'>Enviar</button>";
}
function putTipologin(e) {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.tipos_login.php";
    let id = e.parentNode.parentNode.cells[0].innerHTML;
    let tipo = e.parentNode.parentNode.cells[1].innerHTML;

    let dados = new FormData();
    dados.append("id", id)
    dados.append("tipo", tipo);
    dados.append("verbo", "PUT");
>>>>>>> 281528cb08e00730ae89576efda718855620cfe3:missao-frotas/projeto/tiposlogin/tiposlogin.js
    if (window.confirm("Confirma Alteração dos dados?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
<<<<<<< HEAD:missao-frotas/projeto/view/tiposlogin/tiposlogin.js
                    msg.innerHTML = "Tipo de Login Alterado Com Sucesso.";
=======
                    msg.innerHTML = "Dados do Login Alterada Com Sucesso.";
>>>>>>> 281528cb08e00730ae89576efda718855620cfe3:missao-frotas/projeto/tiposlogin/tiposlogin.js
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("POST", url);
        xhr.send(dados);
    }
}

function deltipologin(t) {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.tipos_login.php"
    let id = t.parentNode.parentNode.cells[0].innerText;
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
                    msg.innerHTML = "Tipo de Login excluido Com Sucesso."
                }
                setTimeout(() => { window.location.reload(); }, 3000)
            }
        });
        xhr.open("POST", url)
        xhr.send(dados)
    }
}