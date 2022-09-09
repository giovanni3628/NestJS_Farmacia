import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarefa } from './tarefa/entities/tarefa.entity';
import { TarefaModule } from './tarefa/modules/tarefa.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '@Logitech1',
      database: 'db_todolist',
      entities: [Tarefa],
      synchronize: true
    }),
    TarefaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
