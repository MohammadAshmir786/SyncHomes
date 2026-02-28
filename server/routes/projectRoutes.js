import { Router } from 'express';
const router = Router();
import { getProjects, addProject, updateProject, deleteProject } from '../controllers/projectController.js';

router.get('/', getProjects);
router.post('/', addProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;