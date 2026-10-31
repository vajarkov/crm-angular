import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import {
  Client,
  CreateClientRequest,
  UpdateClientRequest
} from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class Clients {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5066/api/clients';

  readonly clients = signal<Client[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  constructor() {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<Client[]>(this.apiUrl).subscribe({
      next: clients => {
        this.clients.set(clients);
        this.loading.set(false);
      },
      error: err => {
        console.error('Ошибка загрузки клиентов:', err);
        this.error.set('Не удалось загрузить список клиентов.');
        this.loading.set(false);
      }
    });
  }

  add(name: string, phone: string): void {
    const request: CreateClientRequest = {
      name,
      phone: phone || null
    };

    this.error.set(null);

    this.http.post<Client>(this.apiUrl, request).subscribe({
      next: client => {
        this.clients.update(clients => [...clients, client]);
      },
      error: err => {
        console.error('Ошибка создания клиента:', err);
        this.error.set(
          err.error?.title ?? 'Не удалось создать клиента.'
        );
      }
    });
  }

  update(id: number, name: string, phone: string): void {
    const request: UpdateClientRequest = {
      name,
      phone: phone || null
    };

    this.error.set(null);

    this.http.put<void>(`${this.apiUrl}/${id}`, request).subscribe({
      next: () => {
        this.clients.update(clients =>
          clients.map(client =>
            client.id === id
              ? { ...client, name, phone: phone || null }
              : client
          )
        );
      },
      error: err => {
        console.error('Ошибка обновления клиента:', err);
        this.error.set(
          err.error?.title ?? 'Не удалось обновить клиента.'
        );
      }
    });
  }
  
  delete(id: number): void {
    this.error.set(null);

    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.clients.update(clients =>
          clients.filter(client => client.id !== id)
        );
      },
      error: err => {
        console.error('Ошибка удаления клиента:', err);
        this.error.set('Не удалось удалить клиента.');
      }
    });
  }
}