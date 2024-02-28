import inquirer from "inquirer";
const quiz = "https://opentdb.com/api.php?amount=6&category=21&difficulty=easy&type=multiple";
let fetchdata = async (data) => {
    let quizdta = await fetch(data);
    let res = await quizdta.json();
    return res.results;
};
let data = await fetchdata(quiz);
let startQuiz = async () => {
    let score = 0;
    let Name = await inquirer.prompt({
        type: "input",
        name: "user",
        message: "Enter your Name:"
    });
    for (let i = 1; i <= 5; i++) {
        let answer = [...data[i].incorrect_answers, data[i].correct_answer];
        let ans = await inquirer.prompt({
            type: "list",
            name: "quiz",
            message: data[i].question,
            choices: answer.map((val) => val),
        });
        if (ans.quiz == data[i].correct_answer) {
            ++score;
            console.log("Correct");
        }
        else {
            console.log(`Wrong! the answer is ${data[i].correct_answer}`);
        }
    }
    console.log(`Dear ${Name.user} , your score is ${score} out of 5`);
};
startQuiz();
