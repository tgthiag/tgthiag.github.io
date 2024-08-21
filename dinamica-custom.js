console.log("Hello world2!");
function inserirCampos() {
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
                    <input type="number" class="form-control clearableInput ui-autocomplete-input" autocomplete="off" placeholder="Informe o documento do cliente" name="documento" id="documentoCliente" required="">
                        <i class="clearable__clear">×</i>
                        <span class="input-group-addon"></span>
                </div>
                <span id="lblcliente" class="span-erro"></span>
            </div>
        </div>`

    const divInputCliente = document.createElement("div")
    divInputCliente.innerHTML = divInputClienteHtml

    const formInfo = document.getElementById("formInfo")
    const divBuscaProduto = document.getElementById("divBuscaProduto")

    formInfo.insertBefore(divInputCliente, divBuscaProduto)
}

const button = document.querySelector('#divAddProd button');
button.addEventListener("click", function () {
    const nomeCliente = document.getElementById("nomeCliente")
    const documentoCliente = document.getElementById("documentoCliente")

    jsonorc.cabecalho[0].LQ_OBS1 = nomeCliente.value
    jsonorc.cabecalho[0].LQ_OBS2 = documentoCliente.value

    if (typeof PE_GERORC_ANTES_GERORC === 'function') {
        PE_GERORC_ANTES_GERORC(jsonorc);
    }
})

inserirCampos()
function createConsultaPresentesBtn() {
    const button = document.createElement('button');

    button.className = 'btn btn-primary form-control';

    button.style.marginTop = '5px';
    button.style.marginBottom = '5px';

    button.setAttribute('type', 'button');

    button.addEventListener('click', function () {
        $("#modalListaPresentes").modal({ backdrop: "static" });
    })

    button.textContent = 'Lista de Presentes';

    const divMenu = document.getElementById('divMenu')

    divMenu.insertBefore(button, divMenu.firstChild);
}

function createModalPresentes() {
    const modalHtml =
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
                                        <option value="1">1 - Número da lista</option>
                                        <option value="2">2 - Atores</option>
                                        <option value="3">3 - Data de evento</option>
                                        <option value="4">4 - Local de Evento</option>
                                        <option value="5">5 - Nome do organizador</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-lg-4 col-md-4 col-sm-10 col-xs-10" style="padding-top: 12px;">
                                <div class="input-group input-group-lg">
                                    <input type="text" class="form-control" autocomplete="off" id="txtPesquisa">
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
        </div>`;

    const modalProdutosHtml =
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
</div>`;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    document.body.insertAdjacentHTML('beforeend', modalProdutosHtml);
}

// const response = {
//     "ListaPresentes": [
//         {
//             "Codigo": "000001",
//             "Tipo": "2",
//             "Nome": "CASAMENTO DO RAFAEL",
//             "TipoEvento": "001",
//             "DataEvento": "20240808",
//             "LocalEvento": "LAGO DO AROCHE",
//             "CodigoCliente": "000001",
//             "LojaCliente": "01",
//             "NomeCliente": "N ORIGUELA SERVICOS CORPORATIVOS LTDA",
//             "CodigoVendedor": "000001",
//             "NomeVendedor": "VENDEDOR PADRAO",
//             "CodigoAtor": "01",
//             "DescAtor": "ANDRE",
//             "Produtos": [
//                 {
//                     "Item": "001",
//                     "CodigoProduto": "000001",
//                     "DescProduto": "PRODUTO 1",
//                     "UnidadeMedida": "UN",
//                     "QtdSolicitada": 1,
//                     "QtdAtendida": 0,
//                     "ValorUnitario": 0,
//                     "ImagemBase64": "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"
//                 },
//                 {
//                     "Item": "002",
//                     "CodigoProduto": "000002",
//                     "DescProduto": "PRODUTO 2",
//                     "UnidadeMedida": "UN",
//                     "QtdSolicitada": 1,
//                     "QtdAtendida": 0,
//                     "ValorUnitario": 0,
//                     "ImagemBase64": "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"
//                 }
//             ]
//         },
//         {
//             "Codigo": "000002",
//             "Tipo": "1",
//             "Nome": "FESTA DO DENNIS",
//             "TipoEvento": "002",
//             "DataEvento": "20241231",
//             "LocalEvento": "SALAO MENINO DE OURO",
//             "CodigoCliente": "000002",
//             "LojaCliente": "01",
//             "NomeCliente": "VICTOR HUGO VIEIRA BARBOSA",
//             "CodigoVendedor": "000002",
//             "NomeVendedor": "VENDEDOR TESTES",
//             "CodigoAtor": "02",
//             "DescAtor": "B",
//             "Produtos": [
//                 {
//                     "Item": "001",
//                     "CodigoProduto": "000003",
//                     "DescProduto": "PRODUTO 3",
//                     "UnidadeMedida": "UN",
//                     "QtdSolicitada": 1,
//                     "QtdAtendida": 0,
//                     "ValorUnitario": 0,
//                     "ImagemBase64": ""
//                 },
//                 {
//                     "Item": "002",
//                     "CodigoProduto": "000004",
//                     "DescProduto": "PRODUTO 4",
//                     "UnidadeMedida": "UN",
//                     "QtdSolicitada": 1,
//                     "QtdAtendida": 0,
//                     "ValorUnitario": 0,
//                     "ImagemBase64": ""
//                 }
//             ]
//         }
//     ]
// }

function insertData() {
    clearListas()

    const table = document.getElementById("dtPresentes")
    const tbody = document.getElementById("bodydtPresentes")

    $.ajax({
        url: "http://45.236.240.38:9051/rest/EASYMOBILE/CONSULTAS/LISTAPRESENTES",
        type: "GET",
        async: true,
        dataType: "json",
        contentType: "application/json",
        success: function (response) {
            const data = response.ListaPresentes

            data.forEach((lista) => {
                const row = document.createElement("tr")
                row.style.cursor = "pointer"
                row.style.transition = "0.2s"

                $(tbody).append($(row).append(`
                    <td>${lista.Codigo}</td>
                    <td>${lista.CodigoCliente}</td>
                    <td>${lista.NomeCliente}</td>
                    <td>${lista.Nome}</td>
                    <td>${lista.DataEvento}</td>
                    <td>${lista.LocalEvento}</td>
                    `));

                row.addEventListener("click", function () {
                    lista.Produtos.forEach((produto) => {
                        const produtosRow = document.createElement("tr")
                        const imgElement = document.createElement('img');
                        const checkbox = document.createElement("input");
                        checkbox.setAttribute('type', 'checkbox')

                        imgElement.src = 'data:image/png;base64,' + produto.ImagemBase64;

                        imgElement.width = 100;
                        imgElement.height = 100;

                        $("#bodydtProdutos")
                            .append($(produtosRow)
                                .append(
                                    $('<td>').append(checkbox)
                                )
                                .append(
                                    $('<td>').append(imgElement)
                                )
                                .append(`
                                <td>${produto.Item}</td>
                                <td>${produto.CodigoProduto}</td>
                                <td>${produto.DescProduto}</td>
                                <td>${produto.ValorUnitario}</td>
                                <td>${produto.UnidadeMedida}</td>
                                <td>${produto.QtdAtendida}</td>
                                <td>${produto.QtdSolicitada}</td>
                        `));
                    })

                    $("#modalProdutosLista").modal({ backdrop: "static" })
                })

                row.addEventListener("mouseover", function () {
                    row.style.backgroundColor = "#00000024"
                })

                row.addEventListener("mouseout", function () {
                    row.style.backgroundColor = ""
                })
            })

            table.style.display = "block"
        },
        error: function (jqXhr, textStatus, errorThrown) {

            $("#alerta").modal({ backdrop: "static" });
            $("#dmodal").html("Erro ao carregar as listas de presentes");//statusText
        }
    })
}

function clearListas() {
    $("#bodydtPresentes tr").remove();
    const table = document.getElementById("dtPresentes")
    table.style.display = "none"
}

function clearProdutos() {
    $("#bodydtProdutos tr").remove();
}

createModalPresentes()
createConsultaPresentesBtn()

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
                                <ul id="vendedorSuggestions" class="list-group" style="position: absolute; z-index: 1000; display: none;"></ul>
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
        var query = $(this).val();
        if (query.length >= 3) {
            $.ajax({
                url: url + "QueryResult",
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({
                    "cnpj_empresa": cCnpj,
                    "query": "SELECT TOP 2 * FROM xEmp('SA3') SA3 WHERE A3_NOME LIKE '%" + query + "%'"
                }),
                success: function(response) {
                    if (response && response.Dados) {
                        var suggestions = response.Dados.map(function(item) {
                            return '<li class="list-group-item" data-code="' + item.A3_COD + '">' + item.A3_NOME + '</li>';
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
        $('#vendedorInput').val(selectedVendor);
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

function PE_GERORC_ANTES_GERORC(jsonenv){
    var lEntregaposterior   = false;
    var typeInvoice = sessionStorage.getItem("typeInvoice");
    const nQtdItensCarrinho = jsonenv.itens.length;
    jsonenv.cabecalho[0].LQ_IMPNF = (typeInvoice=="1" ? ".F." : ".T."); //1=NFC-e ; 2=NF-e

    $(".list-group-item").each(function(index) {

        jsonenv.itens[index]["LR_ITEM"] = ("0000" + (index+1)).slice(-2);

        /**Configura operação é entrega posterior c/pedido */
         if ($(this).data("ctipoentrega") == 3 && !(lEntregaposterior) ){
             lEntregaposterior = true;
         }
        // if ($(this).data("cmesesdegarantia") != 100 && $(this).data("cmesesdegarantia") !== undefined){
        //     jsonenv.itens[index]["LR_XMSGAR"] = $(this).data("cmesesdegarantia").toString();
        // }
        
        
        // if (nValFrete != 0){
        //     jsonenv.itens[index]["LR_VALFRE"] =  (nValFrete/nQtdItensCarrinho).toString()
        // }
        

        
        
        /**Configura operação quando o produto tem garantia */
        // if (jsonenv.itens[index]["LR_PRODUTO"] == 'GARANTIA'){
        //     jsonenv.itens[index]["LR_GARANT"] = '';
        //     jsonenv.itens[index]["LR_ITEMGAR"] = ("0000" + parseFloat($(this).data("itempro"))).slice(-2);

        //     //Essas colunas são excluídas quando o item é Garatina para concretizar o processo dentro do orçamento.
        //     delete jsonenv.itens[index].LR_QUANT
        //     delete jsonenv.itens[index].LR_DESC
        //     delete jsonenv.itens[index].LR_VALDESC
        //     delete jsonenv.itens[index].LR_DESCPRO
        //     delete jsonenv.itens[index].LR_VEND

        // }else if (jsonenv.itens[index]["LR_PRODUTO"] != 'GARANTIA' || ("0000" + parseFloat($(this).data("itempro"))).slice(-2) != ''){
        //     jsonenv.itens[index]["LR_GARANT"] = 'GARANTIA';
        //     jsonenv.itens[index]["LR_ITEMGAR"] = ("0000" + parseFloat($(this).data("itempro"))).slice(-2);
        // }
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

