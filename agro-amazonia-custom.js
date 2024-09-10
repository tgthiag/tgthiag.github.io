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

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log(data);
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
        }
    });
}
