import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import agentController from '../controllers/agent.controller';

const router = express.Router(); // eslint-disable-line new-cap
router.route('/login').post(validate(paramValidation.login), agentController.login);
router.route('/register').post(validate(paramValidation.register), agentController.register);
router.route('/loged').post(agentController.loged);
export default router;
