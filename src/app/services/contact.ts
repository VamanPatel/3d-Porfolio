import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private http = inject(HttpClient);
  private googleAppUrl = 'https://script.google.com/macros/s/AKfycbwEBMzHe6UmDzCZ-BA6L1jkikeD6TsmGCxav4oWSC53oAjOEs43HdDX5mcps4JyKaBJHQ/exec';

  sendPost(data: Record<string, unknown>): Observable<unknown> {
    // Google Apps Script usually requires text/plain or application/x-www-form-urlencoded 
    // for simple POSTs if CORS is an issue, but standard JSON often works if the script handles it.
    // However, the user's snippet used JSON.stringify(data).
    return this.http.post(this.googleAppUrl, JSON.stringify(data), {
      headers: { 'Content-Type': 'text/plain;charset=utf-8' }
    });
  }
}
