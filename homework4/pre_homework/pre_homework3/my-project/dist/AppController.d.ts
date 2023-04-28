import { CommonService } from "./CommomService";
export declare class AppController {
    private readonly commonService;
    constructor(commonService: CommonService);
    getCommonHello(): string;
}
