import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { Repository, Like } from 'typeorm';
import { User } from '../models/user.interface';
import { Observable, catchError, from, map, of, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/auth/services/auth.service';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private authService: AuthService
        ) {}
    
    Create(user: User): Observable<User> {
        return this.authService.hashPassword(user.password).pipe(
            switchMap((passwordHash: string) => {
                const newUser = new UserEntity();
                newUser.name = user.name;
                newUser.username = user.username;    
                newUser.email = user.email;     
                newUser.password = passwordHash;

                return from(this.userRepository.save(newUser)).pipe(
                    map((user: User) => {
                        const {password, ...result} = user;
                        return result;
                    }),
                    catchError(err => throwError(err))
                )
            })
    )} 

    FindOne(id: number): Observable<User>{
        return from(this.userRepository.findOneBy({id})).pipe(
            map((user: User) => {
                const {password, ...result} = user;
                return result;
            })
        )
        //return from(this.userRepository.findOneBy({id}));
    }

    FindAll(): Observable<User[]>{
        return from(this.userRepository.find()).pipe(
            map((user: User[]) => {
                user.forEach(function (v){delete v.password});
                return user;
            })    
        )
    }

    DeleteOne(id: number): Observable<any>{
        return from(this.userRepository.delete(id));
    }

    UpdateOne(id: number, user: User): Observable<any>{
        delete user.email;
        delete user.password;
        return from(this.userRepository.update(id, user));
    }


    login(user: User): Observable<String> {

        return this.validateUser(user.email, user.password).pipe(
            switchMap((user: User) => { 
                if(user) {
                    return this.authService.generateJwt(user).pipe(map((jwt: String) => jwt));
                } else {
                    return of('wrong');
                }

            })

        )
    }

    validateUser(email: string, password: string): Observable<User> {
        return this.findByMail(email).pipe(
            switchMap((user: User) => {
                return this.authService.comparePasswords(password, user.password).pipe(
                    map((match: boolean) => {
                        if (match) {
                            const { password: _, ...result } = user;
                            return result;
                        } else {
                            throw Error;
                        }
                    })
                );
            })
        );
    }

    findByMail(email: string): Observable<User> {
        return from(this.userRepository.findOneBy({email}));
    }

}