import express, { Router, Request, Response, NextFunction } from 'express';
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

// Get all notes
router.get("/notes", noteController.get_notes)

// Get a specific note
router.get("/notes/:id", noteController.get_specific_note)

// Update a specific note
router.put("/notes/:id", noteController.update_specific_note)

// Delete a specific note
router.delete("/notes/:id", noteController.delete_specific_note)

// Error handling middleware
router.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
});

export default router;