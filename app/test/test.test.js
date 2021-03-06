/* eslint-disable no-undef */
const { expect } = require('chai');
const apiTestingUtility = require('../utils/apiTestingUtility');

let token;

const testingAccount = {
  email: 'nachonight.testing@protonmail.com',
  password: 'test12345',
  confirmPassword: 'test12345',
};

describe('Testing Suite', () => {
  describe('Registration', () => {
    it('should return the user object', async () => {
      const res = await apiTestingUtility('post', '/register', testingAccount);
      expect(res.data).to.include.all.keys(
        'email',
        'password',
        'id',
        'updatedAt',
        'created',
        'verified',
        'banned',
        'type',
      );
    });
  });
  describe('Login', () => {
    it('should return a token', async () => {
      const res = await apiTestingUtility('post', '/login', testingAccount);
      expect(res.data).to.include.all.keys('loggedIn', 'token');
    });
  });
  describe('Get current user', () => {
    it('should return the non-sensitive user information', async () => {
      const login = await apiTestingUtility('post', '/login', testingAccount);
      token = login.data.token;
      const res = await apiTestingUtility('get', '/current', null, token);
      expect(res.data).to.include.all.keys(
        'id',
        'email',
        'verified',
        'banned',
        'clientID',
        'created',
        'type',
      );
    });
  });
  describe('Change password', () => {
    it('should return the updated user object', async () => {
      const res = await apiTestingUtility(
        'put',
        '/change-password',
        { password: '12345test' },
        token,
      );
      expect(res.data).to.include.all.keys(
        'email',
        'password',
        'id',
        'updatedAt',
        'created',
        'verified',
        'banned',
        'type',
      );
    });
  });
  describe('Delete', () => {
    it('should return a confirmation and a timestamp of when the user has been deleted', async () => {
      const res = await apiTestingUtility('delete', '/delete', null, token);
      expect(res.data).to.include.all.keys('deleted', 'timestamp');
    });
  });
});
