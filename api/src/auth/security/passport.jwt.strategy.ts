import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { Payload } from "./payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: 'testkey',
        })
    }

    async validate(payload: Payload, done: VerifiedCallback): Promise<any> {
        const user = await this.authService.tokenValidateUser(payload);
        if (!user) {
            return done(new UnauthorizedException({ message: 'user does not exist' }), false);
        }

        return done(null, user);
    }
}