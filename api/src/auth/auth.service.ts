import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDTO } from './dto/user.dto'
import { UserService, hashing } from './user.service';
import { User } from './entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}

    async registerUser(newUser: UserDTO): Promise<UserDTO> {
        let userFind: UserDTO = await this.userService.findByFields({
            where: { email: newUser.email }
        })
        let userFind1: UserDTO = await this.userService.findByFields({
            where: { uid: newUser.uid }
        })
        if(userFind) throw new HttpException('Email aleady used', HttpStatus.BAD_REQUEST);
        else if(userFind1) throw new HttpException('Username aleady used', HttpStatus.BAD_REQUEST);
        newUser.upw = hashing(hashing(newUser.upw));
        newUser.admin = false;
        
        return await this.userService.save(newUser);
    }

    async validateUser(userDTO: UserDTO): Promise<{accessToken: string} | undefined> {
        let userfind: User = await this.userService.findByFields({
            where: { email: userDTO.email }
        });
        if(!userfind || userfind.upw !== hashing(hashing(userDTO.upw))) throw new UnauthorizedException();
        const payload = {
            'uid': userfind.uid,
            'email': userfind.email,
            'admin': userfind.admin
        }

        return {
            accessToken: this.jwtService.sign(payload)
        };
    }
}