import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MERMAID_OPTIONS, provideMarkdown } from 'ngx-markdown';

import 'prismjs';  
import 'prismjs/components/prism-java'; // Java
import 'prismjs/components/prism-typescript'; // TypeScript
import 'prismjs/components/prism-python'; // Python (opcional)
import 'prismjs/themes/prism-tomorrow.css'; // Tema para colorear

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()), // Investigar
    provideMarkdown({
      mermaidOptions: {
        provide: MERMAID_OPTIONS,
        useValue: {
          darkMode: true,
          look: 'handDrawn'
        },
      },
    }),
  ]
};
