import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run test-app-2-remake:serve:development',
        production: 'nx run test-app-2-remake:serve:production',
      },
      ciWebServerCommand: 'nx run test-app-2-remake:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
