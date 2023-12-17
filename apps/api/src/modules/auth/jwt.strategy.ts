import { passportJwtSecret } from 'jwks-rsa';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { IAuth0Payload } from 'src/types/jwt.types';
import { User } from '../../database/schemas/user.schema';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(
//     @Inject('USERS_REPOSITORY')
//     private userRepository: typeof User,
//   ) {
//     super({
//       secretOrKeyProvider: passportJwtSecret({
//         cache: true,
//         rateLimit: true,
//         jwksRequestsPerMinute: 5,
//         jwksUri: 'https://finance-leitmotiv.us.auth0.com/.well-known/jwks.json',
//       }),

//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       audience: 'https://finance-leitmotiv.us.auth0.com/api/v2/',
//       issuer: 'https://finance-leitmotiv.us.auth0.com/',
//       algorithms: ['RS256'],
//     });
//   }

//   async validate(payload: IAuth0Payload): Promise<User> {
//     const { sub } = payload;

//     const userFound = await this.userRepository.findOne({ where: { sub } });

//     if (!userFound) {
//       if (payload.sub && payload.azp) {
//         const newUser = await this.userRepository.create({
//           sub,
//         });

//         return newUser;
//       }
//       throw new UnauthorizedException();
//     }

//     return userFound;
//   }
// }

// @Injectable()
// export class JwtStrategy implements CanActivate {
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const req = context.getArgByIndex(0);
//     const res = context.getArgByIndex(1);

//     const checkJwt = promisify(
//       expressjwt({
//         secret: expressJwtSecret({
//           cache: true,
//           rateLimit: true,
//           jwksRequestsPerMinute: 5,
//           jwksUri:
//             'https://finance-leitmotiv.us.auth0.com/.well-known/jwks.json',
//         }) as GetVerificationKey,
//         audience: 'https://finance-leitmotiv.us.auth0.com/api/v2/',
//         issuer: 'https://finance-leitmotiv.us.auth0.com/',
//         algorithms: ['RS256'],
//       }),
//     );

//     try {
//       await checkJwt(req, res);
//       return true;
//     } catch (error) {
//       throw new UnauthorizedException(error);
//     }
//   }
// }
