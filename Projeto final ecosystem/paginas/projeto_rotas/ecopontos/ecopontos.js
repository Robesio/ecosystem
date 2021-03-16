const msg = document.querySelector("#mensagem");
const xhr = new XMLHttpRequest();
const tableEcopontos = document.querySelector("#corpoecoponto");
const urlEcoponto = "https://projetorrw.000webhostapp.com/src/controll/routes/";

function carregaEcoponto() {
    fetch(urlEcoponto + "route.ecopontos.php?id=0")
        .then(function (resp) {
            if (!resp.ok)
                throw new Error("Erro ao executar requisição: " + resp.status);
            return resp.json();
        })
        .then(function (data) {
            data.forEach((val) => {
                let url = "https://www.google.com.br/maps/dir//" + val.lat + "," + val.longi;
                let row = document.createElement("tr");
                row.innerHTML = `<tr><td>${val.id}</td>`;
                row.innerHTML += `<td>${val.cooperativas_id}</td>`;
                row.innerHTML += `<td>${val.nome}</td>`;
                row.innerHTML += `<td>${val.descricao}</td>`;
                row.innerHTML += `<td>${val.lat}</td>`;
                row.innerHTML += `<td>${val.longi}</td>`;
                row.innerHTML += `<td><a href="${url}" target="_blank">Ver no map</a></td>`;
                row.innerHTML += `<td>${val.materiais}</td>`;
                row.innerHTML += `<td style="padding:3px"><button onclick='editEcoponto(this)'><i class="fa fa-pencil" aria-hidden="true"></i></button><button onclick='delEcoponto(this)'><i class="fa fa-trash-o" aria-hidden="true"></i></button></td></tr>`;
                tableEcopontos.appendChild(row);
            });
        })
        .catch(function (error) {
            console.error(error.message);
        });
}

function addEcoponto() {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.ecopontos.php";
    let cooperativas_id = document.querySelector("#cooperativas_id");
    let nome = document.querySelector("#nome");
    let descricao = document.querySelector("#descricao");
    let lat = document.querySelector("#lat");
    let longi = document.querySelector("#longi");
    let materiais = document.getElementsByClassName("materiais");

    let selecionados = "";
    for (let i = 0; i < materiais.length; i++) {
        if (materiais[i].checked) {
            selecionados += materiais[i].value + ";";
        }
    }
    selecionados = selecionados.substring(0, selecionados.length - 1);

    if (selecionados != "" && cooperativas_id.value != "" && nome.value != "" && descricao.value != "" && lat.value != "" && longi.value != "") {
        let dados = new FormData();
        dados.append("cooperativas_id", cooperativas_id.value);
        dados.append("nome", nome.value);
        dados.append("descricao", descricao.value);
        dados.append("lat", lat.value);
        dados.append("longi", longi.value);
        dados.append("materiais", selecionados);
        dados.append("verbo", "POST");
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                msg.innerHTML = this.responseText;
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Ecoponto Criado Com Sucesso.";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("POST", url);
        xhr.send(dados);
    } else {
        msg.innerHTML = "Favor preencher todos os campos!";
        setTimeout(() => { msg.innerHTML = "Mensagens do sistema"; }, 3000);
    }
}

function editEcoponto(e) {
    e.parentNode.parentNode.cells[1].setAttribute("contentEditable", "true");
    e.parentNode.parentNode.cells[2].setAttribute("contentEditable", "true");
    e.parentNode.parentNode.cells[3].setAttribute("contentEditable", "true");
    e.parentNode.parentNode.cells[4].setAttribute("contentEditable", "true");
    e.parentNode.parentNode.cells[5].setAttribute("contentEditable", "true");
    e.parentNode.parentNode.cells[8].innerHTML = "<button onclick='putEcoponto(this)'>Enviar</button>";
}

function putEcoponto(e) {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.ecopontos.php";
    let id = e.parentNode.parentNode.cells[0].innerHTML;
    let cooperativas_id = e.parentNode.parentNode.cells[1].innerHTML;
    let nome = e.parentNode.parentNode.cells[2].innerHTML;
    let descricao = e.parentNode.parentNode.cells[3].innerHTML;
    let lat = e.parentNode.parentNode.cells[4].innerHTML;
    let longi = e.parentNode.parentNode.cells[5].innerHTML;

    let dados = new FormData();
    dados.append("id", id);
    dados.append("cooperativas_id", cooperativas_id);
    dados.append("nome", nome);
    dados.append("descricao", descricao);
    dados.append("lat", lat);
    dados.append("longi", longi);
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

function delEcoponto(e) {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.ecopontos.php";
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
