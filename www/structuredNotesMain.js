$(document).ready(function() {
    
    console.log('[INFO] structuredNotes DOM Ready');
    mostrarMensajeCargando("Cargando Structured Notes v0.1");
    
    ///////////////////////////////
    // ASIGNACION EVENT HANDLERS //
    ///////////////////////////////
    
        $("#pageOpciones").bind("pageshow", loadSettings);
        $("#pageInicial").bind("pageshow", cargarMinutasAlmacenadas);
        
        $("#botNuevaMinuta").click(nuevaMinuta);
        
        //Abrir pagina de edicion de campo al hacer click en las areas correspondientes de la minuta
        $("#tablaMinuta_Asistentes").click(abrirDialogoEdicion);
        $("#tablaMinuta_Acciones").click(abrirDialogoEdicion);
        $("#tablaMinuta_Notas").click(abrirDialogoEdicion);
        $("#tablaMinuta_S").click(abrirDialogoEdicion);
        $("#tablaMinuta_W").click(abrirDialogoEdicion);
        $("#tablaMinuta_O").click(abrirDialogoEdicion);
        $("#tablaMinuta_T").click(abrirDialogoEdicion);
        
        
        
        $("#pageEdicionMinutaTables").bind("pageshow", prepararPaginaEdicionMinuta);
        $("#botGuardarMinuta").click(guardarMinuta);
        
        
        
        
        $("#botCancelarEdicionMinuta").click(cancelarEdicionMinuta);
        
        
    
        
        //Boton de pruebas
        $('#botPruebas').click(function() {
            console.log("[INFO] BOTON DE PRUEBAS");
            
            prepararPaginaEdicionMinuta();
            
        });
        
        
        
        ////////////////////////
        // PAGINA DE OPCIONES //
        ////////////////////////
        
        //Guarda las opciones modificadas
        $('#botOpciones_guardar').click(saveSettings);
    
    
    
    //AQUI VA EL CODIGO PRINCIPAL DE LA APLICACION
    inicializacionStructuredNotes();
    cargarMinutasAlmacenadas();
    
    
    
    ocultarMensajeCargando();
    
}); 




function inicializacionStructuredNotes() {
    console.log("[DEBUG] Entrando en inicializacionStructuredNotes fichero structuredNotesMain.js");
    
    //Si nunca se han almacenado minutas, inicializamos el almacenamiento
    if (!localStorage.minutas) {
        console.log("[INFO] Almacenamiento local de minutas vacio: localStorage.minutas = " + localStorage.minutas);
        localStorage.removeItem("minutas");
        localStorage.minutas = JSON.stringify(new Array());
    }
    
    console.log("[DEBUG] Saliendo de inicializacionStructuredNotes fichero structuredNotesMain.js");
}




/*  Monta la lista de la pagina principal con las minutas almacenadas en localStorage */
function cargarMinutasAlmacenadas() {
    console.log("[DEBUG] Entrando en cargarMinutasAlmacenadas fichero structuredNotesMain.js");
    
    if (localStorage.minutas) {
        //Vaciamos la lista para volver a cargarla
        $("#listaMinutas li").remove();
        
        
        var arrayMinutas = JSON.parse(localStorage.minutas);
        for (i=0; i<arrayMinutas.length; i++) {
            minutaLI = '<li><a href="#" data-indiceMinuta="' + i + '">' + arrayMinutas[i][0] + '</a></li>';
            $("#listaMinutas").append(minutaLI);
        }
    
        $("#listaMinutas").listview('refresh');
        arrayMinutas = null;
        
        //Asignamos el event handler para editar las minutas
        $("#listaMinutas li a").click(mostrarMinuta);
    }
    else
        console.log("[INFO] No hay minutas almacenadas --> localStorage.minutas = " + localStorage.minutas);
    
    console.log("[DEBUG] Saliendo de cargarMinutasAlmacenadas fichero structuredNotesMain.js");
}





