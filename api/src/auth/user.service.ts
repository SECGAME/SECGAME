import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { UserDTO } from "./dto/user.dto";
import { FindOneOptions } from "typeorm";
import * as crypto from 'crypto';
import { User } from "./entity/user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ){}

    async findByFields(options: FindOneOptions<UserDTO>): Promise<User | undefined> {
        return await this.userRepository.findOne(options);
    }

    async save(userDTO: UserDTO): Promise<UserDTO | undefined> {
        return await this.userRepository.save(userDTO);
    }
}
export function hashing(inputString: string): string {
    const hash = crypto.createHash('sha512');
    hash.update(inputString);
    return hash.digest('hex');
}