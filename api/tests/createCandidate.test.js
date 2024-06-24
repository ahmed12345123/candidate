const db = {
  execute: jest.fn(),
};

const { alreadyExist, createCandidate } = require('../controllers/candidateControllers'); 

describe('alreadyExist function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return true if candidate exists', async () => {
    db.execute.mockResolvedValueOnce([[{email: 'test@example.com',
  first_name: 'John',
  last_name: 'Doe',
  time_interval: '1',
  linkedin: 'test',
  github: 'test',
  text: 'Test',
  phone_number: '12' }], []]);

    const email = 'test@example.com';
    const exists = await alreadyExist(email);

    expect(exists).toBe(true);
    expect(db.execute).toHaveBeenCalledWith(
      'SELECT * FROM candidate WHERE email = ?',
      [email]
    );
  });

  it('should return false if candidate does not exist', async () => {
    db.execute.mockResolvedValueOnce([[], []]);

    const email = 'test@example.com';
    const exists = await alreadyExist(email);

    expect(exists).toBe(false);
    expect(db.execute).toHaveBeenCalledWith(
      'SELECT * FROM candidate WHERE email = ?',
      [email]
    );
  });

  it('should throw an error if db.execute fails', async () => {
    const error = new Error('Database error');
    db.execute.mockRejectedValueOnce(error);

    const email = 'test@example.com';
    
    await expect(alreadyExist(email)).rejects.toThrow(error);
    expect(db.execute).toHaveBeenCalledWith(
      'SELECT * FROM candidate WHERE email = ?',
      [email]
    );
  });
});

describe('createCandidate function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update an existing candidate', async () => {
    const email = 'test@example.com';
    const firstName = 'John';
    const lastName = 'Doe';
    const timeInterval = 123;
    const linkedin = 'linkedin.com/johndoe';
    const github = 'github.com/johndoe';
    const text = 'Some text';
    const phoneNumber = '123-456-7890';

    jest.spyOn(global, 'alreadyExist').mockResolvedValueOnce(true);
    
    db.execute.mockResolvedValueOnce([{ affectedRows: 1 }, []]);

    const result = await createCandidate(email, firstName, lastName, timeInterval, linkedin, github, text, phoneNumber);

    expect(result).toBe(true);
    expect(db.execute).toHaveBeenCalledWith(
      'UPDATE candidate SET first_name = ?, last_name = ?, time_interval = ?, linkedin = ?, github = ?, text = ?, phone_number = ? WHERE email = ?',
      [firstName, lastName, timeInterval, linkedin, github, text, phoneNumber, email]
    );
  });

  it('should create a new candidate if they do not exist', async () => {
    const email = 'test@example.com';
    const firstName = 'Jane';
    const lastName = 'Smith';
    const timeInterval = 456;
    const linkedin = 'linkedin.com/janesmith';
    const github = 'github.com/janesmith';
    const text = 'Some other text';
    const phoneNumber = '987-654-3210';

    jest.spyOn(global, 'alreadyExist').mockResolvedValueOnce(false);
    
    db.execute.mockResolvedValueOnce([{ affectedRows: 1 }, []]);

    const result = await createCandidate(email, firstName, lastName, timeInterval, linkedin, github, text, phoneNumber);

    expect(result).toBe(true);
    expect(db.execute).toHaveBeenCalledWith(
      'INSERT INTO candidate (email, first_name, last_name, time_interval, linkedin, github, text, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [email, firstName, lastName, timeInterval, linkedin, github, text, phoneNumber]
    );
  });

  it('should throw an error if db.execute fails during update', async () => {
    const email = 'test@example.com';
    const firstName = 'John';
    const lastName = 'Doe';
    const timeInterval = 123;
    const linkedin = 'linkedin.com/johndoe';
    const github = 'github.com/johndoe';
    const text = 'Some text';
    const phoneNumber = '123-456-7890';

    
    jest.spyOn(global, 'alreadyExist').mockResolvedValueOnce(true);
    
    const error = new Error('Database error');
    db.execute.mockRejectedValueOnce(error);

    await expect(createCandidate(email, firstName, lastName, timeInterval, linkedin, github, text, phoneNumber)).rejects.toThrow(error);

    expect(db.execute).toHaveBeenCalledWith(
      'UPDATE candidate SET first_name = ?, last_name = ?, time_interval = ?, linkedin = ?, github = ?, text = ?, phone_number = ? WHERE email = ?',
      [firstName, lastName, timeInterval, linkedin, github, text, phoneNumber, email]
    );
  });

  it('should throw an error if db.execute fails during insert', async () => {
    const email = 'test@example.com';
    const firstName = 'Jane';
    const lastName = 'Smith';
    const timeInterval = 456;
    const linkedin = 'linkedin.com/janesmith';
    const github = 'github.com/janesmith';
    const text = 'Some other text';
    const phoneNumber = '987-654-3210';

    
    jest.spyOn(global, 'alreadyExist').mockResolvedValueOnce(false);
    
    const error = new Error('Database error');
    db.execute.mockRejectedValueOnce(error);

    await expect(createCandidate(email, firstName, lastName, timeInterval, linkedin, github, text, phoneNumber)).rejects.toThrow(error);

    expect(db.execute).toHaveBeenCalledWith(
      'INSERT INTO candidate (email, first_name, last_name, time_interval, linkedin, github, text, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [email, firstName, lastName, timeInterval, linkedin, github, text, phoneNumber]
    );
  });
});
