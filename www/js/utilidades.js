function mostrarMensajeCargando(mensaje) {
    $.mobile.loading( 'show', 
        {
            text: mensaje,
	        textVisible: true,
	        theme: 'a',
	        html: ""
        }
    );
}

function ocultarMensajeCargando() {
    $.mobile.loading( 'hide' );
}


/* Devuelve el espacio vertical real disponible para poder calcular los tamaños
    de las zonas de la minuta. Se obtiene con el tamaño vertical de la pantalla
    menos el espacio ocupado por la cabecera y el pie de la minuta */
function obtenerRealStateVerticalDisponible() {
    
    console.log("[DEBUG] Entrando en obtenerRealStateVerticalDisponible fichero js/utilidades.js");
    
    var correccion = 16; //Por los bordes de las celdas de la tabla
    
    var alturaPantalla = $.mobile.getScreenHeight();
        console.log("[DEBUG] alturaPantalla = " + alturaPantalla);
    
    var alturaCabecera = $("#cabecera").height();
        console.log("[DEBUG] alturaCabecera = " + alturaCabecera);
    
    var alturaPie = $("#pie").height();
        console.log("[DEBUG] alturaPie = " + alturaPie);
    
    var realStateVerticalDisponible = alturaPantalla - alturaCabecera - alturaPie - correccion;
        console.log("[DEBUG] realStateVerticalDisponible = " + realStateVerticalDisponible);
    
    return realStateVerticalDisponible;
    
    console.log("[DEBUG] Saliendo de obtenerRealStateVerticalDisponible fichero js/utilidades.js");
}