const msg = document.querySelector("#mensagem");
const xhr = new XMLHttpRequest();
const tablePorta = document.querySelector("#corpoporta");
const urlPorta = "https://projetorrw.000webhostapp.com/src/controll/routes/";

function carregarPorta() {
    fetch(urlPorta + "route.porta_a_porta.php?id=0")
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
                row.innerHTML += `<td>${val.descricao}</td>`;
                row.innerHTML += `<td>${val.lat}</td>`;
                row.innerHTML += `<td>${val.longi}</td>`;
                row.innerHTML += `<td><a href=${url}>Ver no map</a></td>`;
                row.innerHTML += `<td style="padding:3px"><button onclick='editPorta(this)'><i class="fa fa-pencil" aria-hidden="true"></i></button><button onclick='delPorta(this)'><i class="fa fa-trash-o" aria-hidden="true"></i></button></td></tr>`;
                tablePorta.appendChild(row);
            });
        })
        .catch(function (error) {
            console.error(error.message);
        });
}

function addPorta() {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.porta_a_porta.php";
    let cooperativas_id = document.querySelector("#cooperativas_id");
    let descricao = document.querySelector("#descricao");
    let lat = document.querySelector("#lat");
    let longi = document.querySelector("#longi");
    if (cooperativas_id.value != "" && descricao.value != "" && lat.value != "" && longi.value != "") {
        let dados = new FormData();
        dados.append("cooperativas_id", cooperativas_id.value);
        dados.append("descricao", descricao.value);
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
                    msg.innerHTML = "Porta a Porta Criado Com Sucesso.";
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

function editPorta(p) {
    p.parentNode.parentNode.cells[1].setAttribute("contentEditable", "true");
    p.parentNode.parentNode.cells[2].setAttribute("contentEditable", "true");
    p.parentNode.parentNode.cells[3].setAttribute("contentEditable", "true");
    p.parentNode.parentNode.cells[4].setAttribute("contentEditable", "true");
    p.parentNode.parentNode.cells[6].innerHTML = "<button onclick='putPorta(this)'>Enviar</button>";
}

function putPorta(p) {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.porta_a_porta.php";
    let id = p.parentNode.parentNode.cells[0].innerHTML;
    let cooperativas_id = p.parentNode.parentNode.cells[1].innerHTML;
    let descricao = p.parentNode.parentNode.cells[2].innerHTML;
    let lat = p.parentNode.parentNode.cells[3].innerHTML;
    let longi = p.parentNode.parentNode.cells[4].innerHTML;
    let dados = new FormData();
    dados.append("id", id);
    dados.append("cooperativas_id", cooperativas_id);
    dados.append("descricao", descricao);
    dados.append("lat", lat);
    dados.append("longi", longi);
    dados.append("verbo", "PUT");
    if (window.confirm("Confirma Alteração dos dados?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                console.log(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Dados Alterado Com Sucesso.";
                }
                //setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("POST", url);
        xhr.send(dados);
    }
}

function delPorta(e) {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.porta_a_porta.php";
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
                    msg.innerHTML = "Deletado Com Sucesso!";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("POST", url);
        xhr.send(dados);
    }
}