import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { Observable, catchError, map, of } from 'rxjs';
import { User } from '../models/user.interface';
import { ObjectLiteral } from 'typeorm';

@Controller('users')
export class UserController {

    constructor(private userService: UserService) { }

    @Post()
    Create(@Body() user: User): Observable<User | object> {
      return this.userService.Create(user).pipe(
          map((user: User) => user),
          catchError(err => of({ error: err.message }))
      );
      }

      @Post('Login')
      login(@Body() user: User): Observable<Object>{
         return this.userService.login(user).pipe(
            map((jwt: string) => {
            return {access_token: jwt};
            })
         )
      }

     @Get(':id')
     FindOne(@Param()params): Observable<User>
     {
        return this.userService.FindOne(params.id);
     }

     @Get()
     FindAll(): Observable<User[]>
     {
        return this.userService.FindAll();
     }

     @Delete(':id')
     DeelteOne(@Param('id')id: string): Observable<User>
     {
        return this.userService.DeleteOne(Number(id));
     }

     @Put(':id')
     updateOne(@Param('id') id: string, @Body() user: User): Observable<any>
     {
        return this.userService.UpdateOne(Number(id),user);
     }




}
