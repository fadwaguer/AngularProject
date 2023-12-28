import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { Repository, Like } from 'typeorm';
import { User } from '../models/user.interface';
import { Observable, from, throwError } from 'rxjs';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        ) {}
    
    Create(user: User): Observable<User> {
        return from(this.userRepository.save(user));
    }

    FindOne(id: number): Observable<User>{
        return from(this.userRepository.findOneBy({id}));
    }

    FindAll(): Observable<User[]>{
        return from(this.userRepository.find());
    }

    DeleteOne(id: number): Observable<any>{
        return from(this.userRepository.delete(id));
    }

    UpdateOne(id: number, user: User): Observable<any>{
        return from(this.userRepository.update(id, user));
    }




}