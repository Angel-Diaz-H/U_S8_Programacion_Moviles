import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import {
  ActualizarTramiteDTO,
  Tramite,
  CrearTramiteDTO,
} from '../models/tramite.model';

@Injectable({
  providedIn: 'root',
})
export class TramiteService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.endpoint}Tramite`;

  obtenerTodos(): Observable<ApiResponse<Tramite[]>> {
    return this.http.get<ApiResponse<Tramite[]>>(
      `${this.baseUrl}/ObtenerTodos`,
    );
  }

  obtenerPorId(id: number): Observable<ApiResponse<Tramite>> {
    return this.http.get<ApiResponse<Tramite>>(
      `${this.baseUrl}/ObtenerPorId/${id}`,
    );
  }

  crear(dto: CrearTramiteDTO): Observable<ApiResponse<Tramite>> {
    return this.http.post<ApiResponse<Tramite>>(`${this.baseUrl}/Crear`, dto);
  }

  actualizar(
    id: number,
    dto: ActualizarTramiteDTO,
  ): Observable<ApiResponse<string>> {
    return this.http.put<ApiResponse<string>>(
      `${this.baseUrl}/Actualizar/${id}`,
      dto,
    );
  }

  eliminar(id: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(
      `${this.baseUrl}/Eliminar/${id}`,
    );
  }
}
