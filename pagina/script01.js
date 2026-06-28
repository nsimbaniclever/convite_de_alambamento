// ===== CONTADOR REGRESSIVO =====
function updateCountdown(targetDate, daysId, totalHoursId, minutesId, secondsId) {
    const now = new Date();
    const target = new Date(targetDate);
    const diff = target - now;

    if (diff > 0) {
        // Calcular dias restantes
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        // Calcular horas TOTAIS (dias convertidos em horas + horas restantes)
        const totalHours = Math.floor(diff / (1000 * 60 * 60));
        
        // Calcular minutos e segundos
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        // Atualizar dias (bloco principal)
        const daysElement = document.getElementById(daysId);
        if (daysElement) {
            daysElement.textContent = days;
            daysElement.style.animation = 'none';
            setTimeout(() => {
                daysElement.style.animation = 'slideFromRight 1s ease-out';
            }, 10);
        }

        // Atualizar horas totais (relógio)
        const hoursElement = document.getElementById(totalHoursId);
        if (hoursElement) {
            hoursElement.textContent = totalHours;
            hoursElement.style.animation = 'none';
            setTimeout(() => {
                hoursElement.style.animation = 'slideFromRight 1s ease-out';
            }, 10);
        }

        // Atualizar minutos e segundos
        if (minutesId) document.getElementById(minutesId).textContent = String(minutes).padStart(2, '0');
        if (secondsId) document.getElementById(secondsId).textContent = String(seconds).padStart(2, '0');
    } else {
        // Quando o evento já passou
        if (daysId) document.getElementById(daysId).textContent = '0';
        if (totalHoursId) document.getElementById(totalHoursId).textContent = '0';
        if (minutesId) document.getElementById(minutesId).textContent = '00';
        if (secondsId) document.getElementById(secondsId).textContent = '00';
    }
}

// Data do Alambamento: 18/07/2026 às 17:00
const dataAlambamento = '2026-07-18T17:00:00';

// Função para iniciar o contador
function startCountdown() {
    updateCountdown(
        dataAlambamento, 
        'days-alambamento',
        'hours-alambamento',
        'minutes-alambamento',
        'seconds-alambamento'
    );
}

// Inicia imediatamente
startCountdown();

// Atualiza a cada segundo
setInterval(startCountdown, 1000);

// ===== EMOJIS FLUTUANTES =====
function createFloatingEmojis() {
    const container = document.getElementById('floatingEmojis');
    const emojis = ['💒', '👰', '🤵', '', '💖', '💕', '', '🥂', '✨', '', '💝', ''];
    const colors = ['#d4af37', '#c0392b', '#ffffff', '#4a90e2', '#f0d060'];

    for (let i = 0; i < 25; i++) {
        const emoji = document.createElement('div');
        emoji.classList.add('emoji');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + '%';
        emoji.style.color = colors[Math.floor(Math.random() * colors.length)];
        emoji.style.fontSize = (20 + Math.random() * 25) + 'px';
        emoji.style.animationDuration = (8 + Math.random() * 8) + 's';
        emoji.style.animationDelay = Math.random() * 10 + 's';
        container.appendChild(emoji);
    }
}

createFloatingEmojis();

// ===== EMOJIS DO MODAL =====
function createModalEmojis() {
    const container = document.getElementById('modalEmojis');
    const emojis = ['💒', '👰', '🤵', '', '💖', '💕', '', '🥂', '✨', ''];
    
    for (let i = 0; i < 15; i++) {
        const emoji = document.createElement('div');
        emoji.classList.add('modal-emoji');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + '%';
        emoji.style.animationDuration = (6 + Math.random() * 6) + 's';
        emoji.style.animationDelay = Math.random() * 8 + 's';
        container.appendChild(emoji);
    }
}

// ===== MODAL =====
function openModal() {
    document.getElementById('modalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
    createModalEmojis();
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.body.style.overflow = 'auto';
    resetForm();
}

function resetForm() {
    document.getElementById('rsvpForm').reset();
    document.getElementById('formContainer').style.display = 'block';
    document.getElementById('successMessage').classList.remove('show');
    document.getElementById('submitBtn').disabled = false;
    document.getElementById('btnText').textContent = 'Enviar Confirmação';
    document.getElementById('spinner').classList.remove('show');
}

function closeModalOnOverlay(event) {
    if (event.target === event.currentTarget) {
        closeModal();
    }
}

// ===== ENVIO DO FORMULÁRIO =====
async function submitForm(event) {
    event.preventDefault();

    const form = event.target;
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const spinner = document.getElementById('spinner');
    
    const formData = {
        nome: form.nome.value.trim(),
        email: form.email.value.trim(),
        comparecimento: form.comparecimento.value,
        mensagem: form.mensagem.value.trim()
    };

    // Validações
    if (!formData.nome || !formData.email || !formData.comparecimento) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Mostrar loading
    submitBtn.disabled = true;
    btnText.textContent = 'Enviando...';
    spinner.classList.add('show');

    // LINK DO GOOGLE SCRIPT
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzf7cEMtlZFBGe9uIZi0CiJdxlxz7fkzRhbtqZujblzUxhOJPZTSHkkz9lRfLi_7UlqBw/exec';

    try {
        const formDataToSend = new FormData();
        formDataToSend.append('nome', formData.nome);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('comparecimento', formData.comparecimento);
        formDataToSend.append('mensagem', formData.mensagem);

        const response = await fetch(scriptURL, {
            method: 'POST',
            body: formDataToSend
        });

        document.getElementById('formContainer').style.display = 'none';
        document.getElementById('successMessage').classList.add('show');

    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao enviar: ' + error.message);
        submitBtn.disabled = false;
        btnText.textContent = 'Enviar Confirmação';
        spinner.classList.remove('show');
    }
}

// Fechar modal com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('modalOverlay').classList.contains('active')) {
        closeModal();
    }
});