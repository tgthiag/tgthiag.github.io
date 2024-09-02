console.log("Hello world2!");
/* LISTA DE PRESENTES */

$(document).ready(function () {
    const button = `<button id="btnListaPresentes" type="button" class="btn btn-primary form-control" style="margin-top: 5px; margin-bottom: 5px">Lista de Presentes</button>`

    $('#divMenu').prepend(button);

    $("#btnListaPresentes").on("click", function () {
        $("#modalListaPresentes").modal({ backdrop: "static" });
    })
})

$("body").append(
    `<div class="modal fade" id="modalListaPresentes" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">
                        Consultar Lista de Presentes
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="clearListas()">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-4 col-md-4 col-sm-10 col-xs-10" style="padding-top: 12px;">
                            <div class="input-group input-group-lg">
                                <select class="form-control" name="opcPresentes" id="opcPresentes">
                                    <option value="1">1 - Data do Evento</option>
                                    <option value="2">2 - Nome do Evento</option>
                                    <option value="3">3 - Local de Evento</option>
                                    <option value="4">4 - Nome do organizador</option>
                                </select>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-4 col-sm-10 col-xs-10" style="padding-top: 12px;">
                            <div class="input-group input-group-lg">
                                <input type="date" class="form-control" autocomplete="off" id="txtPesquisa">
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-4 col-sm-10 col-xs-10" style="padding-top: 12px;">
                            <button class="btn" onclick="insertData()">Pesquisar</button>
                        </div>
                    </div>

                    <br>

                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <table id="dtPresentes" class="table display table-striped" style="display: none">
                                    <thead>
                                        <tr>
                                            <th scope="col">Cod.Lista</th>
                                            <th scope="col">Cod.Organizador</th>
                                            <th scope="col">Nome Organizador</th>
                                            <th scope="col">Evento</th>
                                            <th scope="col">Data Evento</th>
                                            <th scope="col">Local</th>
                                        </tr>
                                    </thead>
                                    <tbody id="bodydtPresentes">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                </div>
                <div class="modal-footer" id="buttons">
                </div>
            </div>
        </div>
    </div>`
)

$("body").append(
    `<div class="modal fade" id="modalProdutosLista" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">
                        Selecionar Produto
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="clearProdutos()">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <table id="dtProdutos" class="table display table-striped" style="display: block">
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col">Item</th>
                                        <th scope="col">Cod.Produto</th>
                                        <th scope="col">Desc.Prod.</th>
                                        <th scope="col">Val.Unitario</th>
                                        <th scope="col">Unidade</th>
                                        <th scope="col">Qtd.Disponivel</th>
                                        <th scope="col">Qtd.Solicitada</th>
                                    </tr>
                                </thead>
                                <tbody id="bodydtProdutos">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" id="buttons">
                    <button class="btn" data-dismiss="modal">Selecionar</button>
                </div>
            </div>
        </div>
    </div>`
)

$(document).ready(function () {
    $("#opcPresentes").on("change", function () {
        const $opcVal = $("#opcPresentes").val()

        if ($opcVal == "1") {
            $("#txtPesquisa").attr('type', 'date');
        }
        else {
            $("#txtPesquisa").attr('type', 'text');
        }
    })
})

