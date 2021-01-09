import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import ProfileController from '../controllers/ProfileController';

const profileRoutes = Router();
const profileController = new ProfileController();

profileRoutes.use(ensureAuthenticated);

profileRoutes.get('/', profileController.show);
profileRoutes.put('/', profileController.update);

export default profileRoutes;
