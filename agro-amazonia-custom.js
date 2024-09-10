console.log("Hello world! teste");

function PE_BUSCA_GRID_PROD(ui){
    console.log(ui);
    verificandoProdutoControlado(ui.item);
}

function verificandoProdutoControlado(codProdToCheck) {
    var query = {
        cnpj_empresa: "13563680000365",
        query: "SELECT B1_XVACIN FROM xEmp('SB1') WHERE B1_COD = '" + codProdToCheck.codigo + "'"
    };

    $.ajax({
        url: url + 'QueryResult',
        type: 'POST',
        async: false,
        data: JSON.stringify(query),
        contentType: "application/json",
        success: function(response) {
            console.log("Response:", response);
            try {
                let b1_xvacin = JSON.parse(response).Dados[0].B1_XVACIN
                if(b1_xvacin.includes('R') ){
                    // codProdToCheck.label = codProdToCheck.label + " (Produto Controlado)";
                    $("#codigo").val(codProdToCheck.label.trim() + " (Produto Controlado)");
                    console.log(codProdToCheck);
                }
            } catch (error) {
                
            }
        },
        error: function(error) {
            console.error("Error:", error);
        }
    });
}

function PE_BUSCA_GRID_CLIENTE() {
    let clienteAgro = $("#cliente").data("codigo");
    let lojaAgro = $("#cliente").data("loja");

    let url = `https://mingle.agroamazonia.com/dev/api/aasa/v1/agrotis/easy/produtorRural/${clienteAgro}/${lojaAgro}`;

    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + btoa('api.easy:!@eas255')
        }
    })
    .then(response => response.json())
    .then(data => {
        let produtorRural = data.produtorRuralApi;

        if (produtorRural == undefined || !produtorRural.ativo) {
            if (!document.getElementById('labelProdutorRural')) {
                let div = document.createElement('div');
                div.className = 'col-lg-12 col-md-12 col-sm-12 col-xs-12';

                let label = document.createElement('label');
                label.id = 'labelProdutorRural';
                label.style.color = 'green';
                label.style.fontSize = 'small';
                label.style.fontWeight = 'bold';
                label.innerText = 'Produtor Rural: ';

                let span = document.createElement('span');
                span.id = 'produtorRuralCode';
                span.style.color = 'green';
                span.style.fontSize = 'small';
                span.style.fontWeight = 'bold';
                span.innerText = produtorRural.id;
                div.appendChild(label);
                div.appendChild(span);

                let clienteDiv = document.getElementById('labelCliente').parentNode;
                clienteDiv.appendChild(div);
            } else {
                document.getElementById('produtorRuralCode').innerText = produtorRural.id;
            }
        } else {
            let labelProdutorRural = document.getElementById('labelProdutorRural');
            if (labelProdutorRural) {
                labelProdutorRural.parentNode.remove();
            }
        }
    })
    .catch(error => console.error('Error:', error));
}


