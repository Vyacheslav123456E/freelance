import { Module } from "@nestjs/common";
import { PermGateway } from "./perm.gateway";


@Module({
    providers: [PermGateway],
    imports:[]
})
export class PermModule{}