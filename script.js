// Criar partículas temáticas de casamento Angola-Rússia
function createParticles() {
    const container = document.getElementById('particles');

    // Emojis e símbolos temáticos
    const weddingEmojis = [
        '💒', // Igreja/casamento
        '🤵', // Noivo
        '👰', // Noiva
        '💍', // Aliança
        '💖', // Coração brilhante
        '💕', // Dois corações
        '💐', // Buquê
        '🥂', // Brinde
        '✨', // Brilho
        '⭐', // Estrela (Angola)
        '❄️', // Neve (Rússia)
        '🌹', // Rosa
        '💝', // Coração com presente
        '🎊', // Celebração
        '🕊️', // Pomba da paz
    ];

    // Cores temáticas
    const colorClasses = [
        'angola-red', // Vermelho Angola
        'angola-black', // Preto Angola
        'angola-gold', // Dourado Angola
        'russia-white', // Branco Rússia
        'russia-blue', // Azul Rússia
        'russia-red', // Vermelho Rússia
        'gold' // Dourado
    ];

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Emoji aleatório
        const randomEmoji = weddingEmojis[Math.floor(Math.random() * weddingEmojis.length)];
        particle.textContent = randomEmoji;

        // Posição aleatória
        particle.style.left = Math.random() * 100 + '%';

        // Cor aleatória
        const randomColor = colorClasses[Math.floor(Math.random() * colorClasses.length)];
        particle.classList.add(randomColor);

        // Tamanho variado
        const size = 15 + Math.random() * 20;
        particle.style.fontSize = size + 'px';

        // Duração e delay aleatórios
        particle.style.animationDuration = (6 + Math.random() * 6) + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';

        container.appendChild(particle);
    }
}

// Abrir envelope
function abrirEnvelope() {
    const envelope = document.getElementById('envelope');
    const letter = document.getElementById('letter');

    // Envelope desce
    envelope.classList.add('opened');

    // Carta sobe e aparece
    setTimeout(() => {
        letter.classList.add('visible');
    }, 300);
}

// Evento do botão
document.getElementById('btnAbrir').addEventListener('click', abrirEnvelope);

// Inicializar
createParticles();