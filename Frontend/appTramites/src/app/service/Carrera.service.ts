import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import {
  ActualizarCarreraDTO,
  Carrera,
  CrearCarreraDTO,
} from '../models/carrera.model';

@Injectable({
  providedIn: 'root',
})
export class CarreraService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.endpoint}Carrera`;

  obtenerTodas(): Observable<ApiResponse<Carrera[]>> {
    return this.http.get<ApiResponse<Carrera[]>>(`${this.baseUrl}/ObtenerTodas`);
  }

  obtenerPorId(id: number): Observable<ApiResponse<Carrera>> {
    return this.http.get<ApiResponse<Carrera>>(`${this.baseUrl}/ObtenerPorId/${id}`);
  }

  crear(dto: CrearCarreraDTO): Observable<ApiResponse<Carrera>> {
    return this.http.post<ApiResponse<Carrera>>(`${this.baseUrl}/Crear`, dto);
  }

  actualizar(id: number, dto: ActualizarCarreraDTO): Observable<ApiResponse<string>> {
    return this.http.put<ApiResponse<string>>(`${this.baseUrl}/Actualizar/${id}`, dto);
  }

  eliminar(id: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${this.baseUrl}/Eliminar/${id}`);
  }
}
