console.log("Hello world! teste");
// document.getElementById("btnBudgetType").style.display  = "block";//Salva Orçamento
$("#textSelectTypeInvoice").html("<p>Selecione o tipo de operação a ser executado:.</p>");


// function PE_BUSCA_GRID_PROD(ui){
//     verificandoProdutoControlado(ui.item);
// }

function verificandoProdutoControlado(codProdToCheck) {
    var query = {
        cnpj_empresa: cCnpj,
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

function populateCultura() {
    const produtoCodigo = $("#codigo").data("codigo");

    $('#selectCultura').empty().append('<option value="">Selecione uma Cultura</option>');

    $.ajax({
        url: `https://mingle.agroamazonia.com/dev/api/aasa/v1/agrotis/easy/culturas/${produtoCodigo}`,
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + btoa('api.easy:!@eas255')
        },
        success: function (response) {
            let data;

            if (typeof response === 'string') {
                try {
                    data = JSON.parse(response);
                } catch (e) {
                    console.error("Error parsing JSON response:", e);
                    return; 
                }
            } else {
                data = response;
            }
            function processData() {
                if ($('#selectCultura').find('option').length > 1) {
                    console.log("Dropdown already populated, stopping retries.");
                    return;
                }

                try {
                    if (Array.isArray(data)) {
                        data.forEach(cultura => {
                            let bytes = new Uint8Array(cultura.nomeComum.split('').map(char => char.charCodeAt(0)));
                            let decoder = new TextDecoder('utf-8');
                            let correctString = decoder.decode(bytes);
                            $('#selectCultura').append(
                                `<option value="${cultura.codCultura}" data-codCultura="${cultura.codCultura}">${correctString}</option>`
                            );
                        });
                    } else {
                        console.error("Unexpected data format, expected an array");
                        setTimeout(processData, 1000);
                    }
                } catch (error) {
                    console.error("Error during data.forEach execution:", error);
                    setTimeout(processData, 1000);
                }
            }

            processData();
        },
        error: function (error) {
            console.error("Erro ao carregar culturas:", error);
        }
    });
}


function populateProblema(codCultura) {
    const produtoCodigo = $("#codigo").data("codigo");

    $('#selectProblema').empty().append('<option value="">Selecione um Problema</option>');

    $.ajax({
        url: `https://mingle.agroamazonia.com/dev/api/aasa/v1/agrotis/easy/problemas/${produtoCodigo}/${codCultura}`,
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + btoa('api.easy:!@eas255')
        },
        success: function (response) {
            let data;

            if (typeof response === 'string') {
                try {
                    data = JSON.parse(response);
                } catch (e) {
                    console.error("Error parsing JSON response:", e);
                    return;
                }
            } else {
                data = response;
            }
            function processData() {
                if ($('#selectProblema').find('option').length > 1) {
                    console.log("Dropdown already populated, stopping retries.");
                    return;
                }

                try {
                    if (Array.isArray(data)) {
                        data.forEach(problema => {
                            let bytes = new Uint8Array(problema.nomeVulgar.split('').map(char => char.charCodeAt(0)));
                            let decoder = new TextDecoder('utf-8');
                            let correctString = decoder.decode(bytes);
                            $('#selectProblema').append(
                                `<option value="${problema.codProblema}">${correctString}</option>`
                            );
                        });
                        $('#selectProblema').prop('disabled', false);
                    } else {
                        console.error("Unexpected data format, expected an array");
                        setTimeout(processData, 1000);
                    }
                } catch (error) {
                    console.error("Error during data.forEach execution:", error);
                    setTimeout(processData, 1000);
                }
            }

            processData();

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


function PE_FECHAR_PEDIDO() {
    let hasProdutoControlado = false;
    $(".list-group-item").each(function(index) {
        let desc = $(this).data('desc');

        if (typeof desc === 'string' && desc.includes("Produto Controlado")) {
            hasProdutoControlado = true;
            return false;
        }
    });
    if (hasProdutoControlado) {
        $('#btnmfecharped').css('display', 'none');
    } else {
        $('#btnmfecharped').css('display', 'block');
    }
    $("#modalSelectTypeInvoice").modal({backdrop: "static"});
}

    
function PE_DEPOIS_ADD_PRODUTO(item,divCarrinho,next)   {
    if (item.includes("Produto Controlado")) {
        if ($("#produtorRuralCode").text() != "") {
        populateCultura();
        $("#AgroAmazonia_ModalAposAddCarrinho").modal({backdrop: "static"});
        document.getElementById("AgroAmazoniaBtnCustomerOrderItem").onclick = function(){
            $(".mm").remove()
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
    const codProblemaAgroAmazonia = $("#selectProblema").find(':selected').val();

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
    
    cTipoEntrega = "2";
    
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
                    ' data-ctipoentrega="'      + "2"+ '"' +
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
    var typeInvoice = sessionStorage.getItem("typeInvoice");
    jsonenv.cabecalho[0].LQ_IMPNF =  (typeInvoice=="1" ? ".F." : ".T."); //1=NFC-e ; 2=NF-e

    $(".list-group-item").each(function(index) {
        if ($("#produtorRuralCode").text() != "") {
            jsonenv.cabecalho[0]["LQ_YAGRONO"]  =  $("#produtorRuralCode").text();
        }
        
        let culturaAgro = $(this).data("culturaagro");
        let problemaAgro = $(this).data("problemaagro");
    
        if (culturaAgro) {
            jsonenv.itens[index]["LR_YCULTUR"] = culturaAgro.toString();
        }
        if (problemaAgro) {
            jsonenv.itens[index]["L2_YPROBLE"] = problemaAgro.toString();
        }
    });

    return jsonenv;
} 


///////////[[[[[ TESTE [[[[]]]]]]]]]
function PE_BUSCA_GRID_PROD(ui){
    verificandoProdutoControlado(ui.item);
    if (!ui.item.cTabSelect || ui.item.cTabSelect.trim() == ''){
        $("#divdesc").show();
        $("#divdesc2").show();
    }else{
        $("#divdesc").hide();
        $("#divdesc2").hide();
        $("#percent").val("");
        $("#reais").val("");
    }
    sessionStorage.setItem("cloteproduto",'');
    var fPx = '';
    var cItens = '';
    var cCodigoProd		= $("#codigo").data("codigo");
    var cLoteVenda      = '';
    var query= {
        "cnpj_empresa": cCnpj,
        "query":" SELECT B8_LOTECTL, B8_PRODUTO,B8_LOCAL,B8_DATA,CONVERT(varchar, CONVERT(datetime, B8_DTVALID), 103) AS B8_DTVALID,B8_SALDO, B8_LOTEFOR"+
                " FROM xEmp('SB8') "+
                " WHERE  D_E_L_E_T_ = ' ' "+
                "   AND B8_FILIAL = xFilial('SB8')"+
                "   AND B8_PRODUTO = '"+cCodigoProd+"' "+
                "   AND B8_SALDO > 0 "
    };

    $.ajax({
        url: url + "QueryResult",
        type: "POST",
        async: false,
        data: JSON.stringify(query),
        dataType: "json",
        contentType: "application/json",
        success: function (data){
            
            $(data.Dados).each(function(index) {
                var cLoteProduto 	= data.Dados[index].B8_LOTECTL;
                var cSaldo 	        = data.Dados[index].B8_SALDO;
                var dValidade 	    = data.Dados[index].B8_DTVALID;
                var cLotefor 	    = data.Dados[index].B8_LOTEFOR;

                cItens += '<tr>';
                cItens += '<td>'+cLoteProduto+'</td>';
                cItens += '<td>'+cSaldo+'</td>';
                cItens += '<td>'+dValidade+'</td>';
                cItens += '<td>'+cLotefor+'</td>';
                cItens += '<td align="center" ><button value="'+cLoteProduto.trim()+'" id="BtnLoteProduto" class="btn" onclick="';
                cItens += "loteselecionado('"+cLoteProduto+"') ";
                cItens += ';"><i class="fas fa-window-close"></i></button>   </td>';//add pedido
                cItens += '</tr>';
            });

            if (cItens != ''){
                fPx += '<table id="listapedidos12" class="table table-striped table-bordered" style="width:100%">';
                fPx += '<thead>'+
                            '<tr>'+
                                '<th>Lote</th>'+
                                '<th>Saldo</th>'+
                                '<th>Validade</th>'+
                                '<th>Lote Fornecedor</th>'+
                                '<th>Selecionar Lote</th>'+
                            '</tr>'+
                        '</thead>';
                fPx += '<tbody>';
                fPx += cItens
                fPx += '</tbody>';
                fPx += '</table>';  

                document.getElementById("dmodal12item").innerHTML = fPx;
 
                var dtable = $('#listapedidos12').DataTable(
                    {
                        pageLength: 4,
                        responsive: true,
                        "bFilter": false,
                        "language": {
                        url: '//cdn.datatables.net/plug-ins/1.10.20/i18n/Portuguese-Brasil.json'
                        }
                    }
                ); 
        
                new $.fn.dataTable.FixedHeader( dtable );
                
                $("#modal_dozemesescompra").modal({backdrop: "static"});
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
        
        }
    });
    castropil_searchProductInPriceTable();
    return true;

}

function PE_LABEL_BUSCA_PROD(item,nmfile,codprd,vlfmt,opest){

    if(parseFloat(item.estoque) <= 0.00){
        //nmfile = "https://perifericosgamer.com.br/wp-content/uploads/2018/09/Multilaser-logo777.jpg";
        opest = "<tr><td style='padding-left:0px;'><span class='style_indisponivel'>&nbsp;&nbsp;&nbsp;Indisponível em estoque.</span> </td></tr>";
    }else{
        //opest = "<tr><td style='padding-left:10px;'><span class='style_disponivel'>&nbsp;&nbsp;&nbsp;Qtd.:"+item.estoque+" - DisponÃ­vel em estoque.&nbsp;&nbsp;&nbsp;</span></td></tr>";
        opest = "<tr><td style='padding-left:0px;'><span class='style_disponivel'>&nbsp;&nbsp;&nbsp;Disponí­vel em estoque.</span></td></tr>";
    }
    return '<li>'+
    '<div class="style_linha">'+
        '<table style="margin:0px">'+
            '<tr>'+
                '<td rowspan="2">'+
                    '<img class="prdImg" src="'+item.imagem+'" height="50px"/>'+
                '</td>'+
                '<td style="padding-left:0px;">'+
                    '<span class="style_produto">'+codprd+' : '+item.label+' - '+vlfmt+'</span>'+
                '</td>'+
            '</tr>'+
            opest+
        '</table>'+
    '</div>'+
'</li>';
    
}
function castropil_searchProductInPriceTable(){
    var productCode = $("#codigo").data("codigo");
    var priceTableCode = $("#tbpreco").data("codigo");

    if (productCode && priceTableCode && productCode.trim() != "" && priceTableCode.trim() != ""){
        $("#modalLoader").modal({backdrop: "static"});
        var query={
            "cnpj_empresa":cCnpj,
            "query" : 	"SELECT DA1_PRCVEN"+
                        " FROM xEmp('DA1') DA1"+
                        " WHERE DA1_FILIAL = xFilial('DA1')"+
                        " AND DA1.D_E_L_E_T_ <> '*'"+
                        " AND DA1_CODPRO = '"+productCode.trim()+"'"+
                        " AND DA1_CODTAB = '"+priceTableCode.trim()+"'"
                        //" AND (CONVERT(VARCHAR(8),GETDATE(),112) >= DA1_DATVIG)"
        }
        
        $.ajax({
            url: url + "QueryResult",
            type: "POST",
            async: true,
            data: JSON.stringify(query),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                $("#modalLoader").modal('hide');
                if (data.Dados.length > 0){
                    document.getElementById("labelValorProd").innerHTML = 'Valor do produto: (<a id="btnOverPrice" onclick="overPrice()"><u>Over Price</u></a>)';
                }
                else{
                    document.getElementById("labelValorProd").innerHTML = 'Valor do produto:';
                    document.getElementById("dmodal").innerHTML="Produto "+ productCode + " não encontrado na tabela de preço " + priceTableCode +"!";
                    $("#alerta").modal({backdrop: "static"});
                    $("#tbpreco").data("codigo","");
                    $("#tbpreco").val("");
                }
            },
            error: function (jqXhr, textStatus, errorThrown) {
                document.getElementById("labelValorProd").innerHTML = 'Valor do produto:';
                $("#modalLoader").modal('hide');
                if (jqXhr.responseText){
                    $("#modalBodyErro").html("<p>Não foi possível buscar tabela de preço! Erro: "+
                        jqXhr.responseText+"</p>");
                }
                else{
                    $("#modalBodyErro").html("<p>Não foi possível buscar tabela de preço!</p>");
                }
                $("#modalErro").modal({backdrop: "static"});
            }
        });
    }else{
        $("#modalLoader").modal('hide');
        document.getElementById("labelValorProd").innerHTML = 'Valor do produto:';
    }
    
}
function PE_ANT_BUSCA_PROD(cJsonBody){
    cJsonBody.cTabPadrao = $("#tbpreco").val().substring(0,3);
    cJsonBody.cBusca     = cJsonBody.cBusca.replace(/\'/g, "").replace(/\`/g, "").replace(/\"/g, "");

    return cJsonBody;
}

document.getElementById("labelValorProd").innerHTML = 'Valor do produto: (<a id="btnOverPrice" onclick="overPrice()"><u>Over Price</u></a>)';
var btnNovos = '<button class="btn btn-success form-control" style="margin-top:5px;margin-bottom:5px;" type="button" onclick="Canceladocs();">' +
    'Cancela Cupom <i class="far fa-file-alt"></i>' +
    '</button>'
var btnsDivMenu = $("#divMenu button");
$("#divMenu").empty();
$("#divMenu").append(btnNovos);
$(btnsDivMenu).each(function () {
    $("#divMenu").append(this);
});


document.getElementById("labelValorProd").innerHTML = 'Valor do produto: (<a id="btnOverPrice" onclick="overPrice()"><u>Over Price</u></a>)';

function castropil_searchSellerInformation(){
    
    var cQuery = "SELECT A3_COD CODIGO, DA0_DESCRI NOME  FROM xEmp('SA3') SA3"+
    " JOIN xEmp('DA0') DA0"+
    "   ON DA0_FILIAL = xFilial('DA0') AND  DA0.D_E_L_E_T_ <> '*' "+ //AND DA0_ATIVO <> '2' 
    " AND A3_COD = '"+tbLogin[0].CODVEND+"'"+
    " AND SA3.D_E_L_E_T_ <> '*'";

    var query={
        "cnpj_empresa":cCnpj,
        "query" : cQuery
    }

    $.ajax({
        url: url + "QUERYRESULT",
        type: "POST",
        async: true,
        data: JSON.stringify(query),
        dataType: "json",
        contentType: "application/json",
        success: function (response) {
            if (response.Retorno == "OK"){
                if (response.Dados.length > 0){
                    //if(document.getElementById('tbpreco').readOnly === false){
						$("#tbpreco").val(response.Dados[0].CODIGO+' - '+response.Dados[0].NOME);
						$("#tbpreco").data("codigo",response.Dados[0].CODIGO);
						if(response.Dados[0].CODIGO.trim() == ""){
                            //Se o vendedor não tiver uma tabela de preço amarrada a ele
                            //Ele pode alterar, mas não é obrigatório fornecer uma
                            document.getElementById('tbpreco').required = false;
							$("#divdesc").show();
							$("#divdesc2").show();
						}else{
                            //Se o vendedor tiver uma tabela de preço amarrada a ele
                            //Ele pode alterar, mas é obrigatório fornecer uma
                            document.getElementById('tbpreco').required = true;
							$("#divdesc").hide();
							$("#divdesc2").hide();
							$("#percent").val("");
							$("#reais").val("");
		
						}
					
					//}
                }
                else{
                    //Se o vendedor não tiver uma tabela de preço amarrada a ele
                    //Ele pode alterar, mas não é obrigatório fornecer uma
                    document.getElementById('tbpreco').required = false;
                    $("#divdesc").show();
                    $("#divdesc2").show();
                }
            }
        },
        error: function (jqXhr, textStatus, errorThrown) {
            $("#alerta").modal({backdrop: "static"});	
            $("#dmodal").html(jqXhr.responseText+'<br>'+jqXhr.statusText + "<br>Erro ao buscar dados do vendedor.");//statusText
        }
    });

}
// castropil_searchSellerInformation();
$("#divInfoCliente").after('<div class="row">'+
                                '<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">'+
                                    '<label class="fonte" for="tbpreco">Tab. de Preço</label>'+
                                    '<div class="input-group input-group-lg" >'+
                                        
                                        '<input type="text" class="form-control" placeholder="Selecione Tabela" name="tbpreco" id="tbpreco">'+
                                        '<span class="input-group-addon" onclick="$(\'#tbpreco\').autocomplete(\'search\');"><i class="fas fa-dollar-sign fa-1x green" aria-hidden="true" id="fatbpreco"></i></span>'+
                                    '</div>'+
                                    '<span id="lbltbpreco" class="span-erro"></span>'+
                                '</div>'+
                            '</div>');

var cInfoDesc = '<label class="fonte">Valor tabela:&nbsp;</label>'+
    '<strong id="valortabela">R$ 0,00</strong>'+
    '&nbsp;&nbsp;&nbsp;'+
    '<label class="fonte">Desconto:&nbsp;</label>'+
    '<strong id="valordesc">R$ 0,00</strong>';
    

document.getElementById("InfoDesc").innerHTML = cInfoDesc;

                            $(document).ready(function() {
                                //Tabela de Preço - Rafael Lima
                                $("#tbpreco").on('keyup keypress', function(e) {
                                    if(""==$("#tbpreco").val()){
                                        $("#divdesc").show();
                                        $("#divdesc2").show();
                                    }	
                            
                                    if($("#tbpreco").val().length>3){
                                        $("#fatbpreco").removeClass("fas fa-dollar-sign fa-1x green");
                                        $("#fatbpreco").addClass("fa fa-spin fa-spinner fa-1x green");
                                    }else{
                                        $("#fatbpreco").removeClass("fa fa-spin fa-spinner fa-1x green"); 
                                        $("#fatbpreco").addClass("fas fa-dollar-sign fa-1x green");					
                                    }
                                });
                            
                                $("#tbpreco").autocomplete({
                                    source: function(request, response) {
                                        $("#modalLoader").modal('hide');
                                        document.getElementById("labelValorProd").innerHTML = 'Valor do produto:';
                                        $("#codigo").data("codigo",""); //Limpa o Código do Produto
                                        $("#codigo").val("").trigger("input");
                                        //$("#codigo").val()//Limpa o Nome do Produto
                                        $("#codigo").data("valor",0);
                                        $("#codigo").data("estoque",0);
                                        $("#codigo").data("peso",0);
                                        $("#codigo").data("valortabela",0);
                                        document.getElementById('valortabela').textContent="R$ 0,00"
                                        document.getElementById('valordesc').textContent="R$ 0,00"
                                        document.getElementById('valorprod').textContent="R$ 0,00";
                                        $("#reais").val(0); //Zera os descontos
                                        $("#percent").val(0);//Zera os descontos
                                        //limpaValid('formInfo', 'codigo', true)
                                        if (typeof $("#tbpreco").data("codigo") != 'undefined'){
                                            $("#tbpreco").data("codigo","")
                                        }
                                        var query = {
                                            cnpj_empresa: cCnpj,
                                            query: `
                                                SELECT DA0_FILIAL AS FILIAL,
                                                    DA0_CODTAB AS CODIGO,
                                                    DA0_DESCRI AS NOME
                                                FROM xEmp('DA0') AS DA0
                                                JOIN xEmp('SE4') AS SE4
                                                    ON SE4.D_E_L_E_T_ = ''
                                                    AND SE4.E4_FILIAL = xFilial('SE4')
                                                    AND SE4.E4_CODIGO LIKE '%0%'
                                                JOIN xEmp('ZY3') AS ZY3
                                                    ON ZY3.D_E_L_E_T_ = ''
                                                    AND ZY3.ZY3_FILIAL = xFilial('ZY3')
                                                    AND ZY3_FILIAL + ZY3_CODIGO = DA0_CODZY3
                                                    AND ZY3.ZY3_UNINEG = '000002'
                                                    AND (ZY3.ZY3_TIPO = '3' OR ZY3.ZY3_TIPO = CASE WHEN E4_COND IN ('00','01') THEN '1' ELSE '2' END)
                                                WHERE DA0.D_E_L_E_T_ <> '*'
                                                    AND DA0_FILIAL = xFilial('DA0')
                                                    AND DA0_ATIVO <> '2'
                                                    AND DA0_CODTAB LIKE '%0%'
                                                    AND (CONVERT(VARCHAR(8),GETDATE(),112) BETWEEN DA0_DATDE AND DA0_DATATE OR DA0_DATATE = ' ')
                                                ORDER BY DA0_CODTAB
                                            `
                                        };
                                        
                            
                                        $.ajax({
                                            url: url + "QueryResult",
                                            type: "POST",
                                            async: true,
                                            data: JSON.stringify(query),
                                            dataType: "json",
                                            contentType: "application/json",
                                            success: function (data) {
                                                retorno=[];
                                                $(data.Dados).each(function(index) {
                                                    retorno.push({"label":data.Dados[index].CODIGO+' - '+data.Dados[index].NOME,"value":data.Dados[index].CODIGO});
                                                });
                                                $("#fatbpreco").removeClass("fa fa-spin fa-spinner fa-1x green");
                                                $("#fatbpreco").addClass("fas fa-dollar-sign fa-1x green");							
                                                response(retorno);
                                                //console.log($.ajax.mostRecentCall);
                                            },
                                            error: function (jqXhr, textStatus, errorThrown) {
                                                
                                            }
                                        });
                                    },select: function (event, ui) {
                                        //if(document.getElementById('tbpreco').readOnly === false){
                                            $("#tbpreco").val(ui.item.label);
                                            $("#tbpreco").data("codigo",ui.item.value);
                                            castropil_searchProductInPriceTable();
                                            /*							if(""==ui.item.value){
                                                $("#divdesc").show();
                                                $("#divdesc2").show();
                                            }else{
                                                $("#divdesc").hide();
                                                $("#divdesc2").hide();
                                                $("#percent").val("");
                                                $("#reais").val("");
                            
                                            }
                                            */						
                                        //}
                                        
                                        return false;
                                    },
                                    minLength: 0,
                                    change: function (event, ui) {
                                        if(!ui.item){
                                            $("#tbpreco").val("");
                                            $("#divdesc").show();
                                            $("#divdesc2").show();
                                        }
                                    }				
                                });
                            });