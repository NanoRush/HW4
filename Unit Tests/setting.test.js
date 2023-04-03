const request = require('supertest');
const app = require('./setting'); // assuming this is the file containing the Express app

describe('POST /setting', () => {
  it('updates user information and redirects to the settings page', async () => {
    // prepare a mock user object
    const mockUser = {
      id: 1,
      full_name: 'John Deer',
      email: 'john@gmail.com',
      address: '123 Main st.',
      city: 'Houston',
      state: 'TX',
      zipcode: 12345,
      user_name: 'John123',
      password: '123',
      cardNumber: '123456789',
      cardExp: '11/27',
      cvv: 312
    };

    // create a mock user in the database
    await request(app)
      .post('/create-user') // assuming this route creates a new user
      .send(mockUser);

    // send a mock POST request to update the user information
    const response = await request(app)
      .post('/setting')
      .send({
        fullName: 'John Doe',
        userEmail: 'john.doe@gmail.com',
        userName: 'johndoe',
        address: '456 Oak St.',
        city: 'Dallas',
        state: 'TX',
        zipCode: 54321,
        cardNumber: '987654321',
        expirationDate: '10/30',
        cvv: 456
      });

    // expect the response to redirect to the settings page
    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe('/setting');

    // check that the user information was updated in the database
    const updatedUser = await User.findOne({ id: mockUser.id });
    expect(updatedUser.full_name).toBe('John Doe');
    expect(updatedUser.email).toBe('john.doe@gmail.com');
    expect(updatedUser.user_name).toBe('johndoe');
    expect(updatedUser.address).toBe('456 Oak St.');
    expect(updatedUser.city).toBe('Dallas');
    expect(updatedUser.state).toBe('TX');
    expect(updatedUser.zipcode).toBe(54321);
    expect(updatedUser.cardNumber).toBe('987654321');
    expect(updatedUser.cardExp).toBe('10/30');
    expect(updatedUser.cvv).toBe(456);
  });
});