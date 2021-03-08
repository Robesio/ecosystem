const msg = document.querySelector("#mensagem");
const xhr = new XMLHttpRequest();
const tableCooperativas = document.querySelector("#empresacoope");
const urlCooperativa = "https://projetorrw.000webhostapp.com/src/controll/routes/";

function carregaCooperativas() {
    fetch(urlCooperativa + "route.cooperativas.php?id=0")
        .then(function (resp) {
            if (!resp.ok)
                throw new Error("Erro ao executar requisição: " + resp.status);
            return resp.json();
        })
        .then(function (data) {
            data.forEach((val) => {
                let row = document.createElement("tr");
                row.innerHTML = `<tr><td>${val.id} </td>`;
                row.innerHTML += `<td>${val.nome} </td>`;
                row.innerHTML += `<td style="padding:3px"><button onclick='editCooperativas(this)'><i class="fa fa-pencil" aria-hidden="true"></i></button><button onclick='delCooperativas(this)'><i class="fa fa-trash-o" aria-hidden="true"></i></button></td></tr>`;
                tableCooperativas.appendChild(row);
            })
        })
        .catch(function (error) {
            console.error(error.message);
        })
}

function cadastro() {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.cooperativas.php";
    let nome = document.getElementById("nome").value;
    if (nome != "") {
        let dados = new FormData();
        dados.append("nome", nome);
        dados.append("verbo", "POST");
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                msg.innerHTML = this.responseText;
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Empresa Cadastrada Com Sucesso.";
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
function editCooperativas(v) {
    v.parentNode.parentNode.cells[1].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[2].innerHTML = "<button onclick='putCooperativa(this)'>Enviar</button>";
}

function putCooperativa(p) {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.cooperativas.php"
    let id = p.parentNode.parentNode.cells[0].innerHTML;
    let nome = p.parentNode.parentNode.cells[1].innerHTML;

    let dados = new FormData();
    dados.append("id", id)
    dados.append("nome", nome)
    dados.append("verbo", "PUT");
    if (window.confirm("Confirma Alteração dos dados?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Cooperativa alterada com sucesso.";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("POST", url);
        xhr.send(dados);
    }
}

function delCooperativas(v) {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.cooperativas.php";
    let id = v.parentNode.parentNode.cells[0].innerText;
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
                    msg.innerHTML = "Cooperativa excluida Com Sucesso.";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("POST", url);
        xhr.send(dados);
    }
}    