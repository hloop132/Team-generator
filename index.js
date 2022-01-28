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
    type: "input",
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
    type: "confirm",
    message: "Would you like to add a new employee?",
    name: "newEmployee",
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
      if (employeeAnswers.role === "Engineer") {
        inquirer.prompt(engineerQuestion).then(function ({ github }) {
          // console.log(github);
          // console.log(employeeAnswers);
          inquirer.prompt(addEmployee).then(function ({ newEmployee }) {
            // console.log(newEmployee);
            team.push(
              new Engineer(
                employeeAnswers.name,
                employeeAnswers.id,
                employeeAnswers.email,
                employeeAnswers.github
              )
            );

            if (newEmployee) {
              employeeQuestions();
            } else {
              writeFile();
            }
          });
        });
      } else if (employeeAnswers.role === "Intern") {
        inquirer.prompt(internQuestion).then(function ({ school }) {
          // console.log(school);
          // console.log(employeeAnswers);
          inquirer.prompt(addEmployee).then(function ({ newEmployee }) {
            // console.log(newEmployee);
            team.push(
              new Intern(
                employeeAnswers.name,
                employeeAnswers.id,
                employeeAnswers.email,
                employeeAnswers.school
              )
            );
            if (newEmployee) {
              employeeQuestions();
            } else {
              writeFile();
            }
          });
        });
      } else if (employeeAnswers.role === "Manager") {
        inquirer.prompt(managerQuestion).then(function ({ officeNumber }) {
          // console.log(officeNumber);
          // console.log(employeeAnswers);
          inquirer.prompt(addEmployee).then(function ({ newEmployee }) {
            // console.log(newEmployee); 
            team.push(
              new Manager(
                employeeAnswers.name,
                employeeAnswers.id,
                employeeAnswers.email,
                employeeAnswers.officeNumber
              )
            );
            if (newEmployee) {
              employeeQuestions();
            } else {
              writeFile();
            }
          });
        });
      }
    });
};

// console.log(team);
function writeFile() {
  fs.writeFile("index.html", generateHTML(team), function (err) {
    if (err) throw err;
    // console.log("File has been created");
  });
}

employeeQuestions();

// first parameter is the path to the file you want to create
// second parameter is the string you want to write to the file
// fs.writeFileSync("./log.txt", generateSentence("heather"))
