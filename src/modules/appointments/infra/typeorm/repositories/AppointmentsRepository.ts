import { Repository, getRepository, Between } from 'typeorm';
import { endOfMonth, startOfMonth, startOfDay, endOfDay } from 'date-fns';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment || undefined;
  }

  public async findAllInMonthFromProvider({
    month,
    provider_id,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parsedDate = new Date(year, month, 1);

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Between(startOfMonth(parsedDate), endOfMonth(parsedDate)),
      },
    });

    return appointments;
  }

  public async findAllInDayFromProvider({
    day,
    month,
    provider_id,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parsedDate = new Date(year, month - 1, day);

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Between(startOfDay(parsedDate), endOfDay(parsedDate)),
      },
    });

    return appointments;
  }

  public async create({
    date,
    provider_id,
    user_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      date,
      provider_id,
      user_id,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
