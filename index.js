//Required Node packages
const inquirer = require(`inquirer`);
const fs = require('fs');

//Declare classes
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

//Initialize empty array
const employees = [];

//Initialize application
function initApp() {
  createHtml();
  createEmployee();
}

//Collect responses from user inputs
function createEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "Enter Team Member's name:",
      },
      {
        type: 'list',
        name: 'title',
        message: "Select Team Member's title:",
        choices: ['Manager', 'Engineer', 'Intern'],
      },
      {
        type: 'input',
        name: 'id',
        message: "Enter Team Member's ID:",
      },
      {
        type: 'input',
        name: 'email',
        message: "Enter Team Member's email address:",
      },
    ])
    .then(function ({ name, title, id, email }) {
      let titleInfo = '';
      if (title === 'Engineer') {
        titleInfo = 'GitHub Username';
      } else if (title === 'Intern') {
        titleInfo = 'School Name';
      } else {
        titleInfo = 'Office Number';
      }
      inquirer
        .prompt([
          {
            message: `Enter Team Member's ${titleInfo}:`,
            name: 'titleInfo',
          },
          {
            type: 'list',
            message: 'Would you like to add more Team Members?:',
            choices: ['yes', 'no'],
            name: 'moreMembers',
          },
        ])
        .then(function ({ titleInfo, moreMembers }) {
          let newMember;
          if (title === 'Engineer') {
            newMember = new Engineer(name, id, email, titleInfo);
          } else if (title === 'Intern') {
            newMember = new Intern(name, id, email, titleInfo);
          } else {
            newMember = new Manager(name, id, email, titleInfo);
          }
          employees.push(newMember);
          addHtml(newMember).then(function () {
            if (moreMembers === 'yes') {
              createEmployee();
            } else {
              endFile();
            }
          });
        });
    });
}


//Template for generating HTML file
function createHtml() {
  const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Yanone+Kaffeesatz:wght@400;500;600;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="style.css">
        <title>Emily's Team Profile Generator</title>
    </head>
    <body>
        <nav class="navbar navbar-dark mb-5">
            <span class="mb-3 mt-3 h1 w-100 text-center">TEAM PROFILE GENERATOR</span>
        </nav>
        <div class="container">
            <div class="row">`;
  fs.writeFile('./dist/index.html', html, function (err) {
    if (err) {
      console.log(err);
    }
  });
  console.log('Enter Team Member Information');
}

function addHtml(member) {
  return new Promise(function (resolve, reject) {
    const name = member.getName();
    const title = member.getRole();
    const id = member.getId();
    const email = member.getEmail();
    let data = '';
    if (title === 'Engineer') {
      const gitHub = member.getGithub();
      data = `<div class="col-4">
                <div class="card mx-auto mb-3 shadow" style="width: 18rem">
                  <h5 class="card-header">${name}<br /><br /><i class="fas fa-glasses"></i> Engineer</h5>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">ID: ${id}</li>
                      <li class="list-group-item">Email:<a href="mailto:${email}" target="_blank"> ${email}</a></li>
                      <li class="list-group-item">GitHub:<a href="https://github.com/${gitHub}" target="_blank"> ${gitHub}</a></li>
                    </ul>
                </div>
              </div>`;
    } else if (title === 'Intern') {
      const school = member.getSchool();
      data = `<div class="col-4">
                <div class="card mx-auto mb-3 shadow" style="width: 18rem">
                  <h5 class="card-header">${name}<br /><br /><i class="fas fa-user-graduate"></i> Intern</h5>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">ID: ${id}</li>
                      <li class="list-group-item">Email:<a href="mailto:${email}" target="_blank"> ${email}</a></li>
                      <li class="list-group-item">School: ${school}</li>
                    </ul>
                </div>
              </div>`;
    } else {
      const officeNumber = member.getOfficeNumber();
      data = `<div class="col-4">
                <div class="card mx-auto mb-3 shadow" style="width: 18rem">
                  <h5 class="card-header">${name}<br /><br /><i class="fas fa-mug-hot"></i> Manager</h5>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">ID: ${id}</li>
                      <li class="list-group-item">Email:<a href="mailto:${email}" target="_blank"> ${email}</a></li>
                      <li class="list-group-item">Office Number: ${officeNumber}</li>
                    </ul>
                </div>
              </div>`;
    }
    fs.appendFile('./dist/index.html', data, function (err) {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}

function endFile() {
  const html = `
      </div>
    </div>    
</body>
</html>`;

  fs.appendFile('./dist/index.html', html, function (err) {
    if (err) {
      console.log(err);
    }
  });
  console.log('HTML Created');
}


initApp();