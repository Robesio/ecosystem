const xhr = new XMLHttpRequest();
const btn = document.getElementById("btn");
const msg = document.getElementById("mensagem");
const bp = document.getElementById("bp");
const urlbase = "https://projetorrw.000webhostapp.com/src/controll/routes/";

function readall() {
    fetch(urlbase + "route.pontos.php?id=0")
        .then(function (resp) {
            if (!resp.ok)
                throw new Error("Erro ao executar requisição: " + resp.status)
            return resp.json()
        })
        .then(function (data) {
            data.forEach((val) => {
                let r = document.createElement("tr");
                r.innerHTML = `<tr><td>${val.id} </td>`;
                r.innerHTML += `<td>${val.rotas_id} </td>`;
                r.innerHTML += `<td>${val.lat} </td>`;
                r.innerHTML += `<td>${val.longi} </td>`;
                r.innerHTML += `<td style="padding:3px"><button onclick='editponto(this)'><i class="fa fa-pencil" aria-hidden="true"></i></button><button onclick='delponto(this)'><i class="fa fa-trash-o" aria-hidden="true"></i></button></td></tr>`;
                bp.appendChild(r);
            })
        })
        .catch(function (error) {
            console.error(error.message)
        })
}

function addponto() {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.pontos.php";
    let rotas_id = document.querySelector("#rotas_id");
    let lat = document.querySelector("#lat");
    let longi = document.querySelector("#longi");
    if (rotas_id.value != "" && lat.value != "" && longi.value != "") {
        let dados = new FormData();
        dados.append("rotas_id", rotas_id.value);
        dados.append("lat", lat.value);
        dados.append("longi", longi.value);
        dados.append("verbo", "POST");
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                msg.innerHTML = this.responseText;
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Ponto de Coleta Criado Com Sucesso.";
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
    v.parentNode.parentNode.cells[1].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[2].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[3].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[4].innerHTML = "<button onclick='putponto(this)'>Enviar</button>";
}
function putponto(y) {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.pontos.php";
    let id = y.parentNode.parentNode.cells[0].innerHTML;
    let rotas_id = y.parentNode.parentNode.cells[1].innerHTML;
    let lat = y.parentNode.parentNode.cells[2].innerHTML;
    let longi = y.parentNode.parentNode.cells[3].innerHTML;
    let dados = new FormData();
    dados.append("id", id);
    dados.append("rotas_id", rotas_id);
    dados.append("lat", lat);
    dados.append("longi", longi);
    dados.append("verbo", "PUT");
    if (window.confirm("Confirma Alteração dos dados?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText)
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    //msg.innerHTML = "Dados do ponto Alterado Com Sucesso.";
                    console.log(this.responseText);
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("POST", url);
        xhr.send(dados);
    }
}
function delponto(v) {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.pontos.php";
    let id = v.parentNode.parentNode.cells[0].innerText;
    let dados = new FormData();
    dados.append("id", id);
    dados.append("verbo", "DELETE");
    if (window.confirm("Confirma Exclusão do id = " + id + "?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText)
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Ponto de Coleta excluido Com Sucesso.";
                }
                setTimeout(() => { window.location.reload(); }, 3000)
            }
        });
        xhr.open("POST", url)
        xhr.send(dados)
    }
}    