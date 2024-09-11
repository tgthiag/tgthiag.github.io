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

        if (produtorRural != undefined) {
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


// THIAGO CARVALHO
$("body").append(`
    <div class="modal fade" id="AgroAmazonia_ModalAposAddCarrinho" role="dialog">
        <div class="modal-dialog modal-lg">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Opções de Cultura e Problema
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>						
                    </h4>
                </div>
                <div class="modal-body">
                    <form id="AgroAmazonia_ModalFormAposAddCarrinho">
                        <!-- Cultura Dropdown -->
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <label class="fonte">Cultura</label>
                                <select id="selectCultura" class="form-control" required>
                                    <option value="">Selecione uma Cultura</option>
                                    <!-- Cultura options will be dynamically populated here -->
                                </select>
                            </div>
                        </div>

                        <!-- Problema Dropdown (Dependent on Cultura) -->
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <label class="fonte">Problema</label>
                                <select id="selectProblema" class="form-control" required disabled>
                                    <option value="">Selecione um Problema</option>
                                    <!-- Problema options will be dynamically populated based on Cultura -->
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button id="AgroAmazoniaBtnCustomerOrderItem" class="btn btn-success" data-dismiss="modal">Continuar <i class="fas fa-check"></i></button>
                </div>
            </div>
        </div>
    </div>
`);

// Function to populate Cultura dropdown
function populateCultura() {
    const produtoCodigo = $("#codigo").data("codigo"); // Get produto code from element

    $.ajax({
        url: `https://mingle.agroamazonia.com/dev/api/aasa/v1/agrotis/easy/culturas/${produtoCodigo}`,
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + btoa('api.easy:!@eas255')
        },
        success: function (data) {
            $('#selectCultura').empty().append('<option value="">Selecione uma Cultura</option>');
            data.forEach(cultura => {
                $('#selectCultura').append(
                    `<option value="${cultura.creaSc}" data-codCultura="${cultura.codCultura}">${cultura.nomeComum}</option>`
                );
            });
        },
        error: function (error) {
            console.error("Erro ao carregar culturas:", error);
        }
    });
}

function populateProblema(codCultura) {
    const produtoCodigo = $("#codigo").data("codigo");

    $.ajax({
        url: `https://mingle.agroamazonia.com/dev/api/aasa/v1/agrotis/easy/problemas/${produtoCodigo}/${codCultura}`,
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + btoa('api.easy:!@eas255')
        },
        success: function (data) {
            $('#selectProblema').empty().append('<option value="">Selecione um Problema</option>');
            data.forEach(problema => {
                $('#selectProblema').append(
                    `<option value="${problema.codigoSiagroPR}">${problema.nomeVulgar}</option>`
                );
            });
            $('#selectProblema').prop('disabled', false);
        },
        error: function (error) {
            console.error("Erro ao carregar problemas:", error);
        }
    });
}

$('#AgroAmazonia_ModalAposAddCarrinho').on('shown.bs.modal', function () {
    $('#selectCultura').on('change', function () {
        const codCultura = $(this).find(':selected').data('codcultura');
        if (codCultura) {
            populateProblema(codCultura);
        } else {
            $('#selectProblema').prop('disabled', true).empty().append('<option value="">Selecione um Problema</option>');
        }
    });
});



    
function PE_DEPOIS_ADD_PRODUTO(item,divCarrinho,next)   {
    if (item.includes("Produto Controlado")) {
        if ($("#produtorRuralCode").text() != "") {
        populateCultura();
        $("#AgroAmazonia_ModalAposAddCarrinho").modal({backdrop: "static"});
        document.getElementById("AgroAmazoniaBtnCustomerOrderItem").onclick = function(){
            aposFornecerPedidoEItemDoCliente(item,divCarrinho,next);
            }
            somatorio();//Executa a atualização dos totais
        }else{
            showAlert("O produto é controlado, e o cliente não está cadastrado como produtor rural.");
        }
    }else{
        aposFornecerPedidoEItemDoCliente(item,divCarrinho,next);

        somatorio();//Executa a atualização dos totais
    };
}

