function loadSettings() {
    
    console.log("[DEBUG] Entrando en loadSettings fichero js/settings.js");
    
    $("#sliderAsistentesAcciones").val(localStorage.alturaAsistentesAcciones);
    $("#sliderSWOT").val(localStorage.alturaSWOT);
    
    $("#sliderAsistentesAcciones").slider('refresh');
    $("#sliderSWOT").slider('refresh');
    
    console.log("[DEBUG] Saliendo de loadSettings fichero js/settings.js");
}


function saveSettings() {
    
    console.log("[DEBUG] Entrando en saveSettings fichero js/settings.js");
    
    var alturaAsistentesAcciones = $("#sliderAsistentesAcciones").val();
    var alturaSWOT = $("#sliderSWOT").val();
    
    console.log("[DEBUG] alturaAsistentesAcciones: " + alturaAsistentesAcciones);
    console.log("[DEBUG] alturaSWOT: " + alturaSWOT);
    
    //Guardamos los tamaños de los bloques de la minuta en el local storage
    localStorage.alturaAsistentesAcciones = alturaAsistentesAcciones;
    localStorage.alturaSWOT = alturaSWOT;
    
    console.log("[DEBUG] Saliendo de saveSettings fichero js/settings.js");
} 