import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import ProfileController from '../controllers/ProfileController';

const profileRoutes = Router();
const profileController = new ProfileController();

profileRoutes.use(ensureAuthenticated);

profileRoutes.get('/', profileController.show);

profileRoutes.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      name: Joi.string(),
      password: Joi.string(),
      old_password: Joi.when('password', {
        is: Joi.exist(),
        then: Joi.string().required(),
      }),
      password_confirmation: Joi.when('password', {
        is: Joi.exist(),
        then: Joi.string().equal(Joi.ref('password')).required(),
      }),
    },
  }),
  profileController.update
);

export default profileRoutes;
