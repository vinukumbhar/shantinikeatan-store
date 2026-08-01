// import { Injectable, OnModuleInit } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';
// import { PrismaPg } from '@prisma/adapter-pg';
// import { Pool } from 'pg';

// @Injectable()
// export class PrismaService extends PrismaClient implements OnModuleInit {
//   constructor() {
//     // 1. Create a native connection pool using your environment variable
//     const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    
//     // 2. Wrap it inside the PrismaPg driver adapter
//     const adapter = new PrismaPg(pool);

//     // 3. Pass the adapter to the parent PrismaClient constructor
//     super({ adapter });
//   }

//   async onModuleInit() {
//     await this.$connect();
//   }
// }
// import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';

// @Injectable()
// export class PrismaService
//   extends PrismaClient
//   implements OnModuleInit, OnModuleDestroy
// {
//   constructor() {
//     super({
//       log: ['query', 'info', 'warn', 'error'],
//     });
//   }

//   async onModuleInit() {
//     await this.$connect();
//     console.log('✅ Connected to PostgreSQL');
//   }

//   async onModuleDestroy() {
//     await this.$disconnect();
//   }
// }

import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    console.log('✅ Database Connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}