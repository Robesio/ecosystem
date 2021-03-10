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
                    if (resp[0].tipo === "3") {
                        destino += "index.html";
                    } else {
                        destino += "index-comum.html";
                    }
                    localStorage.setItem('type_user', resp[0].tipo);
                    localStorage.setItem('id_user', resp[0].id);
                    window.location.href = destino + "?id=" + resp[0].id + "&document=" + resp[0].nome + "&type_user=" + resp[0].tipo;
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