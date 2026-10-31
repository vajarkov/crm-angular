import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Client } from '../../models/client';

@Component({
  selector: 'app-client-card',
  imports: [FormsModule],
  templateUrl: './client-card.html',
  styleUrl: './client-card.css'
})
export class ClientCard {
  client = input.required<Client>();

  delete = output<number>();

  update = output<{
    id: number;
    name: string;
    phone: string;
  }>();

  editing = false;
  editName = '';
  editPhone = '';

  startEditing(): void {
    this.editName = this.client().name;
    this.editPhone = this.client().phone ?? '';
    this.editing = true;
  }

  cancelEditing(): void {
    this.editing = false;
  }

  save(): void {
    const name = this.editName.trim();

    if (!name) {
      return;
    }

    this.update.emit({
      id: this.client().id,
      name,
      phone: this.editPhone.trim()
    });

    this.editing = false;
  }
}