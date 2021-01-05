import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      email: 'johndue@example.com',
      name: 'John Due',
      password: '123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with an existing e-mail', async () => {
    const user = await createUserService.execute({
      email: 'johndue@example.com',
      name: 'John Due',
      password: '123',
    });

    expect(user).toHaveProperty('id');

    await expect(
      createUserService.execute({
        email: 'johndue@example.com',
        name: 'John Due',
        password: '123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
