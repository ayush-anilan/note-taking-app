import express, { Router } from 'express';
import * as userController from "../controllers/userController"
import * as noteController from "../controllers/noteController"

const router: Router = express.Router();

// Test Route
router.get('/test', (req, res) => {
  res.send('API is working');
});

// User registration
router.post('/register', userController.register_post);

// Email verification
router.get('/verify/:token', userController.verifyToken);

// User login
router.post("/login", userController.login_post)

// Create a new note
router.post('/notes/create', noteController.create_note_post );

export default router;