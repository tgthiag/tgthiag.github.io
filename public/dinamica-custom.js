/* eslint-disable no-undef */
/* eslint-disable no-redeclare */
/* eslint-disable no-useless-concat */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/**
 * Customização feita por:
 * 
 * Matheus Okamoto Soós - Plentech LTDA.
 */

/* LISTA DE PRESENTES */

let guardarLista = false

$(document).ready(function () {
    const button = `<button id="btnListaPresentes" type="button" class="btn btn-primary form-control" style="margin-top: 5px; margin-bottom: 5px">Lista de Presentes</button>`

    $('#divMenu').prepend(button);

    $("#btnListaPresentes").on("click", function () {
        $("#modalListaPresentes").modal({ backdrop: "static" });

        if (guardarLista) {
            $("#modalProdutosLista").modal({ backdrop: "static" });
        }
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
                            <button class="btn" id="btn_pesquisar_dinamica" onclick="insertData()">Pesquisar</button>
                        </div>
                    </div>

                    <br>

                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <table id="dtPresentes" class="table display table-striped" style="display: none; overflow: auto; max-height: 75vh;">
                                    <thead>
                                        <tr>
                                            <th scope="col">Cod. Lista</th>
                                            <th scope="col">Cod. Organizador</th>
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
                            <table id="dtProdutos" class="table display table-striped" style="display: block; overflow: auto; max-height: 75vh;">
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Item</th>
                                        <th scope="col">Cod. Produto</th>
                                        <th scope="col">Desc. Prod.</th>
                                        <th scope="col">Val. Unitario</th>
                                        <th scope="col">Unidade</th>
                                        <th scope="col">Qtd. Disponivel</th>
                                        <th scope="col">Qtd. Solicitada</th>
                                    </tr>
                                </thead>
                                <tbody id="bodydtProdutos">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                <button type="button" id="btnAdicionar" class="btn btn-primary">Adicionar</button>
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
var listaPresenteDinamica;
function insertData() {
    clearListas()

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
            data.forEach(function (lista) {
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
                    listaPresenteDinamica = lista;
                    lista.Produtos.forEach(function (produto) {
                        const $produtosRow = $("<tr>");
                        const $imgElement = $('<img>').attr({
                            src: 'data:image/png;base64,' + produto.ImagemBase64,
                            width: 100,
                            height: 100
                        });

                        $("#bodydtProdutos").append(
                            $produtosRow.append(
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

                        $produtosRow.on("click", function () {
                            if (produto.QtdAtendida >= produto.QtdSolicitada) {
                                showAlert("A quantidade solicitada deste produto já foi atendida.");
                                return
                            }
                            $("#cliente").data("codigo",lista.CodigoCliente);
                            $("#cliente").val(lista.NomeCliente);
                            $("#cliente").data("loja","01")
                            
                            $("#codigo").val(produto.DescProduto);
                            $("#codigo").data("valor", produto.ValorUnitario.toFixed(2).toString().replace(/\./g, ",").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."));
                            $("#codigo").data("codigo", produto.CodigoProduto);
                            $("#codigo").data("estoque", 10);
                            $("#codigo").data("imagem", "img/semimage.png");
                            $("#codigo").data("nValor", produto.ValorUnitario.toFixed(2))

                            //LR_CODLPRE
                            $("#codigo").data("codlista", lista.Codigo)
                            //LR_ITLPRE
                            $("#codigo").data("itemlista", produto.Item)

                            $("#modalProdutosLista").modal('hide')
                            $("#modalListaPresentes").modal('hide')

                            guardarLista = true
                        })

                        if (produto.QtdAtendida >= produto.QtdSolicitada) {
                            $produtosRow.css("backgroundColor", "#a9a9a9");
                        }
                        else {
                            $produtosRow.on("mouseover", function () {
                                $produtosRow.css("backgroundColor", "#e3e3e3");
                            });

                            $produtosRow.on("mouseout", function () {
                                $produtosRow.css("backgroundColor", "");
                            });
                        }
                    });

                    $("#modalProdutosLista").modal({ backdrop: "static" });
                });

                $row.on("mouseover", function () {
                    $row.css("backgroundColor", "#dcdcdc");
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

    guardarLista = false
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

$('#divAddProd button').on('click', function () {
    const nomeCliente = $('#nomeCliente').val();
    const documentoCliente = $('#documentoCliente').val();

    jsonorc.cabecalho[0].LQ_OBS1 = nomeCliente
    jsonorc.cabecalho[0].LQ_OBS2 = documentoCliente
});


// THIAGO CARVALHO
$("body").append(`
    <div class="modal fade" id="Dinamica_ModalAposAddCarrinho" role="dialog">
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
                    <form id="Dinamica_ModalFormAposAddCarrinho">
                        <div class="row">
                            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12" style="display: none;">
                                <label id="DinamicaLabelCustomerOrder" class="fonte" for="DinamicaCustomerOrder">Valor Garantia</label><span id="DinamicaSpanCustomerOrder" style="color: red;font-size: small"></span>
                                <div class="input-group input-group-lg clearable">
                                    <select id="DinamicaCustomerOrder" class="form-control clearableInput" name="customerOrder" required>
                                        <!-- Dropdown options will be populated here dynamically -->
                                    </select>
                                    <i class="clearable__clear">&times;</i>
                                </div>
                                <span id="lblDinamicaCustomerOrder" class="span-erro"></span>	
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
                            <p id="filial_reserva"></p>
                        </div>
                    </form>
                </div>
                <div class="modal-footer" id="buttons">
                    <button id="DinamicaBtnCustomerOrderItem" class="btn btn-success">Continuar <i class="fas fa-check"></i></button>
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
                    "query": "SELECT TOP 8 * FROM xEmp('SA3') SA3 WHERE A3_NOME LIKE '%" + vendedorInputValue + "%' OR A3_COD LIKE '%" + vendedorInputValue + "%'"
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
        return false;
    }else{
        return true;
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
        return false;
    }else{
        return true;
    }
}
$("#selectTurnoEntrega").change(function() {
    $("#dataEntrega").trigger("change");
    $("#dataMontagem").trigger("change");
});

$("#dataEntrega").change(function() {
    if ($("#dataEntrega").val() != "") {
        let podeEntregar = verificarPrazoEntrega();
        verificarPrazoMontagem(); // Revalidar a data de montagem após a mudança na data de entrega
        let dataEntregaDinamica = $("#dataEntrega");
        let turnoEntregaDinamica = $("#selectTurnoEntrega");

        let dataString = dataEntregaDinamica.val();
        
        // Extrair manualmente o ano, mês e dia da string
        let partesData = dataString.split("-");
        let ano = parseInt(partesData[0], 10);
        let mes = parseInt(partesData[1], 10); // Mês agora é de 1 a 12
        let dia = parseInt(partesData[2], 10);

        // Função para calcular o dia da semana (0: domingo, 6: sábado)
        function calcularDiaSemana(ano, mes, dia) {
            // calcular o dia da semana
            if (mes < 3) {
                mes += 12;
                ano -= 1;
            }
            let k = ano % 100;
            let j = Math.floor(ano / 100);
            let diaSemana = (dia + Math.floor((13 * (mes + 1)) / 5) + k + Math.floor(k / 4) + Math.floor(j / 4) - 2 * j) % 7;
            return (diaSemana + 6) % 7; // Ajuste para que 0 seja domingo e 6 seja sábado
        }

        let diaSemana = calcularDiaSemana(ano, mes, dia);

        console.log("dataEntrega:", dataString);
        console.log("diaSemana:", diaSemana);

        // Verificar se é sábado (6) e turno 2
        if (diaSemana === 6 && turnoEntregaDinamica.val() == 2) {
            showAlert("Não é possível agendar entregas aos sábados no horário da tarde.");
            dataEntregaDinamica.val("");
            return;
        }

        if (podeEntregar) {
            checarDisponibilidadeNoDia(
                dataEntregaDinamica, 
                turnoEntregaDinamica, 
                "entregas", 
                turnoEntregaDinamica.val() == 1 ? 10 : 5, 
                "L2_FDTENTR"
            );
        }
    }
});

$("#dataMontagem").change(function() {
    if ($("#dataMontagem").val() != "") {
        let podeMontar = verificarPrazoMontagem();
        let dataMontagemDinamica = $("#dataMontagem");
        let turnoEntregaDinamica = $("#selectTurnoEntrega");
        if (podeMontar) {
            checarDisponibilidadeNoDia(dataMontagemDinamica, turnoEntregaDinamica, "montagens", turnoEntregaDinamica.val() == 1 ? 10 : 5,"L2_FDTMONT");
        }
    }
});

function checarDisponibilidadeNoDia(dataEntregaOuMontagem, turno, processo, qtdLimite, campo){
    $.ajax({
        url: url + "QueryResult",
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            "cnpj_empresa": cCnpj,
            "query": "SELECT COUNT(DISTINCT L2_RESERVA) AS totalCount FROM xEmp('SL2') WHERE "+ campo +" LIKE '%" + dataEntregaOuMontagem.val().replaceAll("-","") + "%' AND (L2_XTURNO LIKE '%" + turno.val() + "%')"
        }),
        success: function(response) {
            if (response && response.Dados && response.Dados.length > 0) {
                let count = response.Dados[0].TOTALCOUNT;
                console.log("Total entries found: " + count);
                if (count >= qtdLimite) {
                    dataEntregaOuMontagem.val("");
                    showAlert(`O limite de ${processo} para essa data no turno ${turno.val()} já foi atingido, \nEscolha outra data ou altere o turno.`)
                }
                return count;
            } else {
                console.log("No entries found.");
                return 0;
            }
        },
        error: function(error) {
            console.error("Error during AJAX request", error);
        }
    });
}



function PE_DEPOIS_ADD_PRODUTO(item,divCarrinho,next)   {
    $("#Dinamica_ModalAposAddCarrinho").modal({backdrop: "static"});
    setTimeout(function() {
        if ($("#Dinamica_ModalAposAddCarrinho").css('display') === 'block' && $("#vendedorInput").val() != "" && $("#vendedorInput").val().trim().length <= 6) {
            $("#vendedorInput").trigger('input'); 
        }
    }, 1500);
    
    nQtditemCarrinhoEntrega = 0;

    var produtoSelecionado = $("#codigo").val().trim();
    if (produtoSelecionado.includes("GARANTIA ESTENDIDA AVULSA")) {
        checkForGarantiaEstendida();
    }else{
    // $("#Dinamica_ModalAposAddCarrinho").modal({backdrop: "static"});
    //     populateGarantiaDropdown(item);
    // };
    document.getElementById("DinamicaBtnCustomerOrderItem").onclick = function(){
        let tipoEntrega = $("#selectTipoEntrega").val();
        let validRetira = tipoEntrega == "2" && $("#vendedorInput").val() != "";
        let validEntrega = tipoEntrega == "3" && $("#vendedorInput").val() != "" && $("#dataEntrega").val() != "" && $("#dataMontagem").val() != "";
        if(validRetira || validEntrega){
            $("#Dinamica_ModalAposAddCarrinho").modal('hide');
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
        }else{
            showAlert("É necessário preencher os campos");
        }
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
    var dropdownGarantia = document.getElementById("DinamicaCustomerOrder");
    var dropdownTurno = document.getElementById("selectTurnoEntrega");
    var dinamica_turno = $("#selectTurnoEntrega").val();
    var dinamica_dataEntrega = $("#dataEntrega").val();
    var dinamica_dataMontagem = $("#dataMontagem").val();
    var vendorCodeDinamica = $('#vendedorInput').data('codevendedor').trim();
    var dinamica_codLista = $("#codigo").data("codlista") || "";
    var dinamica_itemLista = $("#codigo").data("itemlista") || "";
    let filial_reserva = $("#filial_reserva").val() || "";
    let saldo_endereco = $("#filial_reserva").data("endereco")
    var content=  "" //dropdownGarantia.options[dropdownGarantia.selectedIndex].text;
    cCodigoProd		= $("#codigo").data("codigo")
    nQuantidade		= (parseFloat($("#qtde").val()))
    cCliente		= $("#cliente").data("codigo")
    cLoja			= $("#cliente").data("loja")
    //var valprod =  parseFloat($("#codigo").data("valor").replace(/\./g, "").replace(/\,/g, "."));
    var valprod =  parseFloat($("#codigo").data("valor"));
    
    //var precoNegociado =parseFloat($("#DinamicaPrecoNegociado").val().replace(/\./g, "").replace(/\,/g, "."));
    
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
    if ($("#DinamicaCustomerOrder").val() != ''){
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
    if ($("#DinamicaCustomerOrder").val() != ''){
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
                ' data-filialreserva="'			+ filial_reserva + '"' +
                ' data-saldoendereco="'			+ saldo_endereco + '"' +
                ' data-dataentrega="'			+ dinamica_dataEntrega + '"' +
                ' data-datamontagem="'			+ dinamica_dataMontagem + '"' +
                ' data-vendcod="'			+ vendorCodeDinamica + '"' +
                ' data-codlista="' + dinamica_codLista + '"' +
                ' data-itemlista="' + dinamica_itemLista + '"' +
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
    //$("#DinamicaPrecoNegociado").val("");
    //$("#DinamicaCustomerOrderItem").val("");
    next(item)

    
    if (content != '' && content != "Sem garantia estendida"){
        
        // Use a regular expression to extract the numeric value following "Valor:"
        const match = content.match(/Valor: (\d+(\.\d+)?)/);
        const parsedValue = parseFloat(match[1]);
        cCodProduto = "GARANTIA";
        cDescricaoProd = "GARANTIA " + $("#DinamicaCustomerOrder").val() + " MESES";
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

        if($("#DinamicaCustomerOrder").val() != ''){
            divCarrinho += '<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" align="center"><span class="style_disponivel">&nbsp;&nbsp;&nbsp;Garantia do Item:'+nItem.toString()+' &nbsp;&nbsp;&nbsp;</span></div></div>';
        }
        
        item = item+'>'+ divCarrinho+ '</a>';
        //$("#DinamicaPrecoNegociado").val("");
        $("#DinamicaCustomerOrderItem").val("");
        $("#DinamicaCustomerOrder").val("");
        next(item)
    }
}



function PE_GERORC_ANTES_GERORC2(jsonenv){
    var lEntregaposterior   = false;
    var typeInvoice = sessionStorage.getItem("typeInvoice");
    const nQtdItensCarrinho = jsonenv.itens.length;
    jsonenv.cabecalho[0].LQ_IMPNF = (typeInvoice=="1" ? ".F." : ".T."); //1=NFC-e ; 2=NF-e

    $(".list-group-item").each(function(index) {
        jsonenv.itens[index]["LR_ITEM"] = ("0000" + (index+1)).slice(-2);
        jsonenv.itens[index]["LR_VEND"] = $(this).data("vendcod").toString().trim();
        /**Configura operação é entrega posterior c/pedido */
         if ($(this).data("ctipoentrega") == 3 && !(lEntregaposterior) ){
             lEntregaposterior = true;
         }
        if (lEntregaposterior){
            jsonenv.itens[index]["LR_ENTREGA"] = $(this).data("ctipoentrega").toString();
            jsonenv.itens[index]["LR_XTURNO"] = $(this).data("turno").toString();
            let dataEntregaFormatada = formatarData($(this).data("dataentrega").toString());
            jsonenv.itens[index]["LR_FDTENTR"] = dataEntregaFormatada.split('-').reverse().join('/');
            let dataMontagemFormatada = formatarData($(this).data("datamontagem").toString());
            jsonenv.itens[index]["LR_FDTMONT"] = dataMontagemFormatada.split('-').reverse().join('/');
            if ($(this).data("reserva") != undefined) {
                jsonenv.itens[index]["LR_RESERVA"] = $(this).data("reserva").trim();
            }
            if ($(this).data("filialreserva") !== "" && $(this).data("filialreserva") != undefined){
                jsonenv.itens[index]["LR_FILRES"] = $(this).data("filialreserva").toString().slice(-2);
                jsonenv.cabecalho[0]["AUTRESERVA"]  =  $(this).data("filialreserva").toString();
                if ($(this).data("saldoendereco") !== "") {
                    jsonenv.itens[index]["LR_LOCALIZ"] = $(this).data("saldoendereco").toString();
                }
            }
        }
        if ($(this).data("codlista") && $(this).data("itemlista")) {
            jsonenv.itens[index]["LR_CODLPRE"] = $(this).data("codlista").toString();
            jsonenv.itens[index]["LR_ITLPRE"] = $(this).data("itemlista").toString();
        }
    });

    return jsonenv;
} 
function formatarData(data) {
    if (data.length === 8 && !data.includes("-") && !data.includes("/")) {
        return `${data.slice(0, 4)}-${data.slice(4, 6)}-${data.slice(6, 8)}`;
    }
    return data;
}

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

function PE_ANTES_PAGARORCAMENTO(orcamentosSelecionados){
    let sellerCodeDinamica = JSON.parse(atob($(orcamentosSelecionados).data("orcamento")))[0].L2_VEND.trim();
    $('#vendedorInput').val(sellerCodeDinamica);
    $('#vendedorInput').data('codevendedor', sellerCodeDinamica);

    const obs1 = JSON.parse(atob($(orcamentosSelecionados).data("orcamento")))[0].L1_OBS1.trim();
    const obs2 = JSON.parse(atob($(orcamentosSelecionados).data("orcamento")))[0].L1_OBS2.trim();
    $('#nomeCliente').val(obs1);
    $('#documentoCliente').val(obs2);
    jsonorc.cabecalho[0].LQ_OBS1 = obs1;
    jsonorc.cabecalho[0].LQ_OBS2 = obs2;
}

function pagarOrcamento(){
    var SinalS  = 'font-weight: bold; size="2" ';
    var tamanho = 'size="5"';
    var vldContinue = true;
    jsonorc.cabecalho[0]["ctype"] = "Finaliza";
    //jsonorc.cabecalho[0]["LQ_NUM"] = numOrc;
    
    var table = $('#dtOrcamentos').DataTable();
    var rows = table.rows().nodes();
    var orcamentosSelecionados = $(".myChkOrcamento:checked",rows);//$("#bodydtOrcamentos input:checked");
    
    if (typeof PE_ANTES_PAGARORCAMENTO ==='function'){
        PE_ANTES_PAGARORCAMENTO(orcamentosSelecionados);
    }
    
    if (orcamentosSelecionados.length > 0){
        
        //Limpa o carrinho
        $("#navbarTogglerDemo03 a").remove();
        isempty();
        jsonorc['orcamentos'] = [];
        //Valida se os orçamentos são do mesmo cliente
        var clienteAux = "";
        var vendAux = "";
        $(orcamentosSelecionados).each(function(){
            var itensOrcamento = JSON.parse(atob($(this).data("orcamento")));
            $(itensOrcamento).each(function(){
                if (this.L1_CLIENTE+ this.L1_LOJA != clienteAux){
                    
                    if (clienteAux != ""){
                        document.getElementById("titleMsgLog").innerHTML = '<i class="fa fa-window-close" style="color:red;"></i>Erro';
                        document.getElementById("divMsgLog").textContent = "Favor selecionar orçamento do mesmo cliente.";
                        $("#modalMsgLog").modal({backdrop: "static"});
                        vldContinue = false;
                        return false;
                    }
                    
                    clienteAux = this.L1_CLIENTE+ this.L1_LOJA;
                }
                if (this.L1_VEND != vendAux){
                    if (vendAux != ""){
                        document.getElementById("titleMsgLog").innerHTML = '<i class="fa fa-window-close" style="color:red;"></i>Erro';
                        document.getElementById("divMsgLog").textContent = "Favor selecionar orçamento do mesmo vendedor.";
                        $("#modalMsgLog").modal({backdrop: "static"});
                        vldContinue = false;
                        return false;
                    }
                    
                    vendAux = this.L1_VEND;
                }
            });
        });
        if (vldContinue){
            $(orcamentosSelecionados).each(function(){
                var itensOrcamento = JSON.parse(atob($(this).data("orcamento")));
                $(itensOrcamento).each(function(){
                    var orcamentoAux = this.L1_NUM;
                    $("#dmodal").html("C");
                    function myFindIndex(){
                        for (var i = 0; i < jsonorc.orcamentos.length; i++) {
                            if(jsonorc.orcamentos[i] == orcamentoAux){
                                return i;
                            }
                        }
                        return -1;
                    }
                    document.getElementById("cliente").value = this.L1_CLIENTE+": "+this.A1_NOME+" - "+this.A1_CGC;
                    $("#cliente").data("codigo",this.L1_CLIENTE);
                    $("#cliente").data("loja",this.L1_LOJA);
                    jsonorc.cabecalho[0].LQ_CLIENTE = this.L1_CLIENTE;
                    jsonorc.cabecalho[0].LQ_LOJA = this.L1_LOJA;
                    jsonorc.cabecalho[0].LQ_VEND = this.L1_VEND;
                    var posOrcamento = myFindIndex();
                    // var posOrcamento = jsonorc.orcamentos.findIndex(function(e){
                    // 	return e == orcamentoAux;
                    // });
                    
                    if (posOrcamento < 0){
                        jsonorc.orcamentos.push(orcamentoAux);
                    }
                    
                    nValUnitCDesc = this.L2_VLRITEM.toString().replace(/\./g, ",").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
                    nValorDesconto= 0///(parseFloat($("#codigo").data("valor")-($('#reais').val())))*(cPercentual/100).toFixed(2).toString()
                    nQuantidade   = this.L2_QUANT;//$("#qtde").val()
                    cDesconto     = "0";//$("#reais").val()

                    cValsemDescont= this.L2_VRUNIT.toString().replace(/\./g, ",").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");//$("#codigo").data("valor")
                    cCodProduto   = this.L2_PRODUTO;//$("#codigo").data("codigo")
                    cDescricaoProd= this.L2_DESCRI//$("#codigo").val()
                    cQtdEstoque   = "0";//$("#codigo").data("estoque")
                    cPercentual = "0";
                    let dinamica_turno = this.L2_XTURNO;
                    let dinamica_dataEntrega = this.L2_FDTENTR;
                    let dinamica_dataMontagem = this.L2_FDTMONT;
                    let vendorCodeDinamica = this.L2_VEND;
                    let reservaCodeDinamica = this.L2_RESERVA;
                    
                    var item = '<a data-acessorio="acessorio"'+
                                    //'" data-percent="' 		+ document.getElementById("percent").value + 
                                    ' data-percent="' 			+ cPercentual.toString() +'"'+ 
                                    //'" data-descontoreais="' 	+ document.getElementById("reais").value + 
                                    ' data-descontoreais="' 	+ nValorDesconto + '"' +
                                    ' data-codigo="'			+ cCodProduto+'"' +
                                    ' data-valort="'			+ nValUnitCDesc+'"' +
                                    ' data-valor="'				+ cValsemDescont+'"' +
                                    ' data-desc="'				+ cDescricaoProd+'"' +
                                    ' data-qtde="'				+ nQuantidade+'"' +
                                    ' data-turno="'			+ dinamica_turno + '"' +
                                    ' data-dataentrega="'			+ dinamica_dataEntrega + '"' +
                                    ' data-datamontagem="'			+ dinamica_dataMontagem + '"' +
                                    ' data-vendcod="'			+ vendorCodeDinamica + '"' +
                                    ' data-reserva="'			+ reservaCodeDinamica + '"' +
                                    ' data-reais="'				+ cDesconto+'"' +
                                    ' data-estoque="'			+ cQtdEstoque+'"' +
                                    ' data-cliente="'			+ this.L1_CLIENTE+ this.L1_LOJA+'"' +
                                    ' data-auxiliar=""' 		+
                                    ' data-localprod="' 		+ this.L2_LOCAL+'"' +
                                    ' data-ctipoentrega="'      + this.L2_ENTREGA+ '"' +
                                        '" href="javascript:void(0);" class="list-group-item" ondblclick="deleta(this);" onclick="selline(this);" id="itens">'+
                                        '<div class="row" style="font-size: 12px;">'+
                                            '<div class="col-lg-4 " style="' 							+ tamanho 		+  '" >' + cCodProduto+' - '+ cDescricaoProd 	+ '</div>'+
                                            '<div class="col-lg-1 " align="center">'					+ nQuantidade 													+ '</div>'+
                                            '<div class="col-lg-3 " align="left"  " >' 					+ cValsemDescont 												+ '</div>'+
                                            '<div class="col-lg-1 percentual" align="right"> ' 			+(parseFloat(cPercentual)).toFixed(2).toString()				+ '</div>'+
                                            '<div class="col-lg-3 somatorio" align="right" " style="' 	+ SinalS +  '" > '+ (this.L2_VRUNIT*this.L2_QUANT).toFixed(2).toString().replace(/\./g, ",").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")/*nValUnitCDesc*/								+ '</div>'+
                                        '</div>'

                    // if(parseFloat($("#codigo").data("estoque")) == 0.00){
                    //     item+='<div class="row"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" align="center"><span class="style_indisponivel">&nbsp;&nbsp;&nbsp;Indisponnível em estoque.&nbsp;&nbsp;&nbsp;</span></div></div>';
                    // }
                    item+='</a>';
                    document.getElementById("nav1").innerHTML=document.getElementById("nav1").innerHTML+item;
                    
                });
            });
            $("#codigo").val("");
            $("#qtde").val("1");
            $("#percent").val("");
            $("#reais").val("");
            $("#codigo").data("valor","");
            somatorio();
            //percentual();
            $("#pedido").removeClass("disabled");
            document.getElementById("valorprod").innerHTML="0,00";
            document.getElementById("percent").innerHTML="0,00";
            if((($('#reais').val())) != ''){
                document.getElementById("percent").innerHTML="0,00";
            }
            $('#modalOrcamentos').modal('hide');
        }
        
    }
    else{
        $("#dmodal").html("Escolha primeiro pelo menos um orçamento");
        $("#alerta").modal({backdrop: "static"});
    }
    
}

function PE_ANT_buscaNrOrcamento(cQuery) {
    cQuery = cQuery.replace(
        "L2_LOCAL",
        "L2_LOCAL, L2_XTURNO, L2_FDTENTR, L2_VEND, L2_FDTMONT, L2_RESERVA"
    );
    cQuery = cQuery.replace(
        "L1_LOJA",
        "L1_LOJA, L1_OBS1, L1_OBS2"
    );
        console.log(cQuery);
	return cQuery;
}

//============================================
$("body").append(
    `<div class="modal fade" id="modalAdicionarItem" tabindex="-1" role="dialog" aria-labelledby="modalAdicionarItemLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content" style="border-radius: 10px;">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalAdicionarItemLabel">Adicionar Item</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="clearAdicionarItemModal()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div style="display: flex; align-items: center;">
                        <input type="text" id="produtoSearch" class="form-control" placeholder="Digite o nome do produto" style="border-radius: 10px;">
                        <button type="button" class="btn btn-light" style="margin-left: 5px;" onclick="searchforproducts()">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                    <div id="searchResults" class="list-group" style="margin-top: 10px; max-height: 200px; overflow-y: auto;"></div>
                    <input type="number" id="produtoQuantidade" class="form-control" placeholder="Quantidade" style="margin-top: 10px; border-radius: 10px;">
                </div>
                <div class="modal-footer">
                    <button type="button" id="btnIncluirItem" class="btn btn-primary">Incluir Item</button>
                </div>
            </div>
        </div>
    </div>`
);

$('#modalProdutosLista').on('shown.bs.modal', function () {
    $('#btnAdicionar').off('click').on('click', function() {
        $('#modalAdicionarItem').modal('show');
    });
});

let currentRequest = null;

function searchforproducts(){
    const searchTerm = $("#produtoSearch").val().trim();

    if (searchTerm.length >= 3) {
        let tbSelectDinamica = $("#cliente").data("tabela");
        let cClienteDinamica = $("#cliente").data("codigo");
        let cLojaDinamica = $("#cliente").data("loja");
        let cJsonBodyDinamica = {
            "cnpj_empresa": cCnpj,
            "ctype": "BUSCA_GRID_PROD",
            "cBusca": searchTerm.toUpperCase(),
            "cCliente": (cClienteDinamica ? cClienteDinamica : ""),
            "lojacli": (cLojaDinamica ? cLojaDinamica : ""),
            "cTabPadrao": (tbSelectDinamica ? tbSelectDinamica : "")
        };

        if (currentRequest) {
            currentRequest.abort();
        }

        const loadingOverlay = $(`<div id="loadingOverlay" style="position:fixed;top:0;left:0;width:100%;height:100%;background-color:rgba(255, 255, 255, 0.7);z-index:9999;display:flex;align-items:center;justify-content:center;">
            <div style="font-size:24px;color:black;">Buscando...</div>
          </div>`);

        $("body").append(loadingOverlay);

        currentRequest = $.ajax({
            url: url + "EASY_RESULT",
            type: "POST",
            async: true,
            data: JSON.stringify(cJsonBodyDinamica),
            dataType: "json",
            contentType: "application/json",
            success: function(data) {
                $('#searchResults').empty();

                if (data.Dados && data.Dados.length > 0) {
                    $(data.Dados).each(function(index) {
                        const itemName = data.Dados[index].NOME.trim();
                        const itemCode = data.Dados[index].CODIGO.trim();
                        const itemValue = data.Dados[index].VALOR;
                        $('#searchResults').append(
                            `<a href="#" class="list-group-item list-group-item-action" data-code="${itemCode}" data-price="${itemValue}">${itemName}\n${parseFloat(itemValue).toFixed(2)}</a>`
                        );
                    });

                    $('#searchResults a').on('click', function(e) {
                        e.preventDefault();
                        const selectedLabel = $(this).text();
                        const selectedValue = $(this).data('code');
                        const selectedPrice = $(this).data('price');
                        $('#produtoSearch').val(selectedLabel);
                        $('#produtoSearch').data('selectedItem', {
                            label: selectedLabel,
                            value: selectedValue,
                            price: selectedPrice,
                            quantity: 1
                        });
                        $('#searchResults').empty();
                    });
                } else {
                    $('#searchResults').append('<div class="list-group-item">No results found</div>');
                }
            },
            error: function(xhr, status, error) {
                if (status !== 'abort') {
                    console.error('Error fetching products:', error);
                }
            },
            complete: function() {
                currentRequest = null;
                // Remove loading overlay
                $('#loadingOverlay').remove();
            }
        });
    } else {
        $('#searchResults').empty();
    }
};

$('#btnIncluirItem').off('click').on('click', function() {
    let selectedItem = $('#produtoSearch').data('selectedItem');
    let quantityItems = $('#produtoQuantidade').val();

    if (!selectedItem) {
        alert('Por favor, selecione um produto.');
        return;
    }

    if (!quantityItems || quantityItems <= 0) {
        alert('Por favor, insira uma quantidade válida.');
        return;
    }
    selectedItem.quantity = parseInt(quantityItems, 10);
    const listaPresente = listaPresenteDinamica;
    const finalDataToSend = {
        "ListaPresentes": [
            {
                "Codigo": listaPresente.Codigo,  
                "Produtos": [
                    {
                        "CodigoProduto": String(selectedItem.value).trim(),  
                        "QtdSolicitada": selectedItem.quantity,
                        "ValorUnitario": selectedItem.price 
                    }
                ]
            }
        ]
    };

    $.ajax({
        type: 'POST',
        url: url + 'easymobile/INSERIR/LISTAPRESENTES',
        data: JSON.stringify(finalDataToSend),
        contentType: 'application/json',
        async: true,
        dataType: 'json',
        success: function(response) {
                if(response.message){
                    showAlert(response.message);
                }else{
                    showAlert('Item incluído com sucesso:', response);
                }

            $('#modalAdicionarItem').modal('hide');
            $('#modalProdutosLista').modal('hide');
            $('#btn_pesquisar_dinamica').click();
        },
        error: function(xhr, status, error) {
            // alert("Em desenvolvimento");
            showAlert('Erro ao incluir item:', error);
            alert('Ocorreu um erro ao incluir o item.');
        }
    });
});

$('#modalAdicionarItem').on('hidden.bs.modal', function () {
    $('#produtoSearch').val('');
    $('#produtoSearch').data('selectedItem', null);
    $('#searchResults').empty();  // Clear search results
});

setTimeout(function() {
    console.log(typeof PE_GERORC_ANTES_GERORC === "function");
    const original_PE_GERORC_ANTES_GERORC = PE_GERORC_ANTES_GERORC;
    PE_GERORC_ANTES_GERORC = function(jsonenv) {
        let result = original_PE_GERORC_ANTES_GERORC(jsonenv);
        let resut2 = PE_GERORC_ANTES_GERORC2(result);
        return resut2;
    };
}, 3000);

function IniciarProcessoDeReserva() {
    var tabela = document.querySelector("#divAddProd table");
    var tdFrete = document.createElement("td");
    tdFrete.innerHTML = `
        <label id="labelFrete" class="fonte" align="right">Valor do frete:</label><br>
        <div class="fonte-big fonte-gray-darken" align="right">
            <strong id="valorFrete">0,00</strong>
        </div>
    `;
    var segundaLinha = tabela.querySelector("tr:nth-child(2)");
    segundaLinha.appendChild(tdFrete);

    var divAddProd = document.getElementById("opcoesEntrega");
    var botaoReserva = document.createElement("button");
    botaoReserva.className = "btn btn-warning";
    botaoReserva.style.height = "40px";
    botaoReserva.style.width = "100%";
    botaoReserva.innerHTML = 'Reserva <i class="fa fa-box"></i>';

    botaoReserva.addEventListener("click", function() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            redirect: "follow"
        };
        if($("#codigo").data("codigo") != ""){
            fetch(url + "easymobile/CONSULTAS/LISTALOJAS", requestOptions)
                .then(response => response.text())
                .then(result => {
                    const jsonData = JSON.parse(result);
                    if (jsonData.ListaLojas) {
                        createModalReserva(jsonData.ListaLojas);
                    } else {
                        $("#alerta").modal({ backdrop: "static" });
                        document.getElementById("dmodal").innerHTML = 'Nenhuma loja encontrada.';
                    }
                })
                .catch(error => console.error(error));
        }else{
            showAlert("Selecione um produto.");
        }
    });

    divAddProd.appendChild(botaoReserva);
}

function createModalReserva(listaLojas) {
    var modalHtml = `
        <div class="modal fade" id="reservaModal" tabindex="-1" role="dialog" aria-labelledby="reservaModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="reservaModalLabel">Selecionar Loja</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div id="listaLojas" style="display: grid;">
                            ${listaLojas.map(loja => `
                                <button type="button" style="margin: 10px;" class="btn btn-outline-primary loja-item" data-codigo="${loja.Codigo}">
                                    ${loja.Nome} - Filial: ${loja.Filial}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    $('body').append(modalHtml);
    $('#reservaModal').modal('show');

    // Handle button clicks
    $('#listaLojas .loja-item').on('click', function () {
        var selectedLoja = $(this).data('codigo');
        var selectedProduto = $("#codigo").data("codigo");

        $('#reservaModal').modal('hide');
        fetchSaldoInfo(selectedLoja, selectedProduto, listaLojas);
    });
}


let isFetching = false;

function fetchSaldoInfo(selectedLoja, selectedProduto, listaLojas) {
    if (selectedLoja && !isFetching) { 
        isFetching = true;

        var requestBody = JSON.stringify({
            "Parametros": {
                "Codigo": selectedLoja,
                "Produto": selectedProduto.trim()
            }
        });

        fetch(url + "easymobile/CONSULTAS/LISTASALDO", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: requestBody
        })
        .then(response => response.text())
        .then(result => {
            const saldoData = JSON.parse(result);

            if (saldoData.ListaSaldos) {
                showSaldoModal(saldoData.ListaSaldos[0], selectedLoja, listaLojas);
            } else {
                // $("#alerta").modal({ backdrop: "static" });
                // document.getElementById("dmodal").innerHTML = 'Um erro ocorreu ao tentar listar saldos.';
                showAlert("Um erro ocorreu ao tentar listar saldos.");
            }
        })
        .catch(error => console.error(error))
        .finally(() => {
            isFetching = false; 
        });
    }
}


function showSaldoModal(saldo, lojaCodigo,listaLojas) {
    let podeReservar = saldo.QtdDisponivel == 0 ? "disabled" : "";
    var saldoModalHtml = `
        <div class="modal fade" id="saldoModal" tabindex="-1" role="dialog" aria-labelledby="saldoModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="saldoModalLabel">Informações de Saldo</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Produto: ${saldo.Produto}</p>
                        <p>Armazém: ${saldo.Armazem}</p>
                        <p>Quantidade Atual: ${saldo.QtdAtual}</p>
                        <p>Quantidade Reservada: ${saldo.QtdReserva}</p>
                        <p>Quantidade Disponível: ${saldo.QtdDisponivel}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" ${podeReservar} id="submitReserva">Confirmar Reserva</button>
                        <button type="button" class="btn btn-secondary" id="backToLoja">Voltar</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    $('body').append(saldoModalHtml);
    $('#saldoModal').modal('show');


    $('#backToLoja').on('click', function() {
        $('#saldoModal').modal('hide');
        createModalReserva(listaLojas);
    });

    $('#submitReserva').on('click', function() {
        console.log('Reserva confirmada para a loja:', lojaCodigo);
        $("#filial_reserva").text(lojaCodigo);
        $("#filial_reserva").val(lojaCodigo);
        $("#filial_reserva").data("endereco", saldo.Endereco);
        $('#saldoModal').modal('hide');
    });
    $('#saldoModal').on('hidden.bs.modal', function() {
        $(this).remove();
    });
}

$(document).ready(function () {
    IniciarProcessoDeReserva();
});
