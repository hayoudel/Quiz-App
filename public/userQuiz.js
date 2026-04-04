let score = 0;
let total = 0;

// Afficher les quiz
async function afficherQuiz() {
  const response = await fetch("/quiz");
  const quizzes = await response.json();
  const container = document.getElementById("quizContainer");

  total = quizzes.length;

  quizzes.forEach((quiz) => {
    const div = document.createElement("div");
    div.className = "quiz-card";

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

  const boutonScore = document.createElement("button");
  boutonScore.textContent = "Voir mon score";
  boutonScore.onclick = afficherScore;
  container.appendChild(boutonScore);
}

// Vérifier la réponse
function verifierReponse(bouton, optionChoisie, bonneReponse) {
  const resultat = bouton.parentElement.querySelector(".resultat");
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

// Afficher le score final
async function afficherScore() {
  // Sauvegarder le score dans MongoDB
  await fetch("/quiz/results", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ score, total })
  });

  const container = document.getElementById("quizContainer");
  const scoreDiv = document.createElement("div");
  scoreDiv.className = "score-card";
  scoreDiv.innerHTML = `
    <h2>🎯 ${score} / ${total}</h2>
    <p>Tu as eu ${score} bonne(s) réponse(s) sur ${total} !</p>
    <br>
    <button onclick="location.reload()"> Recommencer</button>
    <button onclick="window.location.href='results.html'" style="background:white; color:#4f46e5;">
      📊 Voir l'historique
    </button>
  `;
  container.appendChild(scoreDiv);
}

afficherQuiz();