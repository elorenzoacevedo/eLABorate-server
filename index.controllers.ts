import { Request,Response } from "express";
import {QueryResult} from "pg";
import {pool} from './db.js';
export const getTasks = async (req: Request, res: Response): Promise<Response> => {
    try {
      // Execute a PostgreSQL query to select all tasks
      const response: QueryResult = await pool.query('SELECT * FROM tasks');
  
      // Return a JSON response with the retrieved tasks
      return res.status(200).json(response.rows);
    } catch (error) {
      // Handle errors, log them, and return an internal server error response
      console.error(error);
      return res.status(500).json('Internal Server error');
    }
  }