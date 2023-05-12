"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("./users/users.module");
const email_module_1 = require("./email/email.module");
const process_1 = require("process");
const typeorm_1 = require("@nestjs/typeorm");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [users_module_1.UsersModule, email_module_1.EmailModule, typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process_1.default.env.DATABASE_HOST,
                port: 3306,
                username: process_1.default.env.DATATBASE_USERNAME,
                password: process_1.default.env.DATATBASE_PASSWORD,
                database: 'user',
                entities: [__dirname + '/**/*.entity{.ts, .js'],
                synchronize: process_1.default.env.DATATBASE_SYNCHRONIZE === 'true',
            }),],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map