function insertData() {
    clearListas();

    const $table = $("#dtPresentes");
    const $tbody = $("#bodydtPresentes");

    const $opcPresentes = $("#opcPresentes");
    const $txtPesquisa = $("#txtPesquisa");

    if (!$txtPesquisa.val()) {
        return;
    }

    const reqObj = {
        "Parametros": {}
    };

    const opcValor = $opcPresentes.val();
    const txtValor = $txtPesquisa.val();

    if (opcValor == "1") {
        reqObj["Parametros"]["DataEvento"] = txtValor.replace(/-/g, "");
    } else if (opcValor == "2") {
        reqObj["Parametros"]["Nome"] = txtValor;
    } else if (opcValor == "3") {
        reqObj["Parametros"]["LocalEvento"] = txtValor;
    } else if (opcValor == "4") {
        reqObj["Parametros"]["NomeCliente"] = txtValor;
    }

    $.ajax({
        url: url + "easymobile/CONSULTAS/LISTAPRESENTES",
        type: 'POST',
        contentType: 'application/json',
        async: true,
        dataType: 'json',
        data: JSON.stringify(reqObj),
        success: function (response) {
            if (!response || !response.ListaPresentes) return;

            const data = response.ListaPresentes;

            data.forEach((lista) => {
                const $row = $("<tr>").css({
                    cursor: "pointer",
                    transition: "0.2s"
                });

                $tbody.append(
                    $row.append(`
                        <td>${lista.Codigo}</td>
                        <td>${lista.CodigoCliente}</td>
                        <td>${lista.NomeCliente}</td>
                        <td>${lista.Nome}</td>
                        <td>${lista.DataEvento}</td>
                        <td>${lista.LocalEvento}</td>
                    `)
                );

                $row.on("click", function () {
                    lista.Produtos.forEach((produto) => {
                        const $produtosRow = $("<tr>");
                        const $imgElement = $('<img>').attr({
                            src: 'data:image/png;base64,' + produto.ImagemBase64,
                            width: 100,
                            height: 100
                        });
                        const $checkbox = $("<input>").attr('type', 'checkbox');

                        $("#bodydtProdutos").append(
                            $produtosRow.append(
                                $("<td>").append($checkbox),
                                $("<td>").append($imgElement),
                                $(`
                                    <td>${produto.Item}</td>
                                    <td>${produto.CodigoProduto}</td>
                                    <td>${produto.DescProduto}</td>
                                    <td>${produto.ValorUnitario}</td>
                                    <td>${produto.UnidadeMedida}</td>
                                    <td>${produto.QtdAtendida}</td>
                                    <td>${produto.QtdSolicitada}</td>
                                `)
                            )
                        );
                    });

                    $("#modalProdutosLista").modal({ backdrop: "static" });
                });

                $row.on("mouseover", function () {
                    $row.css("backgroundColor", "#00000024");
                });

                $row.on("mouseout", function () {
                    $row.css("backgroundColor", "");
                });
            });

            $table.show();
        },
        error: function () {
            window.alert("Erro ao carregar as listas de presentes");
        }
    });
}

function clearListas() {
    $("#bodydtPresentes tr").remove();
    const table = document.getElementById("dtPresentes")
    table.style.display = "none"
}

function clearProdutos() {
    $("#bodydtProdutos tr").remove();
}

/* CAMPOS "NOME CLIENTE" E "DOCUMENTO CLIENTE" */

$(document).ready(function () {
    const divInputClienteHtml =
        `<div id="divInputCliente" class="row">
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <label id="labelNome" class="fonte" for="cliente">Nome do Cliente</label><span id="spanCliente" style="color: red;font-size: small"></span>
                <div class="input-group input-group-lg clearable">
                    <input type="text" class="form-control clearableInput ui-autocomplete-input" autocomplete="off" placeholder="Informe o nome do cliente" name="nome" id="nomeCliente" required="">
                        <i class="clearable__clear">×</i>
                        <span class="input-group-addon"></span>
                </div>
                <span id="lblcliente" class="span-erro"></span>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <label id="labelDocumento" class="fonte" for="cliente">Documento do Cliente</label><span id="spanCliente" style="color: red;font-size: small"></span>
                <div class="input-group input-group-lg clearable">
                    <input type="text" class="form-control clearableInput ui-autocomplete-input" autocomplete="off" placeholder="Informe o documento do cliente" name="documento" id="documentoCliente" required="">
                        <i class="clearable__clear">×</i>
                        <span class="input-group-addon"></span>
                </div>
                <span id="lblcliente" class="span-erro"></span>
            </div>
        </div>`

    const $divBuscaProduto = $('#divBuscaProduto');

    $(divInputClienteHtml).insertBefore($divBuscaProduto);
})

