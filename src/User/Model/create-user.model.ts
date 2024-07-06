import { ApiProperty } from '@nestjs/swagger';

export class CreateUserModel {
    @ApiProperty({ description: 'First name', required: true, nullable: false })
    firstname: string;

    @ApiProperty({ description: 'Last name', required: true, nullable: false })
    lastname: string;

    @ApiProperty({ description: 'email', required: true, nullable: false })
    email: string;

    @ApiProperty({ description: 'password', required: true, nullable: false })
    password: string;

    @ApiProperty({ description: 'phone' })
    phone: string;

    @ApiProperty({ description: 'gender' })
    gender: string;

    @ApiProperty({ description: 'address' })
    address: string;

    @ApiProperty({ description: 'birthday' })
    birthday: Date;
}
