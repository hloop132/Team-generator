//if input === engineer,inter, manager
//then answer this array of question + extra question
//add school, office number, or github
//yes/ no add new employee
//if statements for y n
//connect to html with writefile

const inquirer = require("inquirer");
const fs = require("fs");

const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const Manager = require("./lib/Manager.js");
const generateHTML = require("./util/generateHtml.js");

const team = [];

const engineerQuestion = [
  {
    type: "input",
    message: "What is the engineers Github?",
    name: "github",
  },
];
const internQuestion = [
  {
    type: "list",
    message: "What school is the intern attending?",
    name: "school",
  },
];
const managerQuestion = [
  {
    type: "input",
    message: "What is the managers office number?",
    name: "officeNumber",
  },
];

const addEmployee = [
  {
    type: "list",
    message: "Would you like to add a new employee?",
    name: "newEmployee",
    choices: ["Yes", "No"],
  },
];

const employeeQuestions = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employees name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is employees id?",
        name: "id",
      },
      {
        type: "input",
        message: "What is employees email?",
        name: "email",
      },
      {
        type: "list",
        message: "What is the employees role?",
        name: "role",
        choices: ["Manager", "Engineer", "Intern"],
      },
    ])
    .then(function (employeeAnswers) {
      if (employeeAnswers.Role === "Engineer") {
        inquirer.prompt(engineerQuestion).then(function ({ github }) {
          console.log(github);
          console.log(employeeAnswers);
          inquirer.prompt(addEmployee).then(function ({ newEmployee }) {
            console.log(newEmployee);
            if (newEmployee === "Yes") {
              employeeQuestions();
            }
            team.push(new (team.name, team.id, team.email, team.github)());
          });
        });
      } else if (employeeAnswers.Role === "Intern") {
        inquirer.prompt(internQuestion).then(function ({ school }) {
          console.log(school);
          console.log(employeeAnswers);
          inquirer.prompt(addEmployee).then(function ({ newEmployee }) {
            console.log(newEmployee);
            if (newEmployee === "Yes") {
              employeeQuestions();
            }
            team.push(new (team.name, team.id, team.email, team.school)());
          });
        });
      } else {
        inquirer.prompt(managerQuestion).then(function ({ officeNumber }) {
          console.log(officeNumber);
          console.log(employeeAnswers);
          inquirer.prompt(addEmployee).then(function ({ newEmployee }) {
            console.log(newEmployee);
            if (newEmployee === "Yes") {
              employeeQuestions();
            }
            team.push(
              new (team.name, team.id, team.email, team.officeNumber)()
            );
          });
        });
      }
    });
};

function generateHtml() {
  let html = "";
  for (j = 0; j < maxTimes; j++) {
    console.log(team[j]);
    html += `   <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>My Team</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/c502137733.js"></script>
</head>

<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 jumbotron mb-3 team-heading">
                <h1 class="text-center">My Team</h1>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="team-area col-12 d-flex justify-content-center">
                ${generateHTML(team)}
            </div>
        </div>
    </div>
</body>
</html>
`;

    console.log(team);
    const fs = require("fs");
    fs.writeFile("index.html", generateHTML, function (err) {
      if (err) throw err;
      console.log("File has been created");
    });
  }
}
// generateHTML()
employeeQuestions()

// first parameter is the path to the file you want to create
// second parameter is the string you want to write to the file
// fs.writeFileSync("./log.txt", generateSentence("heather"))
