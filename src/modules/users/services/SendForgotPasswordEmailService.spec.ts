import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;
let fakeUserTokensRepository: FakeUserTokensRepository;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository
    );
  });

  it('should be able to recover the password using your e-mail', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'John Due',
      email: 'johndue@example.com',
      password: '123',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndue@example.com',
    });

    expect(sendMail).toBeCalled();
  });

  it('Should not be able to recover the password of a non-existing user', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'johndue@example.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should generate a forgot password token', async () => {
    const generate = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John Due',
      email: 'johndue@example.com',
      password: '123',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndue@example.com',
    });

    expect(generate).toBeCalledWith(user.id);
  });
});
