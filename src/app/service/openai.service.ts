
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  private readonly apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = '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';

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
