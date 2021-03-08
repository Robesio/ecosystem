const msg = document.querySelector("#mensagem");
const xhr = new XMLHttpRequest();
const tableAu = document.querySelector("#corpoau");
const urlChamados = "https://projetorrw.000webhostapp.com/src/controll/routes/";

function carregaAU() {
    fetch(urlChamados + "route.chamados_autonomos.php?id=0")
        .then(function (resp) {
            if (!resp.ok)
                throw new Error("Erro ao executar requisição: " + resp.status);
            return resp.json();
        })
        .then(function (data) {
            data.forEach((val) => {
                let row = document.createElement("tr");
                row.innerHTML = `<tr><td>${val.id}</td>`;
                row.innerHTML += `<td>${val.usuarios_autonomo_id}</td>`;
                row.innerHTML += `<td>${val.usuarios_solicitante_id}</td>`;
                row.innerHTML += `<td>${val.status_chamado_id}</td>`;
                row.innerHTML += `<td>${val.lat}</td>`;
                row.innerHTML += `<td>${val.longi}</td>`;
                row.innerHTML += `<td>${val.dia_horario}</td>`;
                row.innerHTML += `<td style="padding:3px"><button onclick='edit(this)'><i class="fa fa-pencil" aria-hidden="true"></i></button><button onclick='del(this)'><i class="fa fa-trash-o" aria-hidden="true"></i></button></td></tr>`;
                tableAu.appendChild(row);
            });
        })
        .catch(function (error) {
            console.error(error.message);
        });
}

function addau() {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.chamados_autonomos.php";
    let autonomo_id = document.querySelector("#autonomo_id");
    let solicitante_id = document.querySelector("#solicitante_id");
    let status = document.querySelector("#status");
    let lat = document.querySelector("#lat");
    let longi = document.querySelector("#longi");
    let dia_hora = document.querySelector("#dia_hora");
    if (autonomo_id.value != "" && solicitante_id.value != "" && status.value != "" && lat.value != "" && longi.value != "" && dia_hora != "") {
        let dados = new FormData();
        dados.append("autonomo_id", autonomo_id.value);
        dados.append("solicitante_id", solicitante_id.value);
        dados.append("status", status.value);
        dados.append("lat", lat.value);
        dados.append("longi", longi.value);
        dados.append("dia_hora", dia_hora.value);
        dados.append("verbo", "POST");
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                console.log(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Porta a Porta Criado Com Sucesso.";
                }
                //setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("POST", url);
        xhr.send(dados);
    } else {
        msg.innerHTML = "Favor preencher todos os campos!";
        setTimeout(() => { msg.innerHTML = "Mensagens do sistema"; }, 3000);
    }
}

function edit(v) {
    v.parentNode.parentNode.cells[1].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[2].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[3].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[4].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[5].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[6].setAttribute("contentEditable", "true");
    v.parentNode.parentNode.cells[7].innerHTML = "<button onclick='put(this)'>Enviar</button>";
}

function put(e) {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.chamados_autonomos.php";
    //let id = e.parentNode.parentNode.cells[0].innerHTML;
    //let cooperativas_id = e.parentNode.parentNode.cells[0].innerHTML;
    let id = e.parentNode.parentNode.cells[0].innerHTML;
    let autonomo_id = e.parentNode.parentNode.cells[1].innerHTML;
    let solicitante_id = e.parentNode.parentNode.cells[2].innerHTML;
    let status = e.parentNode.parentNode.cells[3].innerHTML;
    let lat = e.parentNode.parentNode.cells[4].innerHTML;
    let longi = e.parentNode.parentNode.cells[5].innerHTML;
    let dia_hora = e.parentNode.parentNode.cells[6].innerHTML;
    let dados = new FormData();
    dados.append("id", id)
    dados.append("autonomo_id", autonomo_id);
    dados.append("solicitante_id", solicitante_id);
    dados.append("status", status);
    dados.append("lat", lat);
    dados.append("longi", longi);
    dados.append("dia_hora", dia_hora);
    dados.append("verbo", "PUT");
    if (window.confirm("Confirma Alteração dos dados?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Dados Alterado Com Sucesso.";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("POST", url);
        xhr.send(dados);
    }
}

function del(e) {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.chamados_autonomos.php";
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

