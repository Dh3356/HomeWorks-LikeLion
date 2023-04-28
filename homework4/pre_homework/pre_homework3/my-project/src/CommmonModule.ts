import {Global, Module} from "@nestjs/common";
import { CommonService } from "./CommomService";
@Global()
@Module({
    providers: [CommonService],
    exports: [CommonService]
})
export class CommonModule {}