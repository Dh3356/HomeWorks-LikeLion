import {Module} from "@nestjs/common";
import {CommonModule} from "./CommmonModule";

@Module({
    imports: [CommonModule],
    exports: [CommonModule]
})
export class CoreModule {}