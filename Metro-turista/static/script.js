function selectStation(stationName, stationFunc, stationLocation, stationImg, clickedCircle) {
    // Abrir modal com informações da estação
    var modal = document.getElementById("station-info");
    // Estação
    modal.innerHTML = '<h2 class="nome_estacao_modal"> ' + stationName + '</h2>'
    // Horário de funcionamento
    modal.innerHTML += '<h3 class="text_horaFunc_estacao_modal">Horário de funcionamento: </h3> <p class="horaFunc_estacao_modal">' + stationFunc + '</p>'
    // Localização da estação
    modal.innerHTML += '<h3 class="text_Loc_estacao_modal">Localização: <p class="horaFunc_estacao_modal">' + stationLocation + '</p></h3>'
    // Localização da estação
    modal.innerHTML += '<img src=" ' + stationImg+ '" class="imagem_estacao_modal" >'
    modal.style.display = "block";

    
    var circles = document.querySelectorAll('.white-ball-line');
    circles.forEach(function(circle) {
        circle.classList.remove('selected');
    });
    
    clickedCircle.classList.add('selected');
}


function changeLine(lineName) {
    
    var modal = document.getElementById('station-info');
    modal.style.display = "none";
    
    if (lineName === 'Linha Azul') {
        document.getElementById('metro-svg-green').style.display = 'none';
        document.getElementById('metro-svg-red').style.display = 'none';
        document.getElementById('metro-svg-blue').style.display = 'block';
    } else if (lineName === 'Linha Verde') {
        document.getElementById('metro-svg-blue').style.display = 'none';
        document.getElementById('metro-svg-red').style.display = 'none';
        document.getElementById('metro-svg-green').style.display = 'block';
    } else if (lineName === 'Linha Vermelha') {
        document.getElementById('metro-svg-blue').style.display = 'none';
        document.getElementById('metro-svg-green').style.display = 'none';
        document.getElementById('metro-svg-red').style.display = 'block';
    }

    var modal = document.getElementById('station-info');
    modal.style.backgroundColor = lineName === 'Linha Azul' ? '#1900ff' : (lineName === 'Linha Verde' ? 'green' : 'red');

    var formData = new FormData();
    formData.append('cor', lineName === 'Linha Azul' ? 'azul' : (lineName === 'Linha Verde' ? 'verde' : 'vermelha')); // Adicione a verificação para linha vermelha

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
        var parser = new DOMParser();
        var doc = parser.parseFromString(data, 'text/html');
    
        var metroSvgBlue = doc.getElementById('metro-svg-blue');
        var metroSvgGreen = doc.getElementById('metro-svg-green');
        var metroSvgRed = doc.getElementById('metro-svg-red'); // Adicione o elemento SVG para a linha vermelha

        document.getElementById('metro-svg-blue').innerHTML = metroSvgBlue.innerHTML;
        document.getElementById('metro-svg-green').innerHTML = metroSvgGreen.innerHTML;
        document.getElementById('metro-svg-red').innerHTML = metroSvgRed.innerHTML; // Atualize o conteúdo do SVG para a linha vermelha
    
        var modalContent = doc.getElementById('station-info').innerHTML;
        document.getElementById('station-info').innerHTML = modalContent;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}