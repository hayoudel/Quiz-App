// Afficher tous les quiz
async function afficherTousLesQuiz() {
  const response = await fetch("/quiz");
  const quizzes = await response.json();
  const container = document.getElementById("adminList");
  container.innerHTML = "";

  if (quizzes.length === 0) {
    container.innerHTML = "<p>Aucun quiz créé pour le moment.</p>";
    return;
  }

  quizzes.forEach((quiz) => {
    const div = document.createElement("div");
    div.className = "quiz-card";
    div.innerHTML = `
      <p><strong>${quiz.question}</strong></p>
      <p>Options : ${quiz.options.join(", ")}</p>
      <p>Bonne réponse : <span style="color:green">${quiz.correct}</span></p>
      <button onclick="supprimerQuiz('${quiz._id}')">🗑️ Supprimer</button>
    `;
    container.appendChild(div);
  });
}

async function supprimerQuiz(id) {
  await fetch(`/quiz/${id}`, { method: "DELETE" });
  afficherTousLesQuiz();
}

afficherTousLesQuiz();