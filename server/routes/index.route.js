import express from 'express';
import agentRoutes from './agent.route';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/health-check', (req, res) => res.send('OK'));
router.use('/agent', agentRoutes);

export default router;
