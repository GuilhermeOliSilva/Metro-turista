function selectStation(stationName, stationFunc, stationLocation, stationImg) {
    // Abrir modal com informações da estação
    var modal = document.getElementById("station-info");
    // Estação
    modal.innerHTML = '<h2 class="nome_estacao_modal"> ' + stationName + '</h2>'
    // Horário de funcionamento
    modal.innerHTML += '<h3 class="text_horaFunc_estacao_modal">Horário de funcionamento: </h3> <p class="horaFunc_estacao_modal">' + stationFunc + '</p>'
    // Localização da estação
    modal.innerHTML += '<h3 class="text_horaFunc_estacao_modal">Horário de funcionamento: </h3> <p class="horaFunc_estacao_modal">' + stationLocation + '</p>'
    // Localização da estação
    modal.innerHTML += '<img src=" ' + stationImg+ '" class="imagem_estacao_modal" >'
    modal.style.display = "block";
}