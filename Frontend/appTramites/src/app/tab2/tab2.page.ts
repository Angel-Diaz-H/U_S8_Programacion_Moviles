import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  AlertController,
  IonButton,
  IonButtons,
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
import { add, arrowBack, create, trash } from 'ionicons/icons';
import { Carrera } from '../models/carrera.model';
import { CarreraService } from '../service/Carrera.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
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
export class Tab2Page implements OnInit {
  private readonly carreraService = inject(CarreraService);
  private readonly alertCtrl = inject(AlertController);
  private readonly toastCtrl = inject(ToastController);

  carreras: Carrera[] = [];
  cargando = false;
  error = '';

  constructor() {
    addIcons({ add, arrowBack, create, trash });
  }

  ngOnInit(): void {
    this.cargar();
  }

  recargar(event: RefresherCustomEvent): void {
    this.cargar(() => event.target.complete());
  }

  async abrirCrear(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Nueva carrera',
      inputs: [
        {
          name: 'descrip',
          type: 'text',
          placeholder: 'Descripcion',
        },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            const descrip = (data?.descrip ?? '').trim();
            if (!descrip) return false;
            this.crear(descrip);
            return true;
          },
        },
      ],
    });
    await alert.present();
  }

  async abrirEditar(carrera: Carrera, sliding: IonItemSliding): Promise<void> {
    await sliding.close();
    const alert = await this.alertCtrl.create({
      header: 'Editar carrera',
      inputs: [
        {
          name: 'descrip',
          type: 'text',
          value: carrera.descrip,
          placeholder: 'Descripcion',
        },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            const descrip = (data?.descrip ?? '').trim();
            if (!descrip) return false;
            this.actualizar(carrera.idCarrera, descrip);
            return true;
          },
        },
      ],
    });
    await alert.present();
  }

  async confirmarEliminar(carrera: Carrera, sliding: IonItemSliding): Promise<void> {
    await sliding.close();
    const alert = await this.alertCtrl.create({
      header: 'Eliminar carrera',
      message: `¿Seguro que quieres eliminar "${carrera.descrip}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => this.eliminar(carrera.idCarrera),
        },
      ],
    });
    await alert.present();
  }

  private crear(descrip: string): void {
    this.carreraService.crear({ descrip }).subscribe({
      next: (response) => {
        if (response.status) {
          this.mostrarToast('Carrera creada', 'success');
          this.cargar();
        } else {
          this.mostrarToast(response.msg || 'No se pudo crear la carrera', 'warning');
        }
      },
      error: () => this.mostrarToast('Error de conexion con el servidor', 'danger'),
    });
  }

  private actualizar(id: number, descrip: string): void {
    this.carreraService.actualizar(id, { descrip }).subscribe({
      next: (response) => {
        if (response.status) {
          this.mostrarToast('Carrera actualizada', 'success');
          this.cargar();
        } else {
          this.mostrarToast(response.msg || 'No se pudo actualizar', 'warning');
        }
      },
      error: () => this.mostrarToast('Error de conexion con el servidor', 'danger'),
    });
  }

  private eliminar(id: number): void {
    this.carreraService.eliminar(id).subscribe({
      next: (response) => {
        if (response.status) {
          this.mostrarToast('Carrera eliminada', 'success');
          this.cargar();
        } else {
          this.mostrarToast(response.msg || 'No se pudo eliminar', 'warning');
        }
      },
      error: () => this.mostrarToast('Error de conexion con el servidor', 'danger'),
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

    this.carreraService.obtenerTodas().subscribe({
      next: (response) => {
        if (response.status && response.value) {
          this.carreras = response.value;
        } else {
          this.error = response.msg || 'No se pudieron cargar las carreras';
          this.carreras = [];
        }
        this.cargando = false;
        onDone?.();
      },
      error: () => {
        this.error = 'Error de conexion con el servidor';
        this.carreras = [];
        this.cargando = false;
        onDone?.();
      },
    });
  }
}