$('#divAddProd button').on('click', function() {
    const nomeCliente = $('#nomeCliente').val();
    const documentoCliente = $('#documentoCliente').val();

    jsonorc.cabecalho[0].LQ_OBS1 = nomeCliente
    jsonorc.cabecalho[0].LQ_OBS2 = documentoCliente

    if (typeof PE_GERORC_ANTES_GERORC === 'function') {
        PE_GERORC_ANTES_GERORC(jsonorc);
    }
});
// THIAGO CARVALHO
$("body").append(`
    <div class="modal fade" id="1000MARCAS_ModalAposAddCarrinho" role="dialog">
        <div class="modal-dialog modal-lg">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Opções de entrega
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>						
                    </h4>
                </div>
                <div class="modal-body">
                    <form id="1000MARCAS_ModalFormAposAddCarrinho">
                        <div class="row">
                            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12" style="display: none;">
                                <label id="1000MARCASLabelCustomerOrder" class="fonte" for="1000MARCASCustomerOrder">Valor Garantia</label><span id="1000MARCASSpanCustomerOrder" style="color: red;font-size: small"></span>
                                <div class="input-group input-group-lg clearable">
                                    <select id="1000MARCASCustomerOrder" class="form-control clearableInput" required>
                                        <!-- Dropdown options will be populated here dynamically -->
                                    </select>
                                    <i class="clearable__clear">&times;</i>
                                </div>
                                <span id="lbl1000MARCASCustomerOrder" class="span-erro"></span>	
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <label class="fonte">Tipo de entrega</label>
                                <select id="selectTipoEntrega" class="form-control">
                                    <option value="2">2 - Retira NFC-e</option>
                                    <option value="3">3 - Entrega</option>
                                </select>
                                <p id="infoEntregaCd" style="color: red"></p>
                            </div>
                        </div>

                            <!-- New Vendedor section -->
                        <div class="row">
                            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <label class="fonte" for="vendedorInput">Vendedor</label>
                                <input type="text" id="vendedorInput" class="form-control" placeholder="Digite o nome do vendedor">
                                <ul id="vendedorSuggestions" class="list-group-vendor" style="background-color: white;position: absolute;z-index: 1000;margin: 5px;border-radius: 8px; display: none;"></ul>
                            </div>
                        </div>

                        <div id="opcoesEntrega" style="display: none;">
                            <div class="row">
                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                    <label class="fonte">Turno de entrega</label>
                                    <select id="selectTurnoEntrega" class="form-control">
                                        <option value="1">Manhã</option>
                                        <option value="2">Tarde</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                    <label class="fonte">Data de entrega</label>
                                    <input type="date" id="dataEntrega" class="form-control">
                                </div>
                                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                    <label class="fonte">Data de montagem</label>
                                    <input type="date" id="dataMontagem" class="form-control">
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer" id="buttons">
                    <button id="1000MARCASBtnCustomerOrderItem" class="btn btn-success" data-dismiss="modal">Continuar <i class="fas fa-check"></i></button>
                </div>
            </div>
        </div>
    </div>
    `);
    

    $("#selectTipoEntrega").change(function() {
        if ($(this).val() == "3") {
            $("#opcoesEntrega").show();
        } else {
            $("#opcoesEntrega").hide();
        }
    });
// Função para verificar o prazo de entrega

$(document).ready(function() {
    $('#vendedorInput').on('input', function() {
        let vendedorInputValue = $(this).val().toUpperCase();
        if (vendedorInputValue.length >= 3) {
            $.ajax({
                url: url + "QueryResult",
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({
                    "cnpj_empresa": cCnpj,
                    "query": "SELECT TOP 8 * FROM xEmp('SA3') SA3 WHERE A3_NOME LIKE '%" + vendedorInputValue + "%'"
                }),
                success: function(response) {
                    if (response && response.Dados) {
                        var suggestions = response.Dados.map(function(item) {
                            return '<li class="list-group-vendor-item" data-codevendedor="' + item.A3_COD + '">' + item.A3_NOME + '</li>';
                        }).join('');
                        $('#vendedorSuggestions').html(suggestions).show();
                    } else {
                        $('#vendedorSuggestions').hide();
                    }
                },
                error: function(xhr, status, error) {
                    console.error("An error occurred: " + error);
                    $('#vendedorSuggestions').hide();
                }
            });
        } else {
            $('#vendedorSuggestions').hide();
        }
    });

    $(document).on('click', '#vendedorSuggestions li', function() {
        var selectedVendor = $(this).text();
        var selectedVendorCode = $(this).data('codevendedor'); // Get A3_COD from data attribute
        $('#vendedorInput').val(selectedVendor);
        $('#vendedorInput').data('codevendedor', selectedVendorCode); // Store A3_COD in a data attribute
        $('#vendedorSuggestions').hide();
    });
});

