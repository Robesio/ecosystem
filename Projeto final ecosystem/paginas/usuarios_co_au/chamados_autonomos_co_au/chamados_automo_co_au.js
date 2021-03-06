const msg = document.querySelector("#mensagem");
const xhr = new XMLHttpRequest();
const tableAu = document.querySelector("#corpochamados");
const urlChamados = "https://projetorrw.000webhostapp.com/src/controll/routes/";
var lati, long;

function carregarChamados() {
    let iu = localStorage.getItem('id_user');
    let tu = localStorage.getItem('type_user');
    fetch(urlChamados + "route.chamados_autonomos.php?id=0&id_user=" + iu + "&type_user=1")
        .then(function (resp) {
            if (!resp.ok)
                throw new Error("Erro ao executar requisição: " + resp.status);
            return resp.json();
        })
        .then(function (data) {
            data.forEach((val) => {
                if (val.id !== null) {
                    let row = document.createElement("tr");
                    row.innerHTML = `<tr><td>${val.id}</td>`;
                    let status = "Aberto";
                    if (val.status_cha == "3") {
                        status = "Fechado";
                    } else if (val.status_cha == "4") {
                        status = "Em Andamento";
                    }
                    row.innerHTML += `<td>${status}</td>`;
                    row.innerHTML += `<td>${val.dia_horario}</td>`;
                    row.innerHTML += `<td>${val.materiais}</td>`;
                    tableAu.appendChild(row);
                }
            });
        })
        .catch(function (error) {
            console.error(error.message);
        });
}

function setCoords(position) {
    console.log(position);
    lati = position.coords.latitude;
    long = position.coords.longitude;
}

navigator.geolocation.getCurrentPosition(position => {
    setCoords(position)
});

function addau() {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.chamados_autonomos.php";
    let materiais = document.getElementsByClassName("materiais");
    let selecionados = "";
    for (let i = 0; i < materiais.length; i++) {
        if (materiais[i].checked) {
            selecionados += materiais[i].value + ";";
        }
    }
    selecionados = selecionados.substring(0, selecionados.length - 1);
    let autonomo_id = 1;
    let solicitante_id = localStorage.getItem("id_user");
    let status = 1;
    let lat = lati;
    let longi = long;
    const date = new Date()
    const ano = date.getYear() + 1900
    const mes = date.getMonth() + 1
    const dia = date.getDate()
    const hora = date.getHours()
    const minuto = date.getMinutes()
    const segundo = date.getSeconds()
    const dia_hora = `${ano}-${mes}-${dia} ${hora}:${minuto}:${segundo}`
    if (selecionados != "" && autonomo_id != "" && solicitante_id != "" && status != "" && lat != "" && longi != "" && dia_hora != "") {
        let dados = new FormData();
        dados.append("autonomo_id", autonomo_id);
        dados.append("solicitante_id", solicitante_id);
        dados.append("status", status);
        dados.append("lat", lat);
        dados.append("longi", longi);
        dados.append("dia_hora", dia_hora);
        dados.append("verbo", "POST");
        dados.append("materiais", selecionados);
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Chamado Criado Com Sucesso.";
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