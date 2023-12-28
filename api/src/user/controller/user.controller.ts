import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Controller('users')
export class UserController {

    constructor(private userService: UserService) { }

    @Post()
    Create(@Body()user: User): Observable<User>{
        return this.userService.Create(user);

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
