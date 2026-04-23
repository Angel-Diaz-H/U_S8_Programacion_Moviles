export interface Alumno {
  matricula: number;
  nombre: string;
  correo: string;
  contra: string;
  idCarrera: number;
  isActivo: boolean;
  carreraDescrip?: string | null;
}

export interface CrearAlumnoDTO {
  nombre: string;
  correo: string;
  contra: string;
  idCarrera: number;
}

export interface ActualizarAlumnoDTO {
  nombre: string;
  correo: string;
  idCarrera: number;
  isActivo: boolean;
}
