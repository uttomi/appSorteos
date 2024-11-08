document.getElementById('buttonAdd').addEventListener('click', function() {
    const participants = document.getElementById('participants').value;
    const numWinners = parseInt(document.getElementById('numWinners').value);

    const namesArray = participants.split('\n').map(name => name.trim()).filter(Boolean);

    const loadingMessage = document.getElementById('loadingMessage');
    const resultMessage = document.getElementById('result');
    const buttonAdd = document.getElementById('buttonAdd');

    // Limpiar resultados anteriores
    resultMessage.innerHTML = '';  
    loadingMessage.style.display = 'none';

    if (namesArray.length === 0) {
        resultMessage.textContent = 'Por favor, ingresa al menos un nombre para participar.';
        return;
    }

    if (isNaN(numWinners) || numWinners <= 0) {
        resultMessage.textContent = 'El número de ganadores debe ser mayor a 0.';
        return;
    }

    if (numWinners > namesArray.length) {
        resultMessage.textContent = 'El número de ganadores no puede ser mayor que la cantidad de participantes.';
        return;
    }

    buttonAdd.disabled = true;  // Desactivar el botón durante el sorteo

    loadingMessage.style.display = 'block';

    setTimeout(function() {
        loadingMessage.style.display = 'none';

        let winners = [];
        let winnersNames = [...namesArray];

        for (let i = 0; i < numWinners; i++) {
            const randomIndex = Math.floor(Math.random() * winnersNames.length);
            winners.push(winnersNames[randomIndex]);
            winnersNames.splice(randomIndex, 1);  // Eliminar el ganador seleccionado
        }
        const felicitar = document.createElement('p');
        felicitar.textContent = "Felicitaciones: ";
        resultMessage.appendChild(felicitar);
        // Crear un elemento <p> por cada ganador, con numeración
        winners.forEach((winner, index) => {
            const winnerElement = document.createElement('p');
            winnerElement.textContent = `#${index + 1}: ${winner}`;  // Agregar numeración
            resultMessage.appendChild(winnerElement);  // Agregar cada ganador al resultado
        });

        buttonAdd.disabled = false;  // Reactivar el botón después del sorteo
    }, 3000);  // Simular un retraso de 3 segundos para la animación de "Sorteando..."
});
