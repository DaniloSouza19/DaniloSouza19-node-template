import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);

    const user = await createUserService.execute({
      email: 'johndue@example.com',
      name: 'John Due',
      password: '123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with an existing e-mail', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUserService = new CreateUserService(fakeUsersRepository);

    const user = await createUserService.execute({
      email: 'johndue@example.com',
      name: 'John Due',
      password: '123',
    });

    expect(user).toHaveProperty('id');

    expect(
      createUserService.execute({
        email: 'johndue@example.com',
        name: 'John Due',
        password: '123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
