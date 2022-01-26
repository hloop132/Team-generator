// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Intern = require("./Employee.js");


class Intern extends Employee {
    constructor(school) {
        super()
    this.school = school;
    }
    
    getRole() {
        console.log("Intern")
    }
}
module.export=sum;