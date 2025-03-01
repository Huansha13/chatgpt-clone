import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OpenaiService } from './service/openai.service';
import { MarkdownModule } from 'ngx-markdown';
import { finalize } from 'rxjs';

type TypeChat = 'OPEN_AI' | 'USER'
type Chats = {
  type: TypeChat,
  message: string
}

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    CommonModule,
    MarkdownModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('inputMss', { static: true }) inputMss!: ElementRef<HTMLInputElement>;
  version = 'V.1.1.0';
  title = 'Chat 🤖';
  today = new Date().getFullYear();
  chats: Chats[] = [];
  message: string = '';
  history: string = '';
  loadRespuesta = false;

  links = [
    { text: '¿Un CV o una carta de amor?', url: '#cv' },
    { text: '¡Hazme una oferta que no pueda rechazar!', url: '#contact' },
    { text: 'Inventos, locuras y algo de código', url: '#projects' },
    { text: 'Habilidades nivel jefe final', url: '#skills' },
    { text: 'Crónicas de un programador', url: '#experience' },
  ];

  footerLinks = [
    { text: 'Mi Portafolio', url: 'https://ingyfhl.netlify.app/' },
    { text: 'Mi GitHub', url: 'https://github.com/Huansha13' },
    { text: 'Mi LinkedIn', url: 'https://pe.linkedin.com/in/yefer-frank-huansha-leyva-5248a91ba' }
  ];

  constructor(private openaiService: OpenaiService) { }

  setChat(type: TypeChat, message: string): void {
    this.chats.push({ type, message });
  }

  sendMessage(): void {
    if (this.message && this.message.trim().length > 0) {
      this.setChat('USER', this.message.trim());

      this.loadRespuesta = true;
      if (this.chats.length > 0) {
        this.history = this.chats.slice(-50)
          .map(chat => `${chat.type === 'USER' ? 'Usuario' : 'Bot'}: ${chat.message}`)
          .join(' ');
      }

      const body = { 
        question: this.message.trim(), 
        history: this.history 
      };

      this.openaiService.magicloopsRun(body)
        .pipe(finalize(() => this.loadRespuesta = false))
        .subscribe({
          next: (rpt) => {
            const responseMessage = rpt || 'No tengo nada que decir en este momento. 😶';
            this.setChat('OPEN_AI', responseMessage);
            this.inputMss.nativeElement.focus();
          },
          error: (error) => {
            console.error('Error fetching response from OpenAI:', error);
            this.setChat('OPEN_AI', 'Sorry, there was an error processing your request.');
          }
        });

      this.message = '';
      this.inputMss.nativeElement.value = '';
    }
  }
}