function verificarPrazoEntrega() {
    var dataAtual = new Date();
    
    var datePartsEntrega = $("#dataEntrega").val().split("-");
    var dataEntrega = new Date(datePartsEntrega[0], datePartsEntrega[1] - 1, datePartsEntrega[2]);

    if (dataEntrega.getTime() < dataAtual.getTime() + (1 * 24 * 60 * 60 * 1000)) {
        showAlert("A data de entrega deve ser no mínimo 2 dias após a data de compra.");
        $("#dataEntrega").val('');
    }
}

// Função para verificar o prazo de montagem
function verificarPrazoMontagem() {
    var datePartsEntrega = $("#dataEntrega").val().split("-");
    var dataEntrega = new Date(datePartsEntrega[0], datePartsEntrega[1] - 1, datePartsEntrega[2]);

    var datePartsMontagem = $("#dataMontagem").val().split("-");
    var dataMontagem = new Date(datePartsMontagem[0], datePartsMontagem[1] - 1, datePartsMontagem[2]);

    // Verifica se a data de montagem é pelo menos um dia após a data de entrega
    if (dataMontagem.getTime() < dataEntrega.getTime() + (0 * 24 * 60 * 60 * 1000)) {
        showAlert("A data de montagem deve ser no mínimo 1 dia após a data de entrega.");
        $("#dataMontagem").val('');
    }
}

// Eventos para verificar as datas
$("#dataEntrega").change(function() {
    verificarPrazoEntrega();
    verificarPrazoMontagem(); // Revalidar a data de montagem após a mudança na data de entrega
});

$("#dataMontagem").change(function() {
    verificarPrazoMontagem();
});



function PE_DEPOIS_ADD_PRODUTO(item,divCarrinho,next)   {
    $("#1000MARCAS_ModalAposAddCarrinho").modal({backdrop: "static"});
    nQtditemCarrinhoEntrega = 0;

    var produtoSelecionado = $("#codigo").val().trim();
    if (produtoSelecionado.includes("GARANTIA ESTENDIDA AVULSA")) {
        checkForGarantiaEstendida();
    }else{
    // $("#1000MARCAS_ModalAposAddCarrinho").modal({backdrop: "static"});
    //     populateGarantiaDropdown(item);
    // };
    document.getElementById("1000MARCASBtnCustomerOrderItem").onclick = function(){
        aposFornecerPedidoEItemDoCliente(item,divCarrinho,next);

        $(".list-group-item").each(function() {
            if ($(this).data("ctipoentrega") == 3){
                nQtditemCarrinhoEntrega++;
            }
            
        });
        if (nQtditemCarrinhoEntrega > 0){
            if (nQtditemCarrinhoEntrega <=2){ //Valor minimo de frete sempre será duas vezes o valor do nValFrete
                nQtditemCarrinhoEntrega = 2;
            }
            
            // nValFrete = (nValPadraoFrete*nQtditemCarrinhoEntrega);
            // document.getElementById("valorfrete").innerHTML= ((nValFrete).toFixed(2).toString().toLocaleString());
        }
        somatorio();//Executa a atualização dos totais

    }
}
}

