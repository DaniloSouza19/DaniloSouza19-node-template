import Appointment from '../infra/typeorm/entities/Appointment';
import IcreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

interface IAppointmentsRepository {
  create(data: IcreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}

export default IAppointmentsRepository;
