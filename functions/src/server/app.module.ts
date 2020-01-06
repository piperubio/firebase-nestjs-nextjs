import { EggController } from "./egg/egg.controller";
import { Module } from "@nestjs/common";

@Module({
  imports: [],
  controllers: [EggController]
})
export class AppModule {}
