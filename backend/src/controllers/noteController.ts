import { Request, Response, NextFunction  } from 'express';
import Note from '../models/Note';
import jwt from 'jsonwebtoken';

export const create_note_post = async (req: Request, res: Response, next: NextFunction) => {
    const { title, content } = req.body;
    try {
      // Check if authorization header exists
      if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      // Get user id from token
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken: any = jwt.verify(token, process.env.SECRET_KEY as string);
      const userId = decodedToken.userId;
      
      // Create new note
      const newNote = await Note.query().insert({ title, content, userId });
      res.status(201).json({ message: 'Note created successfully', note: newNote });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

// Get all notes
export const get_notes = async (req: Request, res: Response, next: NextFunction) => {
    const { search, page, limit } = req.query;
    const pageNumber = parseInt(page as string, 10) || 1;
    const limitNumber = parseInt(limit as string, 10) || 10;
    const offset = (pageNumber - 1) * limitNumber;
    try {
      let query = Note.query();
      if (search) {
        // Search for notes containing the search query in title or content
        query = query.where('title', 'ilike', `%${search}%`).orWhere('content', 'ilike', `%${search}%`);
      }
      // Get total count of notes
      const totalCount = await query.resultSize();
      // Paginate the query
      const notes = await query.offset(offset).limit(limitNumber);
      res.status(200).json({ totalCount, totalPages: Math.ceil(totalCount / limitNumber), page: pageNumber, limit: limitNumber, notes });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

// get a specific note
export const get_specific_note = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const note = await Note.query().findById(id);
      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.status(200).json(note);
    } catch (error) {
      console.error(error);
      next(error)
    }
  }

// Update a specific note
export const update_specific_note = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
      const updatedNote = await Note.query().patchAndFetchById(id, { title, content });
      if (!updatedNote) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.status(200).json({ message: 'Note updated successfully', note: updatedNote });
    } catch (error) {
      console.error(error);
      next(error)
    }
  }


// Delete a specific note
export const delete_specific_note = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const deletedNote = await Note.query().deleteById(id);
      if (!deletedNote) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
      console.error(error);
      next(error)
    }
  }