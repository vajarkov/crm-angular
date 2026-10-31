import { Component, input, output, OnInit } from '@angular/core';
import { Client } from '../../models/client';

@Component({
  selector: 'app-client-card',
  imports: [],
  templateUrl: './client-card.html',
  styleUrl: './client-card.css'
})
export class ClientCard {
  ngOnInit() {
    console.log('Карточка клиента создана:', this.client().name);
  }
  client = input.required<Client>();

  delete = output<number>();
}