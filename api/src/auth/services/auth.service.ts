import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, from, generate, of } from 'rxjs';
import { User } from 'src/user/models/user.interface';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {

    constructor(private readonly jwtService : JwtService){}

        
    generateJwt(user: User): Observable <String> {
            
        return from(this.jwtService.signAsync({user}));
        } 
        
    hashPassword(password: string): Observable <String> {
        return from<string>(bcrypt.hash(password, 12));
    }


    comparePasswords(newPaswword: string, passwordHash: string): Observable <any | boolean>{
        return of<any | boolean>(bcrypt.compare(newPaswword, passwordHash) )
    }

    
    }
