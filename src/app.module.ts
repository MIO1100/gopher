import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ManagerModule } from './manager/manager.module';

import { ManagerController } from './manager/manager.controller';
import { SecretModule } from './secret/secret.module';

@Module({
  imports: [AuthModule, UsersModule, ManagerModule, SecretModule],
  controllers: [AppController, ManagerController],
  providers: [AppService],
})
export class AppModule {}
