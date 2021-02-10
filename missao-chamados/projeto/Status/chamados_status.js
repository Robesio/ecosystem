const msg = document.querySelector("#mensagem");
const xhr = new XMLHttpRequest();
const tablechamados = document.querySelector("#corpochamados");
const urlchamado = "https://projetorrw.000webhostapp.com/src/controll/routes/";

//comentario
function carregaChamado() {
    fetch(urlchamado + "route.status_chamado.php?id=0")
        .then(function (resp) {
            if (!resp.ok)
                throw new Error("Erro ao executar requisição: " + resp.status);
            return resp.json();
        })
        .then(function (data) {
            data.forEach((val) => {
                let row = document.createElement("tr");
                row.innerHTML = `<tr><td>${val.id}</td>`;
                row.innerHTML += `<td>${val.status_cha}</td>`;
                row.innerHTML += `<td style="padding:3px"><button onclick='editChamado(this)'><i class="fa fa-pencil" aria-hidden="true"></i></button><button onclick='delChamado(this)'><i class="fa fa-trash-o" aria-hidden="true"></i></button></td></tr>`;
                tablechamados.appendChild(row);
            });
        })
        .catch(function (error) {
            console.error(error.message);
        });
}

 
function addChamados(){
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.status_chamado.php";
    let status_chamado = document.getElementById("status_chamado");
    if (status_chamado.value != "") {
        let dados = new FormData();
        dados.append("status_chamado", status_chamado.value);
        dados.append("verbo", "POST");
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    alert (resp.erro)
                } else {
                    alert ("Chamado criado com sucesso")
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("POST", url);
        xhr.send(dados);
     
    } else {
        setTimeout(() => { msg.innerHTML = "Mensagens do sistema"; }, 3000);
    }
}

function editChamado(v) {
    v.parentNode.parentNode.cells[1].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[2].innerHTML = "<button onclick='putChamado(this)'>Enviar</button>";
}

function putChamado(e) {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.status_chamado.php";
    let id = e.parentNode.parentNode.cells[0].innerHTML;
    let status_chamado = e.parentNode.parentNode.cells[1].innerHTML;
    let dados = new FormData();
    dados.append ("id", id) 
    dados.append("status_chamado", status_chamado);
    dados.append("verbo", "PUT");
    if (window.confirm("Confirma Alteração dos dados?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Dados do Status Alterados Com Sucesso.";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("POST", url);
        xhr.send(dados);
    }
}

function delChamado(e) {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.status_chamado.php";
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
                    msg.innerHTML = "Chamado Deletado Com Sucesso!";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("POST", url);
        xhr.send(dados);
    }
}