function aposFornecerPedidoEItemDoCliente (item,divCarrinho,next){
    var SinalS  = 'font-weight: bold; size="2" ';
    var tamanho = 'size="5"';
    var Som1    = "somatorio";
    var Som2    = "somatorio";
    var nItem   = 0;
    var cItem   = '';
    const codCulturaAgroAmazonia = $("#selectCultura").find(':selected').val();
    const codProblemaAgroAmazonia = $("#selectCultura").find(':selected').val();

    // var AgroAmazonia_turno = $("#selectTurnoEntrega").val();
    // var AgroAmazonia_dataEntrega = $("#dataEntrega").val();
    // var AgroAmazonia_dataMontagem = $("#dataMontagem").val();
    // var vendorCodeAgroAmazonia = $('#vendedorInput').data('codevendedor').trim();
    var content=  "" //dropdownGarantia.options[dropdownGarantia.selectedIndex].text;
    cCodigoProd		= $("#codigo").data("codigo")
    nQuantidade		= (parseFloat($("#qtde").val()))
    cCliente		= $("#cliente").data("codigo")
    cLoja			= $("#cliente").data("loja")
    //var valprod =  parseFloat($("#codigo").data("valor").replace(/\./g, "").replace(/\,/g, "."));
    var valprod =  parseFloat($("#codigo").data("valor"));
    
    //var precoNegociado =parseFloat($("#AgroAmazoniaPrecoNegociado").val().replace(/\./g, "").replace(/\,/g, "."));
    
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
    if ($("#AgroAmazoniaCustomerOrder").val() != ''){
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
    if ($("#AgroAmazoniaCustomerOrder").val() != ''){
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
                // ' data-turno="'			+ AgroAmazonia_turno + '"' +
                ' data-culturaAgro="' + (item.includes("Produto Controlado") ? codCulturaAgroAmazonia : "") + '"' +
                ' data-problemaAgro="' + (item.includes("Produto Controlado") ? codProblemaAgroAmazonia : "") + '"' +
                // ' data-vendcod="'			+ vendorCodeAgroAmazonia + '"' +
                    ' data-itempro="'			+ cItem + '"' +
                    ' data-ctipoentrega="'      + cTipoEntrega+ '"' +
                    // ' data-cmesesdegarantia="'  + dropdownGarantia.value+ '"' +
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
    //$("#AgroAmazoniaPrecoNegociado").val("");
    //$("#AgroAmazoniaCustomerOrderItem").val("");
    next(item)

    
    if (content != '' && content != "Sem garantia estendida"){
        
        // Use a regular expression to extract the numeric value following "Valor:"
        const match = content.match(/Valor: (\d+(\.\d+)?)/);
        const parsedValue = parseFloat(match[1]);
        cCodProduto = "GARANTIA";
        cDescricaoProd = "GARANTIA " + $("#AgroAmazoniaCustomerOrder").val() + " MESES";
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
                        // ' data-cmesesdegarantia="'  + dropdownGarantia.value+ '"' +
                            '" href="javascript:void(0);" class="list-group-item" '+'ondblclick="deleta(this);" onclick="selline(this);" id="itens"';
        
        var divCarrinho = '<div class="row" style="font-size: 12px;">'+
                            '<div class="col-lg-4 " style="' 							+ tamanho 		+  '" >' + cCodProduto+' - '+ cDescricaoProd 	+ '</div>'+
                            '<div class="col-lg-1 " align="center">'					+ nQuantidade 													+ '</div>'+
                            '<div class="col-lg-3 " align="left"  " >' 					+ cValsemDescont 												+ '</div>'+
                            '<div class="col-lg-1 percentual" align="right"> ' 			+(parseFloat(cPercentual)).toFixed(2).toString()				+ '</div>'+
                            '<div class="col-lg-3 somatorio" align="right" " style="' 	+ SinalS +  '" > '+ nValUnitCDesc.toFixed(2).toString()								+ '</div>'+
                        '</div>';

        if($("#AgroAmazoniaCustomerOrder").val() != ''){
            divCarrinho += '<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" align="center"><span class="style_disponivel">&nbsp;&nbsp;&nbsp;Garantia do Item:'+nItem.toString()+' &nbsp;&nbsp;&nbsp;</span></div></div>';
        }
        
        item = item+'>'+ divCarrinho+ '</a>';
        //$("#AgroAmazoniaPrecoNegociado").val("");
        $("#AgroAmazoniaCustomerOrderItem").val("");
        $("#AgroAmazoniaCustomerOrder").val("");
        next(item)
    }
}
$("body").append(`
    <div class="modal fade" id="alertModalAgroAmazonia" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Alerta</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p id="alertMessageAgroAmazonia">Esta é uma mensagem de alerta.</p>
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
    document.getElementById("alertMessageAgroAmazonia").innerText = message;
    $("#alertModalAgroAmazonia").modal({ backdrop: "static" });
}

function PE_GERORC_ANTES_GERORC(jsonenv){
    // var lEntregaposterior   = false;
    // var typeInvoice = sessionStorage.getItem("typeInvoice");
    // const nQtdItensCarrinho = jsonenv.itens.length;
    // jsonenv.cabecalho[0].LQ_IMPNF = (typeInvoice=="1" ? ".F." : ".T."); //1=NFC-e ; 2=NF-e

    $(".list-group-item").each(function(index) {
        if ($("#produtorRuralCode").text() != "") {
            jsonenv.cabecalho[0]["LQ_YAGRONO"]  =  $("#produtorRuralCode").text();
        }
        
        let culturaAgro = $(this).data("culturaAgro");
        let problemaAgro = $(this).data("problemaAgro");
    
        if (culturaAgro) {
            jsonenv.itens[index]["LR_YCULTUR"] = culturaAgro.toString();
        }
        if (problemaAgro) {
            jsonenv.itens[index]["L2_YPROBLE"] = problemaAgro.toString();
        }
    });

    return jsonenv;
} 