function nuevaMinuta() {
    console.log("[DEBUG] Entrando en nuevaMinuta fichero structuredNotesMain.js");
    
    var nombreM = $("#textNombreMinuta").val();
    if (nombreM && nombreM.length > 0) {
        var arrayMinutas = JSON.parse(localStorage.minutas);
        
        var arrayMinuta = new Array();
        arrayMinuta[0] = nombreM;
        arrayMinuta[1] = '<div><span class="etiquetaCelda"><strong>Asistentes</strong><br></span></div>'
        arrayMinuta[2] = '<div><span class="etiquetaCelda"><strong>Acciones</strong><br></span></div>'
        arrayMinuta[3] = '<div><span class="etiquetaCelda"><strong>Notas</strong><br></span></div>'
        arrayMinuta[4] = '<div><span class="etiquetaCelda"><strong>Fortalezas</strong><br></span></div>'
        arrayMinuta[5] = '<div><span class="etiquetaCelda"><strong>Debilidades</strong><br></span></div>'
        arrayMinuta[6] = '<div><span class="etiquetaCelda"><strong>Oportunidades</strong><br></span></div>'
        arrayMinuta[7] = '<div><span class="etiquetaCelda"><strong>Amenazas</strong><br></span></div>'
        
        arrayMinutas[arrayMinutas.length] = arrayMinuta;
        
        localStorage.minutas = JSON.stringify(arrayMinutas);    
        arrayMinutas = null;        
    }
    
    //Si no se ha escrito nombre cerramos el dialogo y no hacemos nada
    $("#pageNuevaMinuta").dialog("close");
    
    console.log("[DEBUG] Saliendo de nuevaMinuta fichero structuredNotesMain.js");
}




/* ToDo: Hacer que el text area tenga un tamaño adecuado */
function abrirDialogoEdicion() {
    console.log("[DEBUG] Entrando en abrirDialogoEdicion fichero structuredNotesMain.js");
    
    //Obtenemos el div que ha llamado a la funcion abrirDialogoEdicion y sacamos el parametro data-campo
    var $this = $( this );
    var campo = $this.jqmData("campo");
    
    //Lo asignamos al div del panel de edicion para no perderlo mas adelante
    $("#dialogoEdicionCampoCKEditor").jqmData("campo", campo);
    
    $.mobile.changePage( "#dialogoEdicionCampoCKEditor");
    
    
    console.log("[DEBUG] Editando el campo: " + campo);
    
    //Mostramos en el titulo del dialogo el campo correspondiente al texto en edicion
    $("#spanTituloEdicionCampoCKEditor").html(campo);
    
    //Inicializamos el CKEditor en el textarea si no ha sido inicializado antes
    if (!CKEDITOR.instances.textareaCKEditor) 
        CKEDITOR.replace( 'textareaCKEditor', { toolbar: 'Basic' } );
    
    //Cargamos los datos correspondientes al area de la minuta que invoco al editor
    CKEDITOR.instances.textareaCKEditor.setData($this.html());
    
    //Asignacion Event Handlers de los botones
    $("#botGuardarEdicionCampoCKEditor").click(guardarCampoEditado);
    $("#botCancelarEdicionCampoCKEditor").click(cancelarCampoEditado);
    
    console.log("[DEBUG] Saliendo de abrirDialogoEdicion fichero structuredNotesMain.js");
};




function cancelarCampoEditado() {
    if (CKEDITOR.instances.textareaCKEditor) CKEDITOR.instances.textareaCKEditor.destroy();
    $.mobile.changePage( "#pageEdicionMinutaTables");
}



function cancelarEdicionMinuta() {
    $.mobile.changePage( "#pageInicial");
}






/*  Prepara la pagina de edicion de minuta cargando los datos correspondientes a la minuta almacenada
    en el indice pasado como parametro (localStorage.minutas[indice]) */
function mostrarMinuta() {
    
    console.log("[DEBUG] Entrando en mostrarMinuta fichero structuredNotesMain.js");
    
    //Obtenemos el indice de la minuta que va a ser abierta por haber invocado esta funcion
    var $this = $( this );
    var indice = $this.jqmData("indiceminuta");
    
    window.minutaSeleccionada = indice;    
    console.log("[DEBUG] Minuta seleccionada (indice): " + indice);
    
    var arrayMinutas = JSON.parse(localStorage.minutas);
    var arrayMinuta = arrayMinutas[indice];
    
    window.scrollAsistentes = null;
    window.scrollAcciones = null;
    window.scrollNotas = null;
    window.scrollS = null;
    window.scrollW = null;
    window.scrollO = null;
    window.scrollT = null;
    
    $("#pageEdicionMinutaTables #cabecera h1").html(arrayMinuta[0]);
    
    $("#tablaMinuta_Asistentes div").html(arrayMinuta[1]);
    $("#tablaMinuta_Acciones div").html(arrayMinuta[2]);
    $("#tablaMinuta_Notas div").html(arrayMinuta[3]);
    $("#tablaMinuta_S div").html(arrayMinuta[4]);
    $("#tablaMinuta_W div").html(arrayMinuta[5]);
    $("#tablaMinuta_O div").html(arrayMinuta[6]);
    $("#tablaMinuta_T div").html(arrayMinuta[7]);
    
    window.nombreMinutaSeleccionada = arrayMinuta[0];
    
    
    $.mobile.changePage( "#pageEdicionMinutaTables");
    
    arrayMinuta = null;
    arrayMinutas = null;
    
    console.log("[DEBUG] Saliendo de mostrarMinuta fichero structuredNotesMain.js");
}





