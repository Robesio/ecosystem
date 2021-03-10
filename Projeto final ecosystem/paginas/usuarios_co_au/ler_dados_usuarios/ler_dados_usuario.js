const xhr = new XMLHttpRequest();
const msg = document.getElementById("mensagem")
const lerUsuario = document.querySelector("#corpoler");
const urlLerDados = "https://projetorrw.000webhostapp.com/src/controll/routes/";

function carregarDadosUsuario() {
    fetch(urlLerDados + "route.usuarios.php?id=" + localStorage.getItem("id_user"))
        .then(function (resp) {
            if (!resp.ok)
                throw new Error("Erro ao executar requisição: " + resp.status)
            return resp.json()
        })
        .then(function (data) {
            data.forEach((val) => {
                let r = document.createElement("tr");
                r.innerHTML += `<td>${val.id} </td>`;
                r.innerHTML += `<td>${val.nome} </td>`;
                r.innerHTML += `<td>${val.celular} </td>`;
                r.innerHTML += `<td>${val.rua} </td>`;
                r.innerHTML += `<td>${val.numero} </td>`;
                r.innerHTML += `<td>${val.bairro} </td>`;
                r.innerHTML += `<td>${val.cidade} </td>`;
                r.innerHTML += `<td>${val.uf} </td>`;
                r.innerHTML += `<td>${val.cpf} </td>`;
                r.innerHTML += `<td>${val.tipos_logins_id} </td>`;
                r.innerHTML += `<td>${val.senha} </td>`;
                r.innerHTML += `<td style="padding:3px"><button onclick='editusuarios(this)'><i class="fa fa-pencil" aria-hidden="true"></i></button><button onclick='delusuarios(this)'><i class="fa fa-trash-o" aria-hidden="true"></i></button></td></tr>`;
                lerUsuario.appendChild(r);
            })
        })
        .catch(function (error) {
            console.error(error.message)
        })
}

function editusuarios(u) {
    u.parentNode.parentNode.cells[1].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[2].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[3].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[4].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[5].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[6].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[7].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[8].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[9].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[10].setAttribute("contentEditable", "true");
    u.parentNode.parentNode.cells[11].innerHTML = "<button onclick='putusuarios(this)'>Enviar</button>";
}

function putusuarios(e) {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.usuarios.php";
    let id = e.parentNode.parentNode.cells[0].innerHTML;
    let nome = e.parentNode.parentNode.cells[1].innerHTML;
    let celular = e.parentNode.parentNode.cells[2].innerHTML;
    let rua = e.parentNode.parentNode.cells[3].innerHTML;
    let numero = e.parentNode.parentNode.cells[4].innerHTML;
    let bairro = e.parentNode.parentNode.cells[5].innerHTML;
    let cidade = e.parentNode.parentNode.cells[6].innerHTML;
    let uf = e.parentNode.parentNode.cells[7].innerHTML;
    let cpf = e.parentNode.parentNode.cells[8].innerHTML;
    let tipo = e.parentNode.parentNode.cells[9].innerHTML;
    let senha = e.parentNode.parentNode.cells[10].innerHTML;
    let dados = new FormData();
    dados.append("id", id);
    dados.append("nome", nome);
    dados.append("celular", celular);
    dados.append("rua", rua);
    dados.append("numero", numero);
    dados.append("bairro", bairro);
    dados.append("cidade", cidade);
    dados.append("uf", uf);
    dados.append("cpf", cpf);
    dados.append("tipo", tipo);
    dados.append("senha", senha);
    dados.append("verbo", "PUT");
    dados.append("type_user", localStorage.getItem('type_user'));
    if (window.confirm("Confirma Alteração dos dados?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Dados do Usuário Alterada Com Sucesso.";
                }
                setTimeout(() => { window.location.reload(); }, 3000);
            }
        });
        xhr.open("POST", url);
        xhr.send(dados);
    }
}

function delusuarios(v) {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.usuarios.php"
    let id = v.parentNode.parentNode.cells[0].innerText;
    let dados = new FormData();
    dados.append("id", id);
    dados.append("verbo", "DELETE");
    if (window.confirm("Confirma Exclusão do id = " + id + "?")) {
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText);
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro
                } else {
                    msg.innerHTML = "Usuario excluido Com Sucesso."
                }
                setTimeout(() => { window.location.reload(); }, 3000)
            }
        });
        xhr.open("POST", url)
        xhr.send(dados)
    }
}