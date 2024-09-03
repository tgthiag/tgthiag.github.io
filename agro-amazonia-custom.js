console.log("Hello world! teste");

function PE_BUSCA_GRID_PROD(ui){
    console.log(ui);
    verificandoProdutoControlado(ui.item.codigo);
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
        contentType: "application/json",
        success: function(response) {
            console.log("Response:", response);
            try {
                let b1_xvacin = JSON.parse(response).Dados[0].B1_XVACIN
                if(b1_xvacin.includes('R')){
                    codProdToCheck = codProdToCheck + "(Produto Controlado)"
                }
            } catch (error) {
                
            }
        },
        error: function(error) {
            console.error("Error:", error);
        }
    });
}
