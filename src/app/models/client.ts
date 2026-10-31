export interface Client {
  id: number;
  name: string;
  phone: string | null;
}

export interface CreateClientRequest {
  name: string;
  phone: string | null;
}

export interface UpdateClientRequest {
  name: string;
  phone: string | null;
}