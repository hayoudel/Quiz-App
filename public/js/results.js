
async function afficherResultats() {
  const response = await fetch("/quiz/results");
  const results = await response.json();
  const container = document.getElementById("resultsList");

  if (results.length === 0) {
    container.innerHTML = "<p>Aucun résultat pour le moment.</p>";
    return;
  }

  results.forEach((result) => {
    const div = document.createElement("div");
    div.className = "quiz-card";
    const date = new Date(result.date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
    const pourcentage = Math.round((result.score / result.total) * 100);
    div.innerHTML = `
      <p><strong>🎯 ${result.score} / ${result.total}</strong> — ${pourcentage}%</p>
      <p style="color:#6b7280; font-size:0.9rem">${date}</p>
    `;
    container.appendChild(div);
  });
}

afficherResultats();