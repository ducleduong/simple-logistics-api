import { Expose } from 'class-transformer';
import JwtDecode, { JwtPayload } from 'jwt-decode';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CommonHeader {
  @IsNotEmpty()
  @Matches(/^Bearer[ ]+([^ ]+)[ ]*$/i)
  @IsString()
  @Expose({ name: 'authorization' })
  authorization: string;

  get token(): CustomJwtPayload {
    return JwtDecode(/^Bearer[ ]+([^ ]+)[ ]*$/i.exec(this.authorization)[1]);
  }

  get userId(): string {
    return this.token.sub;
  }
}

export class CustomJwtPayload implements JwtPayload {
  sub?: string;
  iat?: number;
  exp?: number;
}
