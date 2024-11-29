import jwt from 'jsonwebtoken';

class JwtService {
  constructor(secretKey, options = {}) {
    this.secretKey = secretKey;
    this.options = options; 
  }

  generateToken(payload) {
    return jwt.sign(payload, this.secretKey, this.options);
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (err) {
      throw new Error('Invalid token');
    }
  }

  decodeToken(token) {
    return jwt.decode(token);
  }
}

export {JwtService}
