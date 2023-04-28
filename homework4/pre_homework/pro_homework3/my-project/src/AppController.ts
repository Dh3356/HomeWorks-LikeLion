import {Controller, Get} from "@nestjs/common";
import {CommonService} from "./CommomService";

@Controller()
export class AppController {
    constructor(private readonly commonService: CommonService) {
    }

    @Get('/common-hello')
    getCommonHello(): string {
        return this.commonService.hello();
    }
}