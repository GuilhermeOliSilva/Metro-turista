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


function changeLine(lineName) {
    if (lineName === 'Linha Azul') {
        document.getElementById('metro-svg-blue').style.display = 'block';
        document.getElementById('metro-svg-green').style.display = 'none';
    } else if (lineName === 'Linha Verde') {
        document.getElementById('metro-svg-blue').style.display = 'none';
        document.getElementById('metro-svg-green').style.display = 'block';
    }


    // Modifica o estilo do modal
    var modal = document.getElementById('station-info');
    modal.style.backgroundColor = lineName === 'Linha Azul' ? '#1900ff' : 'green';

    var formData = new FormData();
    formData.append('cor', lineName === 'Linha Azul' ? 'azul' : 'verde');

    fetch('/', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        // Atualiza apenas a parte necessária do conteúdo
        var parser = new DOMParser();
        var doc = parser.parseFromString(data, 'text/html');
    
        // Atualiza o conteúdo dos SVGs
        var metroSvgBlue = doc.getElementById('metro-svg-blue');
        var metroSvgGreen = doc.getElementById('metro-svg-green');
        document.getElementById('metro-svg-blue').innerHTML = metroSvgBlue.innerHTML;
        document.getElementById('metro-svg-green').innerHTML = metroSvgGreen.innerHTML;
    
        // Atualiza o conteúdo do modal
        var modalContent = doc.getElementById('station-info').innerHTML;
        document.getElementById('station-info').innerHTML = modalContent;
    })
    .catch(error => {
        console.error('Error:', error);
    });    
}