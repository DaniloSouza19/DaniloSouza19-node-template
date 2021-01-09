import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';

describe('ResetPassword', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let fakeUserTokensRepository: FakeUserTokensRepository;
  let resetPasswordService: ResetPasswordService;
  let fakeHashProvider: FakeHashProvider;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider
    );
  });

  it('Should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({
      password: '123456',
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toBeCalledWith('123456');
    expect(updatedUser?.password).toBe('123456');
  });

  it('Should not be able to reset the password with a non-existing user token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'non-existing-token',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to reset the password with a non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existing-user'
    );

    await expect(
      resetPasswordService.execute({
        token,
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to reset the password after 2 hours of token generation', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        token,
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
