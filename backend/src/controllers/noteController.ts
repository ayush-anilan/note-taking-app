import { Request, Response } from 'express';
import Note from '../models/Note';
import jwt from 'jsonwebtoken';

export const create_note_post = async (req: Request, res: Response) => {
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
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }