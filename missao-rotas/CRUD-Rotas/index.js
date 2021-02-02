const xhr = new XMLHttpRequest();
const id_v = document.getElementById("id_v")
const nome = document.getElementById("name")
const dat = document.getElementById("dta_time")
const btn = document.getElementById("btn")
const msg = document.getElementById("mensagem")
const bodyponto = document.getElementById("bodyponto")

var URLbase = "https://projetorrw.000webhostapp.com/src/controll/routes/"

function readall(){
    fetch(URLbase + "route.rotas.php?id=0")
        .then(function (resp) {
            if (!resp.ok)
                throw new Error("Erro ao executar requisição: " + resp.status)
            return resp.json()
        })
        .then(function (data) {
            data.forEach((val) => {
                let row = document.createElement("tr")
                row.innerHTML = `<tr><td>${val.id_v}</td>`
                row.innerHTML += `<td>${val.nome}</td>`
                row.innerHTML += `<td>${val.dia_horario}</td>`
                row.innerHTML += `<td style="padding:3px"><button onclick='editEcoponto(this)'><i class="fa fa-pencil" aria-hidden="true"></i></button><button onclick='delEcoponto(this)'><i class="fa fa-trash-o" aria-hidden="true"></i></button></td></tr>`
                bodyponto.appendChild(row)
            });
        })
        .catch(function (error) {
            console.error(error.message)
        })
}

function addponto(){
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.rotas.php"
    if(id_v.value != "",nome.value != "",dat.value != ""){
        let dados = new FormData()
        dados.append("id_v",id_v.value)
        dados.append("nome",nome.value)
        dados.append("dia_horario",dat.value)
        xhr.addEventListener("readystatechange", function (){
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
        })
        xhr.open("POST", url);
        xhr.send(dados);
    } else {
        msg.innerHTML = "Favor preencher todos os campos!";
        setTimeout(() => { msg.innerHTML = "Mensagens do sistema"; }, 3000);
    }
}