import { Controller, Get } from "@nestjs/common";

@Controller("egg")
export class EggController {
  @Get()
  hello(): string {
    return "This action returns an 🥚";
  }

  event(change, context): string {
    return "This action returns an 🥚 event";
  }
}
