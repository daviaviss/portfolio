const terminalBody = document.querySelector('.terminal_body');
const terminalCursor = document.querySelector('.terminal_cursor');
const text = '$ Oi, eu sou o Davi! Desde a infância, tenho sido fascinado por tecnologia e sua capacidade de transformar o mundo. Depois de concluir o ensino médio no Colégio de Aplicação, comecei a estudar Sistemas de Informação na Universidade Federal de Santa Catarina em 2021, buscando expandir meus conhecimentos e habilidades na área.<br><br> Desde então, tenho trabalhado em projetos que utilizam metodologias ágeis/SCRUM, com um foco especial no desenvolvimento web. Tenho experiência em HTML, CSS, JavaScript, TypeScript, Node.js, React, Python, VTEX IO, WordPress e GraphQL, estou sempre buscando aprimorar minhas habilidades e conhecimentos.<br><br> Adoro trabalhar em equipe e colaborar com os demais para alcançar objetivos comuns. Acredito que a melhor maneira de aprender é através da experiência, aprendendo com os erros e acertos. Estou animado para continuar explorando novas tecnologias e trabalhar em projetos que tenham um impacto significativo na sociedade.'

let i = 0;
let isDeleting = false;

function type() {
    const currentText = text.substring(0, i);

    // Adiciona o texto na tela de terminal
    terminalBody.innerHTML = `<div style="font-size: 14px;"><a style="color: #1eff8e;">daviaviss@admin:</a><a style="color: #4878c0;"> ~</a> ${currentText}</div>`;

    // Alterna o estado entre escrever e apagar
    if (i === text.length) {
        isDeleting = true;
    } else if (i === 0) {
        isDeleting = false;
    }

    // Avança ou retrocede no texto
    if (isDeleting) {
        i++;
    } else {
        i++;
    }

    // Atraso entre cada caractere
    const delay = isDeleting ? 10 : 40;

    // Anima o cursor
    if (isDeleting) {
        terminalCursor.style.display = 'none';
    } else {
        terminalCursor.style.display = 'block';
    }

    setTimeout(type, delay);
}

type();
