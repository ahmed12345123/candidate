const Candidate = require('../models/candidate');

describe('Candidate class', () => {
  it('should create an instance of Candidate with correct properties', () => {

    const email = 'test';
    const first_name = 'test';
    const last_name = 'test';
    const phone_number = '12'
    const time_interval = '1';
    const linkedin = 'test';
    const github = 'test';
    const text = 'Test';

    const candidate = new Candidate(email, first_name, last_name, time_interval, linkedin, github, text);

    expect(candidate.email).toBe(email);
    expect(candidate.first_name).toBe(first_name);
    expect(candidate.last_name).toBe(last_name);
    expect(candidate.phone_number).toBe(phone_number);
    expect(candidate.time_interval).toBe(time_interval);
    expect(candidate.linkedin).toBe(linkedin);
    expect(candidate.github).toBe(github);
    expect(candidate.text).toBe(text);
  });

});