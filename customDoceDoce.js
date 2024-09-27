/**
 * Customização feita por:
 * 
 * Matheus Okamoto Soós - Plentech LTDA.
 */

$(document).on("change", 'input[type=radio][name=radSize]', function () {
    var label = $("label[for='" + $(this).attr('id') + "']").html();

    if (label.includes("FOLHA DE PAGAMENTO")) {
        var valorTotal = document.getElementById("valortotal").innerHTML
        valorTotal = parseFloat(valorTotal.replace("R$ ", "").replace(/\./g, "").replace(",", "."))

        const today = new Date();

        const primeiroDia = new Date(today.getFullYear(), today.getMonth(), 1);
        const ultimoDia = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        const querySql = "SELECT " +
            "SUM(SL1.L1_VALBRUT) AS VALOR_VENDAS, " +
            "MAX(SA1.A1_LMTCRD) AS VALOR_CREDITO " +
            "FROM " +
            "SA1010 SA1 " +
            "LEFT OUTER JOIN " +
            "SL1010 SL1 " +
            "ON SL1.L1_CLIENTE = SA1.A1_COD " +
            "AND SL1.L1_LOJA = SA1.A1_LOJA " +
            "AND SL1.L1_FORMPG = 'FO' " +
            "AND SL1.L1_SITUA = 'OK' " +
            "AND SL1.L1_EMISSAO BETWEEN '" + primeiroDia.toISOString().slice(0, 10).replace(/-/g, '') + "' AND '" + ultimoDia.toISOString().slice(0, 10).replace(/-/g, '') + "' " +
            "AND SL1.D_E_L_E_T_ = ' ' " +
            "WHERE " +
            "SA1.A1_COD = '" + $("#cliente").data("codigo") + "' " +
            "AND SA1.A1_LOJA = '" + $("#cliente").data("loja") + "' " +
            "AND SA1.D_E_L_E_T_ = ' ' " +
            "GROUP BY " +
            "SL1.L1_CLIENTE, SL1.L1_LOJA;"

        const query = {
            "cnpj_empresa": cCnpj,
            "query": querySql
        }

        $.ajax({
            url: url + "QueryResult",
            type: "POST",
            async: true,
            data: JSON.stringify(query),
            dataType: "json",
            contentType: "application/json",
            success: function (response) {
                if (response && response.Dados) {
                    const valorVendas = response.Dados[0].VALOR_VENDAS
                    const valorCredito = response.Dados[0].VALOR_CREDITO
                    const novoValorVendas = valorVendas + valorTotal
                    const limiteDisponivel = valorCredito - valorVendas

                    if (novoValorVendas > valorCredito) {
                        pedidoPagXCancelar();
                        alert("Valor da Venda é maior que o Limite Disponível. Limite de Crédito Disponível: R$ " + Math.abs(limiteDisponivel).toFixed(2).replace('.', ','))
                    }

                    else {
                        const creditoRestante = Math.abs(novoValorVendas - valorCredito)
                        jsonorc.cabecalho[0].LQ_MENNOTA = "Limite de Credito Disponivel: R$ " + creditoRestante.toFixed(2).replace('.', ',');
                    }
                }
            },
            error: function (jqXhr, textStatus, errorThrown) {
                alert("problema");
            }
        });
    }
})

function PE_GERORC_ANTES_GERORC(jsonenv) {

    $(jsonenv.itens).each(function (index) {

        jsonenv.itens[index]["LR_LOCAL"] = "LJ";

    });

    return jsonenv;
}