/*  Guarda los datos de la minuta en el array del localStorage */
function guardarMinuta() {
    
    console.log("[DEBUG] Entrando en guardarMinuta fichero structuredNotesMain.js");
    
    var indice = window.minutaSeleccionada;
    var nombreMinuta = window.nombreMinutaSeleccionada;
    
    console.log("[DEBUG] Minuta seleccionada (indice): " + indice);
    
    //Miramos a ver si hay un indice seleccionado para editar la entrada correspondiente del array
    //Si no lo hay es que es una minuta nueva y hay que añadirla al array al final.
    if (typeof indice != "number") indice = JSON.parse(localStorage.minutas).length;
        
    var contenidoAsistentes = $("#tablaMinuta_Asistentes div").html();
    var contenidoAcciones = $("#tablaMinuta_Acciones div").html();
    var contenidoNotas = $("#tablaMinuta_Notas div").html();
    var contenidoS = $("#tablaMinuta_S div").html();
    var contenidoW = $("#tablaMinuta_W div").html();
    var contenidoO = $("#tablaMinuta_O div").html();
    var contenidoT = $("#tablaMinuta_T div").html();
    
    var minuta = new Array();
    minuta[0] = nombreMinuta;
    minuta[1] = contenidoAsistentes;
    minuta[2] = contenidoAcciones;
    minuta[3] = contenidoNotas;
    minuta[4] = contenidoS;
    minuta[5] = contenidoW;
    minuta[6] = contenidoO;
    minuta[7] = contenidoT;
    
    var arrayMinutas = JSON.parse(localStorage.minutas);
    arrayMinutas[indice] = minuta;
    localStorage.minutas = JSON.stringify(arrayMinutas);
    
    //Volvemos a la pagina principal
    $.mobile.changePage( "#pageInicial");
    
    console.log("[DEBUG] Saliendo de guardarMinuta fichero structuredNotesMain.js");
}






/*  Para guardar los datos correctamentes en la pageEdicionMinutaTables hay que tener cuidado al meter html en la celda
    correspondiente ya que iScroll es muy sensible a los cambios del DOM.
    1. Obtener el contenido del textarea en formato HTML de la pagina de edicion de campo
    2. Obtener el div que invoco a la pagina de edicion de campo y su variable global del objeto iScroll asociada (window.scroll ...)
    3. Destruir el objeto iScroll que invoco al dialogo (lo regeneraremos al mostrar la pagina de edicion de minuta)
    4. Poner a null la variable global del objeto iScroll para que en el evento "pageshow" se re inicialice
    5. Poner el html en el div que lo invoco */
function guardarCampoEditado() {
    console.log("[DEBUG] Entrando en guardarCampoEditado fichero structuredNotesMain.js");
    
    //var contenidoEditado = $("#textareaCKEditor").val();
    var contenidoEditado = CKEDITOR.instances.textareaCKEditor.getData();
    var campoEditado = $("#dialogoEdicionCampoCKEditor").jqmData("campo");
    var identificadorDivEditado = "";
    
    var iScrollCampoEditado;
    
    switch (campoEditado) {
        case "Asistentes":
            identificadorDivEditado = "tablaMinuta_Asistentes"
            window.scrollAsistentes = null;
            $("#"+identificadorDivEditado + " div").html(contenidoEditado);
            break;
            
        case "Acciones":
            identificadorDivEditado = "tablaMinuta_Acciones"
            window.scrollAcciones = null;
            $("#"+identificadorDivEditado + " div").html(contenidoEditado);
            break;
            
        case "Notas":
            identificadorDivEditado = "tablaMinuta_Notas"
            window.scrollNotas = null;
            $("#"+identificadorDivEditado + " div").html(contenidoEditado);
            break;
            
        case "Fortalezas":
            identificadorDivEditado = "tablaMinuta_S"
            window.scrollS = null;
            $("#"+identificadorDivEditado + " div").html(contenidoEditado);
            break;
            
        case "Debilidades":
            identificadorDivEditado = "tablaMinuta_W"
            window.scrollW = null;
            $("#"+identificadorDivEditado + " div").html(contenidoEditado);
            break;
            
        case "Oportunidades":
            identificadorDivEditado = "tablaMinuta_O"
            window.scrollO = null;
            $("#"+identificadorDivEditado + " div").html(contenidoEditado);
            break;
            
        case "Amenazas":
            identificadorDivEditado = "tablaMinuta_T"
            window.scrollT = null;
            $("#"+identificadorDivEditado + " div").html(contenidoEditado);
            break;
            
        default:
            console.log ("[ERROR] El campo editado no corresponde con los casos del switch: fichero structuredNotesMain.js");
    }
    
    
    if (CKEDITOR.instances.textareaCKEditor) CKEDITOR.instances.textareaCKEditor.destroy();
    
    $.mobile.changePage( "#pageEdicionMinutaTables");
    
    console.log("[DEBUG] Saliendo de guardarCampoEditado fichero structuredNotesMain.js");
}






