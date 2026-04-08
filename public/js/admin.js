async function createQuiz() {
  const question = document.getElementById("question").value;
  const option1 = document.getElementById("option1").value;
  const option2 = document.getElementById("option2").value;
  const correct = document.getElementById("correct").value;

  await fetch("/quiz", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question,
      options: [option1, option2],
      correct,
    }),
  });

  document.getElementById("message").textContent = "✅ Quiz ajouté avec succès !";
  document.getElementById("question").value = "";
  document.getElementById("option1").value = "";
  document.getElementById("option2").value = "";
  document.getElementById("correct").value = "";
}