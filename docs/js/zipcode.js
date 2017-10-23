document.querySelector('#cepForm').addEventListener('submit', getLocationInfo);
document.querySelector("body").addEventListener("click", close);

function getLocationInfo(e) {

    const zip = document.querySelector('.zip').value;

    if (zip.toString().length != 8) {
        erro();
    }

    fetch(`http://viacep.com.br/ws/${zip}/json/`)
        .then(response => response.json())
        .then(data => {

            if (data.erro == true) {
                erro();
            } else {
                document.querySelector("#output").innerHTML =
                    `
                    <article class="message is-centered ">
                    <div class="message-header">
                        <p></p>
                        <button class="delete" id="remove"></button>
                    </div>
                    <div class="message-body">
                        <ul>
                            <li>
                                <strong>Rua: ${data.logradouro}</strong>
                            </li>
                            <hr>
                            <li>
                                <strong>Cidade: ${data.localidade}</strong>
                            </li>
                            <hr>
                            <li>
                                <strong>Bairro: ${data.bairro}</strong>

                            </li>
                            <hr>
                            <li>
                                <strong>UF: ${data.uf}</strong>
                            </li>
                        </ul>
                    </div>
                </article>
                    `;
            };
        })
        .catch(err => console.log(err));
    e.preventDefault();
}

function erro() {
    const erro = document.querySelector("#output").innerHTML =
        `
            <article class="message is-danger">
                <div class="message-body">Invalid Zipcode, please try again</div>
            </article>
        `;
    return erro;
}

function close(e){

    if (e.target.className == "delete") {
        document.querySelector(".message").remove();
        document.querySelector(".zip").value = "";
      }
}
