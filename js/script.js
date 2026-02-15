const imagens = document.querySelectorAll('.mov');
const box1 = document.getElementById('box1');
const box2 = document.getElementById('box2');
const box3 = document.getElementById('box3');
const statsGrid = document.getElementById('stats-grid');
const displayPontos = document.getElementById('total-pontos');
const displayUltima = document.getElementById('ultima-jogada');

let ultimaPeca = "---";

function atualizarPainel() {
    let contagemNumeros = {0: 8, 1: 8, 2: 8, 3: 8, 4: 8, 5: 8, 6: 8};
    let somaPontosMao = 0;

    // 1. Calcula peças na mão
    box1.querySelectorAll('img').forEach(img => {
        const valores = img.getAttribute('data-val').split(',').map(Number);
        // Soma os dois lados da peça (ex: 6,6 vira 12)
        somaPontosMao += (valores[0] + valores[1]);
        // Remove da contagem global
        valores.forEach(v => contagemNumeros[v]--);
    });

    // 2. Calcula peças na mesa
    box2.querySelectorAll('img').forEach(img => {
        const valores = img.getAttribute('data-val').split(',').map(Number);
        valores.forEach(v => contagemNumeros[v]--);
    });

    // Atualiza o resumo visual
    displayPontos.innerText = somaPontosMao;
    displayUltima.innerText = ultimaPeca;

    // Atualiza a grade de estatísticas
    statsGrid.innerHTML = '';
    for (let i = 0; i <= 6; i++) {
        const card = document.createElement('div');
        card.className = 'stat-card';
        card.innerHTML = `<b>Número ${i}</b> <span>${contagemNumeros[i]}</span>`;
        statsGrid.appendChild(card);
    }
}

// Lógica de clique para mover as peças
imagens.forEach(img => {
    img.addEventListener('click', function() {
        if (this.parentNode === box1) {
            // Movendo da mão para a mesa
            ultimaPeca = this.getAttribute('data-val').replace(',', '-');
            box2.appendChild(this);
        } else {
            // Movendo da mesa de volta para a mão
            box1.appendChild(this);
        }
        atualizarPainel();
    });
});








// Inicializa o cálculo ao carregar
atualizarPainel();
