module.exports = class Candidate{
    constructor(email, first_name, last_name, time_interval, linkedin, github, text){
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.time_interval = time_interval;
    this.linkedin = linkedin;
    this.github = github;
    this.text = text;
    }
}