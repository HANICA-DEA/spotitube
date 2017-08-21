import {LoginRequest} from './login-request.model';

describe('Model Object LoginRequest', () => {
  let loginRequest: LoginRequest;

  beforeEach(() => loginRequest = new LoginRequest('', ''));

  it('should be created', () => {
    expect(loginRequest).toBeTruthy();
  });
})
