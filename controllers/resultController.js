const Result = require("../models/result");
const Quiz = require("../models/quiz");

exports.resultQuiz = async (req, res) => {
    try {
        const { userId, quizId, answers } = req.body;

        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz non trouvé" });
        }

        let score = 0;

        const detailedAnswers = answers.map((ans, index) => {
            const correctAnswer = quiz.questions[index].correct;

            if (ans.selected === correctAnswer) {
                score++;
            }

            return {
                question: quiz.questions[index].question,
                selected: ans.selected,
                correct: correctAnswer
            };
        });

        const result = new Result({
            user: userId,
            quiz: quizId,
            quizTitle: quiz.title,
            answers: detailedAnswers,
            score,
            total: quiz.questions.length
        });

        await result.save();

        res.status(201).json(result);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};