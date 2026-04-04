
async function createQuiz() {
  const question = document.getElementById("question").value;
  const option1 = document.getElementById("option1").value;
  const option2 = document.getElementById("option2").value;
  const correct = document.getElementById("correct").value;
//Dans cette fonction, on récupère les valeurs des champs de formulaire HTML
  await fetch("/quiz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question,
      options: [option1, option2],
      correct,
    }),
  });

  alert("Quiz ajouté !");
}

// On utilise fetch pour envoyer une requête POST au serveur avec les données du quiz.
let score = 0;
let total = 0;

async function afficherQuiz() {
  const response = await fetch("/quiz");
  const quizzes = await response.json();
  const container = document.getElementById("quizContainer");

  total = quizzes.length;

  quizzes.forEach((quiz) => {
    const div = document.createElement("div");

    const boutons = quiz.options.map(option => `
      <button onclick="verifierReponse(this, '${option}', '${quiz.correct}')">
        ${option}
      </button>
    `).join("");

    div.innerHTML = `
      <p><strong>${quiz.question}</strong></p>
      ${boutons}
      <p class="resultat"></p>
      <hr>
    `;

    container.appendChild(div);
  });

  // Bouton pour voir le score
  const boutonScore = document.createElement("button");
  boutonScore.textContent = "Voir mon score";
  boutonScore.onclick = afficherScore;
  container.appendChild(boutonScore);
}

function verifierReponse(bouton, optionChoisie, bonneReponse) {
  const resultat = bouton.parentElement.querySelector(".resultat");

  // Désactiver tous les boutons de cette question
  bouton.parentElement.querySelectorAll("button").forEach(b => b.disabled = true);

  if (optionChoisie === bonneReponse) {
    resultat.textContent = "✅ Bonne réponse !";
    resultat.style.color = "green";
    score++;
  } else {
    resultat.textContent = `❌ Mauvaise réponse ! La bonne réponse était : ${bonneReponse}`;
    resultat.style.color = "red";
  }
}

function afficherScore() {
  const container = document.getElementById("quizContainer");
  const scoreDiv = document.createElement("div");
  scoreDiv.innerHTML = `
    <h2>🎯 Ton score : ${score} / ${total}</h2>
    <button onclick="location.reload()">Recommencer</button>
  `;
  container.appendChild(scoreDiv);
}

afficherQuiz();