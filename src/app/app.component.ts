// Suggested code may be subject to a license. Learn more: ~LicenseLog:1651511760.
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OpenaiService } from './service/openai.service';

type TypeChat = 'OPEN_AI' | 'USER'
type Chats = {
  type: TypeChat,
  message: string
}

@Component({
  selector: 'app-root',
  imports:[
    FormsModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('inputMss', {static: true}) inputMss!: ElementRef<HTMLInputElement>;
  version = 'V.1.0.0';
  title = 'Chat';
  today = new Date().getFullYear();
  chats: Chats[] = [];
  message: string = '';

  links = [
    { text: 'Ver mi CV', url: '#cv' },
    { text: '¿Cómo puedo contactar contigo?', url: '#contact' },
    { text: 'Proyectos destacados', url: '#projects' },
    { text: '¿Qué habilidades tengo?', url: '#skills' },
    { text: 'Ver mis experiencias laborales', url: '#experience' },
  ];
  

  footerLinks = [
    { text: 'Mi Portafolio', url: 'https://ingyfhl.netlify.app/' },
    { text: 'Mi GitHub', url: 'https://github.com/Huansha13' },
    { text: 'Mi LinkedIn', url: 'https://pe.linkedin.com/in/yefer-frank-huansha-leyva-5248a91ba' }
  ];

  constructor(private openaiService: OpenaiService) {}

  setChat(type: TypeChat, message: string): void {
    this.chats.push({ type, message });
  }

  sendMessage(): void {
    if (this.message && this.message.trim().length > 0) {
      this.setChat('USER', this.message.trim());

      this.openaiService.generateText(this.message.trim())
        .subscribe({
          next: (data) => {
            const responseMessage = data.choices[0].message?.content?.trim() || '';
            this.setChat('OPEN_AI', responseMessage);
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