/* Asigna las alturas correspondientes a las celdas de la tabla de edicion de la minuta
    en funcion de lo definido en las opciones de la aplicacion.
    Inicializa tambien los iScroll para que se pueda hacer scroll individual en cada celda */
function prepararPaginaEdicionMinuta() {

    console.log("[DEBUG] Entrando en prepararPaginaEdicionMinuta fichero structuredNotesMain.js");
    //console.time("tamanoBloques");
    
    var realStateVerticalDisponible = obtenerRealStateVerticalDisponible();
    var alturaAsistentesAcciones = Math.floor(realStateVerticalDisponible * localStorage.alturaAsistentesAcciones / 100);
    var alturaSW = Math.floor(realStateVerticalDisponible * localStorage.alturaSWOT / 100);
    var alturaOT = alturaSW; //Las filas SW y OT deberan ser del mismo tamaño
    var alturaNotas = realStateVerticalDisponible - alturaAsistentesAcciones - alturaSW - alturaOT;
    
    console.log("[DEBUG] alturaAsistentesAcciones = " + alturaAsistentesAcciones);
    console.log("[DEBUG] alturaSW = " + alturaSW);
    console.log("[DEBUG] alturaOT = " + alturaOT);
    console.log("[DEBUG] alturaNotas = " + alturaNotas);
    
    
    $("#tablaMinuta_Asistentes").css("height", alturaAsistentesAcciones + "px");
    $("#tablaMinuta_Asistentes").css("max-height", alturaAsistentesAcciones + "px");
    
    $("#tablaMinuta_Acciones").css("height", alturaAsistentesAcciones + "px");
    $("#tablaMinuta_Acciones").css("max-height", alturaAsistentesAcciones + "px");
        
    $("#tablaMinuta_Notas").css("height", alturaNotas + "px");
    $("#tablaMinuta_Notas").css("max-height", alturaNotas + "px");
    
    
    $("#tablaMinuta_S").css("height", alturaSW + "px");
    $("#tablaMinuta_S").css("max-height", alturaSW + "px");
    
    $("#tablaMinuta_W").css("height", alturaSW + "px");
    $("#tablaMinuta_W").css("max-height", alturaSW + "px");
    
    $("#tablaMinuta_O").css("height", alturaOT + "px");
    $("#tablaMinuta_O").css("max-height", alturaOT + "px");
    
    $("#tablaMinuta_T").css("height", alturaOT + "px");
    $("#tablaMinuta_T").css("max-height", alturaOT + "px");

    
    if (!window.scrollAsistentes) window.scrollAsistentes = new iScroll('tablaMinuta_Asistentes');
    if (!window.scrollAcciones) window.scrollAcciones = new iScroll('tablaMinuta_Acciones');
    if (!window.scrollNotas) window.scrollNotas = new iScroll('tablaMinuta_Notas');
    if (!window.scrollS) window.scrollS = new iScroll('tablaMinuta_S');
    if (!window.scrollW) window.scrollW = new iScroll('tablaMinuta_W');
    if (!window.scrollO) window.scrollO = new iScroll('tablaMinuta_O');
    if (!window.scrollT) window.scrollT = new iScroll('tablaMinuta_T');
    
    window.scrollAsistentes.refresh(); 
    window.scrollAcciones.refresh();
    window.scrollNotas.refresh();
    window.scrollS.refresh();
    window.scrollW.refresh();
    window.scrollO.refresh();
    window.scrollT.refresh();
    
    
    console.log("[DEBUG] Saliendo de prepararPaginaEdicionMinuta fichero structuredNotesMain.js");
}
