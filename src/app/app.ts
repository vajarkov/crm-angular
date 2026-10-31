import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Clients } from './services/clients';
import { ClientCard } from './components/client-card/client-card';

@Component({
  selector: 'app-root',
  imports: [FormsModule, ClientCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly clientsService = inject(Clients);

  protected newName = '';
  protected newPhone = '';

  protected addClient(): void {
    const name = this.newName.trim();

    if (!name) return;

    this.clientsService.add(
      name,
      this.newPhone.trim()
    );

    this.newName = '';
    this.newPhone = '';
  }

  protected deleteClient(id: number): void {
    this.clientsService.delete(id);
  }

  protected updateClient(event: {
    id: number;
    name: string;
    phone: string;
  }): void {
    this.clientsService.update(
      event.id,
      event.name,
      event.phone
    );
  }
}