console.log("Hello world!");

$("body").append(`<div class="modal fade" id="1000MARCAS_ModalAposAddCarrinho" role="dialog">
    <div class="modal-dialog modal-lg">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Valor do Produto de Garantia
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>						
                </h4>
            </div>
            <div class="modal-body">
                <form id="1000MARCAS_ModalFormAposAddCarrinho">
                    <div class="row">
                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                            <label id="1000MARCASLabelCustomerOrder" class="fonte" for="1000MARCASCustomerOrder">Valor Garantia</label><span id="1000MARCASSpanCustomerOrder" style="color: red;font-size: small"></span>
                            <div class="input-group input-group-lg  clearable">
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
                            
                            <select id="selectTipoEntrega" class="form-control "  >  
                                <option value="2">2 - Retira NFC-e</option>
                                <option value="3">3 - Entrega</option>
                            </select>
                            <p id="infoEntregaCd" style="color: red"></p>
                        
                        </div>
                    </div>
                </form>
            </div>

            <div class="modal-footer" id="buttons">
                <button id="1000MARCASBtnCustomerOrderItem" class="btn btn-success" data-dismiss="modal" >Continuar <i class="fas fa-check"></i></button>
            </div>
        </div>
    </div>
</div>`);

function PE_DEPOIS_ADD_PRODUTO(item,divCarrinho,next)   {
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
    var content= dropdownGarantia.options[dropdownGarantia.selectedIndex].text;
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