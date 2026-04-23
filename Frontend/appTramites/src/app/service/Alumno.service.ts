import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import {
  ActualizarAlumnoDTO,
  Alumno,
  CrearAlumnoDTO,
} from '../models/alumno.model';

@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.endpoint}Alumno`;

  obtenerTodos(): Observable<ApiResponse<Alumno[]>> {
    return this.http.get<ApiResponse<Alumno[]>>(`${this.baseUrl}/ObtenerTodos`);
  }

  obtenerPorMatricula(matricula: number): Observable<ApiResponse<Alumno>> {
    return this.http.get<ApiResponse<Alumno>>(
      `${this.baseUrl}/ObtenerPorMatricula/${matricula}`,
    );
  }

  crear(dto: CrearAlumnoDTO): Observable<ApiResponse<Alumno>> {
    return this.http.post<ApiResponse<Alumno>>(`${this.baseUrl}/Crear`, dto);
  }

  actualizar(
    matricula: number,
    dto: ActualizarAlumnoDTO,
  ): Observable<ApiResponse<string>> {
    return this.http.put<ApiResponse<string>>(
      `${this.baseUrl}/Actualizar/${matricula}`,
      dto,
    );
  }

  eliminar(matricula: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(
      `${this.baseUrl}/Eliminar/${matricula}`,
    );
  }
}
