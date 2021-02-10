const xhr = new XMLHttpRequest();
const msg = document.getElementById("mensagem")
const tableMateriais = document.querySelector("#corpomateriais");
const urlMateriais = "https://projetorrw.000webhostapp.com/src/controll/routes/";

function carregaMateriais() {
    fetch(urlMateriais + "route.materiais.php?id=0")
        .then(function (resp) {
            if (!resp.ok)
                throw new Error("Erro ao executar requisição: " + resp.status)
            return resp.json()
        })
        .then(function (data) {
            data.forEach((val) => {
                let r = document.createElement("tr");
                r.innerHTML = `<td>${val.id} </td>`;
                r.innerHTML += `<td>${val.nome} </td>`;
                r.innerHTML += `<td>${val.cor} </td>`;
                r.innerHTML += `<td style="padding:3px"><button onclick='edi(this)'><i class="fa fa-pencil" aria-hidden="true"></i></button><button onclick='del(this)'><i class="fa fa-trash-o" aria-hidden="true"></i></button></td></tr>`;
                tableMateriais.appendChild(r);
            })
        })
        .catch(function (error) {
            console.error(error.message)
        })
}

function add() {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.materiais.php"
    let id = document.getElementById("id")
    let nome = document.getElementById("nome")
    let cor = document.getElementById("cor")
    if (id.value != "" && nome.value != "" && cor.value != "") {

        let dados = new FormData()
        dados.append("id", id.value)
        dados.append("nome", nome.value)
        dados.append("cor", cor.value)
        dados.append("verbo", "POST")
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                msg.innerHTML = this.responseText;
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Criado Com Sucesso.";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        })
        xhr.open("POST", url);
        xhr.send(dados);
    } else {
        msg.innerHTML = "Falta preencher os campos!";
        setTimeout(() => { msg.innerHTML = "Mensagens do sistema"; }, 3000);
    }
}
function edi(v) {
    v.parentNode.parentNode.cells[1].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[2].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[3].innerHTML = "<button onclick='putMateriais(this)'>Enviar</button>";
}
function putMateriais(e) {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.materiais.php"
    let id = e.parentNode.parentNode.cells[0].innerHTML;
    let nome = e.parentNode.parentNode.cells[1].innerHTML;
    let cor = e.parentNode.parentNode.cells[2].innerHTML;

    let dados = new FormData();
    dados.append("id", id)
    dados.append("nome", nome);
    dados.append("cor", cor);
    dados.append("verbo", "PUT");

    if (window.confirm("Confirma Alteração dos dados?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Dados do Ecoponto Alterada Com Sucesso.";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("POST", url);
        xhr.send(dados);
    }
}

function del(e) {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.materiais.php"
    let id = e.parentNode.parentNode.cells[0].innerText;
    let dados = new FormData();
    dados.append("id", id);
    dados.append("verbo", "DELETE");
    if (window.confirm("Confirma Exclusão do id = " + id + "?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Ecoponto Deletar Com Sucesso!";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("POST", url);
        xhr.send(dados);
    }
}
