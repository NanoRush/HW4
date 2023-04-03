const mongoose = require('mongoose');
const User = require('../Users');

describe('User model', () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://0.0.0.0:27017/PetrolPricer", { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should be able to save a user', async () => {
    const userData = {
      id: '123',
      name: 'Sugar Daddy',
      email: 'sugardaddy@gmail.com',
      zipcode: '77095',
      password: 'password',
    };
    const user = new User(userData);
    await user.save();

    const savedUser = await User.findOne({ id: '123' });
    expect(savedUser.name).toBe('Sugar Daddy');
  });

  it('should not be able to save a user without required fields', async () => {
    const userData = {
      id: '123',
      email: 'sugardaddy@gmail.com',
      password: 'password',
    };
    const user = new User(userData);

    let error;
    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.name).toBeDefined();
    expect(error.errors.zipcode).toBeDefined();
  });
});