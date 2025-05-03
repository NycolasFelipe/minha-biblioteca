import { Request } from "express";
import { decode } from "jsonwebtoken";

function extractTokenId(req: Request): string {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.replace(/^Bearer\s+/i, '');

  if (!token) return '';

  const decoded = decode(token);

  if (decoded && typeof decoded === 'object' && 'id' in decoded) {
    return decoded.id.toString();
  }
  return '';
}

export default extractTokenId;