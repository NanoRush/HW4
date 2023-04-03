const mongoose = require('mongoose');
const History = require('./history');

describe('History model', () => {
  // Connect to test database before running the tests
  beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/PetrolPricer', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  // Test case: Check if History schema can be saved to the database
  it('Can be saved to the database', async () => {
    const mockHistory = new History({
      clientID: "123",
      requested: 2000,
      address: '15850 Knolls Lodge Dr, Houston, TX 77095',
      date: '2023-04-02',
      suggested: '1.895',
      total: '2700'
    });
    const savedHistory = await mockHistory.save();
    expect(savedHistory._id).toBeDefined();
    expect(savedHistory.clientID).toBe("123");
    expect(savedHistory.requested).toBe(2000);
    expect(savedHistory.address).toBe('15850 Knolls Lodge Dr, Houston, TX 77095');
    expect(savedHistory.date).toBe('2023-04-02');
    expect(savedHistory.suggested).toBe('1.895');
    expect(savedHistory.total).toBe('2700');
  });

  // Disconnect from the test database after running the tests
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
}); 