import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmnetsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmnetsController = new AppointmnetsController();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', appointmnetsController.create);

export default appointmentsRouter;