function aposFornecerPedidoEItemDoCliente (item,divCarrinho,next){
    var SinalS  = 'font-weight: bold; size="2" ';
    var tamanho = 'size="5"';
    var Som1    = "somatorio";
    var Som2    = "somatorio";
    var nItem   = 0;
    var cItem   = '';
    var dropdownGarantia = document.getElementById("1000MARCASCustomerOrder");
    var dropdownTurno = document.getElementById("selectTurnoEntrega");
    var dinamica_turno = $("#selectTurnoEntrega").val();
    var dinamica_dataEntrega = $("#dataEntrega").val();
    var dinamica_dataMontagem = $("#dataMontagem").val();
    var vendorCodeDinamica = $('#vendedorInput').data('codevendedor').trim();
    var content=  "" //dropdownGarantia.options[dropdownGarantia.selectedIndex].text;
    cCodigoProd		= $("#codigo").data("codigo")
    nQuantidade		= (parseFloat($("#qtde").val()))
    cCliente		= $("#cliente").data("codigo")
    cLoja			= $("#cliente").data("loja")
    //var valprod =  parseFloat($("#codigo").data("valor").replace(/\./g, "").replace(/\,/g, "."));
    var valprod =  parseFloat($("#codigo").data("valor"));
    
    //var precoNegociado =parseFloat($("#1000MarcasPrecoNegociado").val().replace(/\./g, "").replace(/\,/g, "."));
    
    nQuantidade   = parseInt($("#qtde").val());
    cDesconto     = ((valprod*nQuantidade)*(parseFloat(cPercentual)/100)).toFixed(2)//$("#reais").val()
    //nValUnitCDesc = (parseFloat($("#codigo").data("valor")-($('#reais').val())))-(parseFloat($("#codigo").data("valor")-($('#reais').val())))*(cPercentual/100).toFixed(2).toString()
    nValUnitCDesc = ((valprod)*(nQuantidade)-(parseFloat(cDesconto)))//.toFixed(2).toString().replace(/\./g, ",").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
    //nValorDesconto= ($("#reais").val() == "" ? 0 : parseFloat($("#reais").val().replace(/\./g, "").replace(/\,/g, "."))) //(parseFloat($("#codigo").data("valor")-($('#reais').val())))*(cPercentual/100).toFixed(2).toString()
    //nValorDesconto= ($("#reais").val() == "" ? 0 : (parseFloat($("#codigo").data("valor").replace(/\./g, "").replace(/\,/g, ".")))*(cPercentual/100))
    nValorDesconto = (($('#reais').val()))
    
    //var nValorDescontoUnitario = round(valprod*(parseFloat(cPercentual)/100),2);
    var nValorComDescontoUnitario = valprod;//(valprod - nValorDescontoUnitario);
    var nValorComDescontoTotal = nValorComDescontoUnitario * nQuantidade;


    // if (cPercentual == '' || cPercentual == '0,00' || cPercentual == '0.00'){
    //     cPercentual 	=  data.Dados.DESCONTO;//Agrega desconto no item conforme regra de desconto varejo.
    //     nValUnitCDesc 	= (parseFloat(nValUnitCDesc.replace(/\./g, "").replace(/\,/g, ".")) - parseFloat(nValUnitCDesc.replace(/\./g, "").replace(/\,/g, "."))*(cPercentual/100)).toFixed(2).toString().replace(/\./g, ",").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");//menos valor de desconto.
    //     nValorDesconto	= (parseFloat($("#codigo").data("valor").replace(/\./g, "").replace(/\,/g, ".")))*(cPercentual/100) //((parseFloat($("#codigo").data("valor").replace(/\./g, "").replace(/\,/g, ".")))*(cPercentual/100)).toFixed(2).toString().replace(/\./g, ",").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
    // }
    // LR_VRUNIT = valor
    // LR_VLRITEM = valort
    // LR_PRCTAB = valor
    if ($("#1000MARCASCustomerOrder").val() != ''){
        $(".list-group-item").each(function(index) {
            nItem ++
         });
         if (nItem == 0){
             nItem = 1;
         }else{
             nItem += 1;
         }
         
    }
    
    cTipoEntrega = $("#selectTipoEntrega").val()
    
    cValsemDescont= $("#codigo").data("valor");
    cCodProduto   = $("#codigo").data("codigo");
    cDescricaoProd= $("#codigo").val();
    cQtdEstoque   = $("#codigo").data("estoque");
    if ($("#1000MARCASCustomerOrder").val() != ''){
        cItem         = (nItem+1).toString();
    }else{
        cItem         = (0).toString();
    }
    //arrumado valort e valor, colocando o valor sem desconto
    //pois estava acusando erro de o LR_VALDESC(descontoreais) ser maior que o valor do item
    var item = '<a data-acessorio="acessorio"'+
                    ' data-percent="' 			+ cPercentual.toString() + '"' +
                    ' data-descontoreais="' 	+ nValorDesconto + '"' +
                    ' data-codigo="'			+ cCodProduto + '"' +
                    //' data-valort="'			+ nValorComDescontoTotal.toFixed(2) + '"' +
                    //' data-valor="'				+ nValorComDescontoUnitario.toFixed(2) + '"' +
                    ' data-valort="'			+ nValorComDescontoTotal.toString() + '"' +
                    ' data-valor="'				+ nValorComDescontoUnitario.toString() + '"' +
                    //' data-valort="'			+ nValUnitCDesc + '"' +
                    //' data-valor="'				+ cValsemDescont + '"' +
                    ' data-desc="'				+ cDescricaoProd + '"' +
                    ' data-qtde="'				+ nQuantidade + '"' +
                    ' data-reais="'				+ cDesconto + '"' +
                    ' data-estoque="'			+ cQtdEstoque + '"' +
                ' data-turno="'			+ dinamica_turno + '"' +
                ' data-dataentrega="'			+ dinamica_dataEntrega + '"' +
                ' data-datamontagem="'			+ dinamica_dataMontagem + '"' +
                ' data-vendcod="'			+ vendorCodeDinamica + '"' +
                    ' data-itempro="'			+ cItem + '"' +
                    ' data-ctipoentrega="'      + cTipoEntrega+ '"' +
                    ' data-cmesesdegarantia="'  + dropdownGarantia.value+ '"' +
                        '" href="javascript:void(0);" class="list-group-item" '+'ondblclick="deleta(this);" onclick="selline(this);" id="itens"';
    
    var divCarrinho = '<div class="row" style="font-size: 12px;">'+
                        '<div class="col-lg-4 " style="' 							+ tamanho 		+  '" >' + cCodProduto+' - '+ cDescricaoProd 	+ '</div>'+
                        '<div class="col-lg-1 " align="center">'					+ nQuantidade 													+ '</div>'+
                        '<div class="col-lg-3 " align="left"  " >' 					+ cValsemDescont 												+ '</div>'+
                        '<div class="col-lg-1 percentual" align="right"> ' 			+(parseFloat(cPercentual)).toFixed(2).toString()				+ '</div>'+
                        '<div class="col-lg-3 somatorio" align="right" " style="' 	+ SinalS +  '" > '+ nValUnitCDesc.toString()								+ '</div>'+
                    '</div>';

    if(parseFloat($("#codigo").data("estoque")) == 0.00){
        divCarrinho += '<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" align="center"><span class="style_indisponivel">&nbsp;&nbsp;&nbsp;Indisponnível em estoque.&nbsp;&nbsp;&nbsp;</span></div></div>';
    }
    
    item = item+'>'+ divCarrinho+ '</a>';
    //$("#1000MarcasPrecoNegociado").val("");
    //$("#1000MARCASCustomerOrderItem").val("");
    next(item)

    
    if (content != '' && content != "Sem garantia estendida"){
        
        // Use a regular expression to extract the numeric value following "Valor:"
        const match = content.match(/Valor: (\d+(\.\d+)?)/);
        const parsedValue = parseFloat(match[1]);
        cCodProduto = "GARANTIA";
        cDescricaoProd = "GARANTIA " + $("#1000MARCASCustomerOrder").val() + " MESES";
        nQuantidade = 1;
        cDesconto   = '0';
        cQtdEstoque = '1';
        cValsemDescont = parsedValue;
        nValUnitCDesc= parsedValue;
        cItem         = (nItem).toString();
        var item = '<a data-acessorio="acessorio"'+
                        ' data-percent="' 			+ cPercentual.toString() + '"' +
                        ' data-descontoreais="' 	+ nValorDesconto + '"' +
                        ' data-codigo="'			+ cCodProduto + '"' +
                        ' data-valort="'			+ cValsemDescont + '"' +
                        ' data-valor="'				+ nValUnitCDesc + '"' +
                        //' data-valort="'			+ nValUnitCDesc + '"' +
                        //' data-valor="'				+ cValsemDescont + '"' +
                        ' data-desc="'				+ cCodProduto + '"' +
                        ' data-qtde="'				+ nQuantidade + '"' +
                        ' data-reais="'				+ cDesconto + '"' +
                        ' data-estoque="'			+ cQtdEstoque + '"' +
                        ' data-itempro="'			+ cItem + '"' +
                        ' data-ctipoentrega="'      + "2"+ '"' +
                        ' data-cmesesdegarantia="'  + dropdownGarantia.value+ '"' +
                            '" href="javascript:void(0);" class="list-group-item" '+'ondblclick="deleta(this);" onclick="selline(this);" id="itens"';
        
        var divCarrinho = '<div class="row" style="font-size: 12px;">'+
                            '<div class="col-lg-4 " style="' 							+ tamanho 		+  '" >' + cCodProduto+' - '+ cDescricaoProd 	+ '</div>'+
                            '<div class="col-lg-1 " align="center">'					+ nQuantidade 													+ '</div>'+
                            '<div class="col-lg-3 " align="left"  " >' 					+ cValsemDescont 												+ '</div>'+
                            '<div class="col-lg-1 percentual" align="right"> ' 			+(parseFloat(cPercentual)).toFixed(2).toString()				+ '</div>'+
                            '<div class="col-lg-3 somatorio" align="right" " style="' 	+ SinalS +  '" > '+ nValUnitCDesc.toFixed(2).toString()								+ '</div>'+
                        '</div>';

        if($("#1000MARCASCustomerOrder").val() != ''){
            divCarrinho += '<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" align="center"><span class="style_disponivel">&nbsp;&nbsp;&nbsp;Garantia do Item:'+nItem.toString()+' &nbsp;&nbsp;&nbsp;</span></div></div>';
        }
        
        item = item+'>'+ divCarrinho+ '</a>';
        //$("#1000MarcasPrecoNegociado").val("");
        $("#1000MARCASCustomerOrderItem").val("");
        $("#1000MARCASCustomerOrder").val("");
        next(item)
    }
}
window.myGlobalFunction = PE_GERORC_ANTES_GERORC;
delete window.myGlobalFunction;
function PE_GERORC_ANTES_GERORC(jsonenv){
    var lEntregaposterior   = false;
    var typeInvoice = sessionStorage.getItem("typeInvoice");
    const nQtdItensCarrinho = jsonenv.itens.length;
    jsonenv.cabecalho[0].LQ_IMPNF = (typeInvoice=="1" ? ".F." : ".T."); //1=NFC-e ; 2=NF-e

    $(".list-group-item").each(function(index) {
        jsonenv.itens[index]["LR_ITEM"] = ("0000" + (index+1)).slice(-2);
        jsonenv.itens[index]["LR_VEND"] = $(this).data("vendcod").toString();
        /**Configura operação é entrega posterior c/pedido */
         if ($(this).data("ctipoentrega") == 3 && !(lEntregaposterior) ){
             lEntregaposterior = true;
         }
        if (lEntregaposterior){
            jsonenv.cabecalho[0]["AUTRESERVA"]  =  '';
            jsonenv.itens[index]["LR_ENTREGA"] = $(this).data("ctipoentrega").toString();
            jsonenv.itens[index]["LR_XTURNO"] = $(this).data("turno").toString();
            jsonenv.itens[index]["LR_FDTENTR"] = $(this).data("dataentrega").toString().split('-').reverse().join('/');
            jsonenv.itens[index]["LR_FDTMONT"] = $(this).data("datamontagem").toString().split('-').reverse().join('/');
            
        }
    });

    return jsonenv;
} 

// Adiciona o modal de alerta dinamicamente ao body
$("body").append(`
    <div class="modal fade" id="alertModalDinamica" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Alerta</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p id="alertMessageDinamica">Esta é uma mensagem de alerta.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>
                </div>
            </div>
        </div>
    </div>
`);

// Função para exibir o alerta com uma mensagem personalizada
function showAlert(message) {
    document.getElementById("alertMessageDinamica").innerText = message;
    $("#alertModalDinamica").modal({ backdrop: "static" });
}

