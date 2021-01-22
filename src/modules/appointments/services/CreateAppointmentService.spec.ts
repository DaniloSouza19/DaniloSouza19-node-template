import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 1, 8).getTime();
    });

    const appointment = await createAppointmentService.execute({
      date: new Date(2021, 0, 1, 9),
      provider_id: '123123',
      user_id: 'user',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('should not be able to create a new appointment at the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2021, 0, 1, 8).getTime();
    });

    await createAppointmentService.execute({
      date: new Date(2021, 0, 1, 9),
      provider_id: 'provider',
      user_id: 'user',
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2021, 0, 1, 9),
        provider_id: 'provider',
        user_id: 'user',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new appointment in a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 1, 9).getTime();
    });

    await expect(
      createAppointmentService.execute({
        provider_id: 'provider',
        user_id: 'user',
        date: new Date(2021, 0, 1, 8),
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create an appointment to yourself', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 1, 9).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2021, 0, 1, 10),
        provider_id: 'user-id',
        user_id: 'user-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create an appointment out of work time (8am until 5pm)', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 1, 6).getTime();
    });

    await expect(
      createAppointmentService.execute({
        provider_id: 'provider-id',
        user_id: 'user-id',
        date: new Date(2021, 0, 1, 7),
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentService.execute({
        provider_id: 'provider-id',
        user_id: 'user-id',
        date: new Date(2021, 0, 1, 18),
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
