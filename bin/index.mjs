#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const program = new Command();

program
  .version('1.0.0')
  .description('CLI tool to generate Node.js with Express, Typescript, BullMQ and Redis API project structure')
  .action(() => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'Project name:',
        },
      ])
      .then((answers) => {
        const projectPath = path.join(process.cwd(), answers.projectName);
        if (!fs.existsSync(projectPath)) {
          fs.mkdirSync(projectPath, { recursive: true });
        }

        const folders = [
          'src',
          'src/api',
          'src/api/controllers',
          'src/api/controllers/user',
          'src/api/models',
          'src/api/routes',
          'src/api/services',
          'src/api/services/user',
          'src/api/utils',
          'src/api/utils/middleware',
          'src/api/utils/validations',
          'src/config',
          'src/@types',
          'src/prisma'
        ];
        folders.forEach((folder) => {
          fs.mkdirSync(path.join(projectPath, folder), { recursive: true });
        });

        const files = {
          'src/@types/custom-types.d.ts': '../templates/@types/custom-types.d.ts',
          'src/@types/ServiceResponse.ts': '../templates/@types/ServiceResponse.ts',
          'src/app.ts': '../templates/app.ts',
          'src/api/routes/user.routes.ts': '../templates/api/routes/user.routes.ts',
          'src/api/controllers/user/user.command.controller.ts': '../templates/api/controllers/user/user.command.controller.ts',
          'src/api/controllers/user/user.query.controller.ts': '../templates/api/controllers/user/user.query.controller.ts',
          'src/api/models/user.model.ts': '../templates/api/models/user.model.ts',
          'src/api/services/user/user.command.service.ts': '../templates/api/services/user/user.command.service.ts',
          'src/api/services/user/user.query.service.ts': '../templates/api/services/user/user.query.service.ts',
          'src/config/bullmq.ts': '../templates/config/bullmq.ts',
          'src/api/utils/middleware/auth.ts': '../templates/api/utils/middleware/auth.ts',
          'src/api/utils/validations/user.validations.ts': '../templates/api/utils/validations/user.validations.ts',
          'tsconfig.json': '../templates/tsconfig.json',
          'package.json': '../templates/package.json',
          '.gitignore': '../templates/.gitignore',
          'README.md': '../templates/README.md',
          '.env.example': '../templates/.env.example',
          'src/prisma/schema.prisma': '../templates/prisma/schema.prisma',
        };

        Object.keys(files).forEach((file) => {
          const src = path.join(__dirname, files[file]);
          const dest = path.join(projectPath, file);
          fs.copyFileSync(src, dest);
        });

        console.log(`Project ${answers.projectName} created successfully!`);
      });
  });

program.parse(process.argv);
