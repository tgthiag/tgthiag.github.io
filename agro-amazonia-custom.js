console.log("Hello world! teste");

function PE_BUSCA_GRID_PROD(ui){
    console.log(ui);
}

function verificandoProdutoControlado(codProdToCheck) {
    var query = {
        cnpj_empresa: "13563680000365",
        query: "SELECT B1_XVACIN FROM xEmp('SB1') WHERE B1_COD = '" + codProdToCheck + "'"
    };

    $.ajax({
        url: url + 'QueryResult',
        type: 'POST',
        async: false,
        data: JSON.stringify(query),
        contentType: "application/json; charset=utf-8",
        success: function(response) {
            // Handle the success response
            console.log("Response:", response);
        },
        error: function(error) {
            // Handle any errors
            console.error("Error:", error);
        }
    });
}
