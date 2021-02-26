const cpf = document.getElementById("document");
const password = document.getElementById("password");
const msg = document.getElementById("mensagem");

function acessar() {
    let xhr = new XMLHttpRequest();
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.login.php";
    let dados = new FormData();
    if (cpf.value != "" && password.value != "") {
        dados.append("document", cpf.value);
        dados.append("password", password.value);
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                let destino = "";
                if (resp.length === 0) {
                    msg.innerHTML = "Documento ou senha invalido";
                } else {
                    if (resp[0].tipo === "1") {
                        destino += "index.html";
                    } else if (resp[0].tipo === "2") {
                        destino += "perfil.html";
                    } else {
                        destino += "index.html";
                    }
                    window.location.href = destino + "?document=" + resp[0].nome + "&id=" + resp[0].id;
                }
            }
        });
        xhr.open("POST", url);
        xhr.send(dados);
    } else {
        msg.innerHTML = "Favor preencher o login e a senha";
    }
    setTimeout(() => { msg.innerHTML = "Mensagens do sistema"; }, 3000);
}