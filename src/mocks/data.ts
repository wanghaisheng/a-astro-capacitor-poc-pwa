// Mock data store
export const store = {
  users: [
    {
      id: '1',
      name: 'Test User',
      email: 'test@example.com'
    }
  ],
  sleepStats: {
    lastNight: {
      hours: 7,
      minutes: 45,
      percentage: 65,
      comparison: 'Better than 65% of users'
    },
    goal: {
      hours: 8,
      minutes: 0,
      status: 'Keep it up!'
    }
  }
};
