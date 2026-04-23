import { Component, OnInit, inject } from '@angular/core';
import {
  AlertController,
  IonContent,
  ToastController,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
  RefresherCustomEvent,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, create, trash } from 'ionicons/icons';
import {
  ActualizarAlumnoDTO,
  Alumno,
  CrearAlumnoDTO,
} from '../models/alumno.model';
import { AlumnoService } from '../service/Alumno.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonLabel,
    IonSpinner,
    IonText,
    IonRefresher,
    IonRefresherContent,
    IonFab,
    IonFabButton,
    IonIcon,
  ],
})
export class Tab1Page implements OnInit {
  private readonly alumnoService = inject(AlumnoService);
  private readonly alertCtrl = inject(AlertController);
  private readonly toastCtrl = inject(ToastController);

  alumnos: Alumno[] = [];
  cargando = false;
  error = '';

  constructor() {
    addIcons({ add, create, trash });
  }

  ngOnInit(): void {
    this.cargar();
  }

  recargar(event: RefresherCustomEvent): void {
    this.cargar(() => event.target.complete());
  }

  async abrirCrear(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Nuevo alumno',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre',
        },
        {
          name: 'correo',
          type: 'email',
          placeholder: 'Correo',
        },
        {
          name: 'contra',
          type: 'password',
          placeholder: 'Contrasena',
        },
        {
          name: 'idCarrera',
          type: 'number',
          placeholder: 'ID de carrera',
        },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            const dto = this.mapearCrearDTO(data);
            if (!dto) {
              this.mostrarToast('Completa todos los campos validos', 'warning');
              return false;
            }
            this.crear(dto);
            return true;
          },
        },
      ],
    });
    await alert.present();
  }

  async abrirEditar(alumno: Alumno, sliding: IonItemSliding): Promise<void> {
    await sliding.close();
    const alert = await this.alertCtrl.create({
      header: 'Editar alumno',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          value: alumno.nombre,
          placeholder: 'Nombre',
        },
        {
          name: 'correo',
          type: 'email',
          value: alumno.correo,
          placeholder: 'Correo',
        },
        {
          name: 'idCarrera',
          type: 'number',
          value: alumno.idCarrera,
          placeholder: 'ID de carrera',
        },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            const dto = this.mapearActualizarDTO(data, alumno.isActivo);
            if (!dto) {
              this.mostrarToast('Completa todos los campos validos', 'warning');
              return false;
            }
            this.actualizar(alumno.matricula, dto);
            return true;
          },
        },
      ],
    });
    await alert.present();
  }

  async confirmarEliminar(
    alumno: Alumno,
    sliding: IonItemSliding,
  ): Promise<void> {
    await sliding.close();
    const alert = await this.alertCtrl.create({
      header: 'Eliminar alumno',
      message: `¿Seguro que quieres eliminar a "${alumno.nombre}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => this.eliminar(alumno.matricula),
        },
      ],
    });
    await alert.present();
  }

  private mapearCrearDTO(data: any): CrearAlumnoDTO | null {
    const nombre = (data?.nombre ?? '').trim();
    const correo = (data?.correo ?? '').trim();
    const contra = (data?.contra ?? '').trim();
    const idCarrera = Number(data?.idCarrera);

    if (
      !nombre ||
      !correo ||
      !contra ||
      !Number.isInteger(idCarrera) ||
      idCarrera <= 0
    ) {
      return null;
    }

    return { nombre, correo, contra, idCarrera };
  }

  private mapearActualizarDTO(
    data: any,
    isActivo: boolean,
  ): ActualizarAlumnoDTO | null {
    const nombre = (data?.nombre ?? '').trim();
    const correo = (data?.correo ?? '').trim();
    const idCarrera = Number(data?.idCarrera);

    if (!nombre || !correo || !Number.isInteger(idCarrera) || idCarrera <= 0) {
      return null;
    }

    return { nombre, correo, idCarrera, isActivo };
  }

  private crear(dto: CrearAlumnoDTO): void {
    this.alumnoService.crear(dto).subscribe({
      next: (response) => {
        if (response.status) {
          this.mostrarToast('Alumno creado', 'success');
          this.cargar();
        } else {
          this.mostrarToast(
            response.msg || 'No se pudo crear el alumno',
            'warning',
          );
        }
      },
      error: () =>
        this.mostrarToast('Error de conexion con el servidor', 'danger'),
    });
  }

  private actualizar(matricula: number, dto: ActualizarAlumnoDTO): void {
    this.alumnoService.actualizar(matricula, dto).subscribe({
      next: (response) => {
        if (response.status) {
          this.mostrarToast('Alumno actualizado', 'success');
          this.cargar();
        } else {
          this.mostrarToast(response.msg || 'No se pudo actualizar', 'warning');
        }
      },
      error: () =>
        this.mostrarToast('Error de conexion con el servidor', 'danger'),
    });
  }

  private eliminar(matricula: number): void {
    this.alumnoService.eliminar(matricula).subscribe({
      next: (response) => {
        if (response.status) {
          this.mostrarToast('Alumno eliminado', 'success');
          this.cargar();
        } else {
          this.mostrarToast(response.msg || 'No se pudo eliminar', 'warning');
        }
      },
      error: () =>
        this.mostrarToast('Error de conexion con el servidor', 'danger'),
    });
  }

  private async mostrarToast(
    msg: string,
    color: 'success' | 'warning' | 'danger' = 'success',
  ): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2500,
      position: 'bottom',
      color,
    });
    await toast.present();
  }

  private cargar(onDone?: () => void): void {
    this.cargando = true;
    this.error = '';

    this.alumnoService.obtenerTodos().subscribe({
      next: (response) => {
        if (response.status && response.value) {
          this.alumnos = response.value;
        } else {
          this.error = response.msg || 'No se pudieron cargar los alumnos';
          this.alumnos = [];
        }
        this.cargando = false;
        onDone?.();
      },
      error: () => {
        this.error = 'Error de conexion con el servidor';
        this.alumnos = [];
        this.cargando = false;
        onDone?.();
      },
    });
  }
}
