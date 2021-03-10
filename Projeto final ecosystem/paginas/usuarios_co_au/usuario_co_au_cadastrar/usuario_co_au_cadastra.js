const xhr = new XMLHttpRequest();
const msg = document.getElementById("mensagem");

function addusuarios() {
    let url = "https://projetorrw.000webhostapp.com/src/controll/routes/route.usuarios.php";
    let nome = document.querySelector("#nome");
    let celular = document.querySelector("#celular");
    let rua = document.querySelector("#rua");
    let numero = document.querySelector("#numero");
    let bairro = document.querySelector("#bairro");
    let cidade = document.querySelector("#cidade");
    let uf = document.querySelector("#uf");
    let cpf = document.querySelector("#cpf");
    let tipo = document.querySelector("#tipo");
    let senha = cpf.value.substring(8, cpf.value.length);
    if (nome.value != "" && celular.value != "" && rua.value != "" && numero.value != "" && bairro.value != "" && cidade.value != "" && uf.value != "" && cpf.value != "" && tipo.value != "") {
        let dados = new FormData();
        dados.append("nome", nome.value);
        dados.append("celular", celular.value);
        dados.append("rua", rua.value);
        dados.append("numero", numero.value);
        dados.append("bairro", bairro.value);
        dados.append("cidade", cidade.value);
        dados.append("uf", uf.value);
        dados.append("cpf", cpf.value);
        dados.append("tipo", tipo.value);
        dados.append("senha", senha);
        dados.append("verbo", "POST");
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                let resp = JSON.parse(this.responseText);
                if (resp.hasOwnProperty("erro")) {
                    msg.innerHTML = resp.erro;
                } else {
                    msg.innerHTML = "Usuário Criado Com Sucesso.";
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