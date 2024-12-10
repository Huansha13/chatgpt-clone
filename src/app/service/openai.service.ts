
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  private readonly apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = '';

  constructor(private http: HttpClient) { }

  generateText(prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 150, 
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
