const checkEmail = require("./checkEmailMock");


describe('checkEmail function', () => {
  it('should return false if email is not provided', () => {
    const result = checkEmail('');

    expect(result).toBe(false);
  });

  it('should return true if email is provided', () => {
    const result = checkEmail('test@example.com');

    expect(result).toBe(true);
  });

  it('should return false for null email', () => {
    const result = checkEmail(null);

    expect(result).toBe(false);
  });

  it('should return false for undefined email', () => {
    
    const result = checkEmail(undefined);

    expect(result).toBe(false);
  });
});