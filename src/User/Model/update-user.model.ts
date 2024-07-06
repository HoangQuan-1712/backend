import { PartialType } from "@nestjs/swagger";
import { CreateUserModel } from "./create-user.model";

export class UpdateUserModel extends PartialType(CreateUserModel) {

}