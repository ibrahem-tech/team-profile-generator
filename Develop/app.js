// required npm and import files
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const questionsForManager = [
    {
        message: "Please enter the name of the manager: ",
        name: "name"
    },
    {
        type: "number",
        message: "Please enter the ID of the manager: ",
        name: "id"
    },
    {
        message: "Please enter the email of the manager: ",
        name: "email"
    },
    {
        type: "number",
        message: "Please enter the office number of the manager: ",
        name: "officeNumber"
    }
];
const questionsForEngineer = [
    {
        message: "Please enter the name of the engineer: ",
        name: "name"
    },
    {
        type: "number",
        message: "Please enter the ID of the engineer: ",
        name: "id"
    },
    {
        message: "Please enter the email of the engineer: ",
        name: "email"
    },
    {
        message: "Please enter the github username of the engineer: ",
        name: "github"
    }
];
const questionsForIntern = [
    {
        message: "Please enter the name of the intern: ",
        name: "name"
    },
    {
        type: "number",
        message: "Please enter the ID of the intern: ",
        name: "id"
    },
    {
        message: "Please enter the email of the intern: ",
        name: "email"
    },
    {
        message: "Please enter the school name of the intern",
        name: "school"
    }
];


teamInformation();
const team = [];

async function teamInformation() {
    try {
       
        const managerInfo = await inquirer
        .prompt(questionsForManager);
        const newManager = new Manager(managerInfo.name, managerInfo.id, managerInfo.email, managerInfo.officeNumber);
       team.push(newManager);

        
        const engineerNum = await inquirer
        .prompt([{ type: "number", message: "How many engineers?", name: "num" }]);
        for (var i = 0; i < engineerNum.num; i++) {
            const response = await inquirer
            .prompt(questionsForEngineer)
            const newEngineer = new Engineer(response.name, response.id, response.email, response.github);
            team.push(newEngineer);
        };

       
        const internNum = await inquirer
        .prompt([{ type: "number", message: "How many interns?", name: "num" }]);
        for (var i = 0; i < internNum.num; i++) {
            const response = await inquirer
            .prompt(questionsForIntern)
            const newIntern = new Intern(response.name, response.id, response.email, response.school);
            team.push(newIntern);
        };

        const html = await render(team);
        
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR);
        };

        
        fs.writeFile(outputPath, html, err => {
            if (err) {
                console.log(err);
            } else {
                console.log("Successful!");
            };
        });

    } catch (err) {
      
        console.log(err);
    };
};