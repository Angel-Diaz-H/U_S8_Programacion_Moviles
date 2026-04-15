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
import { Tramite } from '../models/tramite.model';
import { TramiteService } from '../service/Tramite.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
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
export class Tab3Page implements OnInit {
  private readonly tramiteService = inject(TramiteService);
  private readonly alertCtrl = inject(AlertController);
  private readonly toastCtrl = inject(ToastController);

  tramites: Tramite[] = [];
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
      header: 'Nuevo trámite',
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

  async abrirEditar(tramite: Tramite, sliding: IonItemSliding): Promise<void> {
    await sliding.close();
    const alert = await this.alertCtrl.create({
      header: 'Editar trámite',
      inputs: [
        {
          name: 'descrip',
          type: 'text',
          value: tramite.descrip,
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
            this.actualizar(tramite.idTramite, descrip);
            return true;
          },
        },
      ],
    });
    await alert.present();
  }

  async confirmarEliminar(
    tramite: Tramite,
    sliding: IonItemSliding,
  ): Promise<void> {
    await sliding.close();
    const alert = await this.alertCtrl.create({
      header: 'Eliminar trámite',
      message: `¿Seguro que quieres eliminar "${tramite.descrip}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => this.eliminar(tramite.idTramite),
        },
      ],
    });
    await alert.present();
  }

  private crear(descrip: string): void {
    this.tramiteService.crear({ descrip }).subscribe({
      next: (response) => {
        if (response.status) {
          this.mostrarToast('Trámite creado', 'success');
          this.cargar();
        } else {
          this.mostrarToast(
            response.msg || 'No se pudo crear el trámite',
            'warning',
          );
        }
      },
      error: () =>
        this.mostrarToast('Error de conexion con el servidor', 'danger'),
    });
  }

  private actualizar(id: number, descrip: string): void {
    this.tramiteService.actualizar(id, { descrip }).subscribe({
      next: (response) => {
        if (response.status) {
          this.mostrarToast('Trámite actualizado', 'success');
          this.cargar();
        } else {
          this.mostrarToast(response.msg || 'No se pudo actualizar', 'warning');
        }
      },
      error: () =>
        this.mostrarToast('Error de conexion con el servidor', 'danger'),
    });
  }

  private eliminar(id: number): void {
    this.tramiteService.eliminar(id).subscribe({
      next: (response) => {
        if (response.status) {
          this.mostrarToast('Trámite eliminado', 'success');
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

    this.tramiteService.obtenerTodos().subscribe({
      next: (response) => {
        if (response.status && response.value) {
          this.tramites = response.value;
        } else {
          this.error = response.msg || 'No se pudieron cargar los trámites';
          this.tramites = [];
        }
        this.cargando = false;
        onDone?.();
      },
      error: () => {
        this.error = 'Error de conexion con el servidor';
        this.tramites = [];
        this.cargando = false;
        onDone?.();
      },
    });
  }
}
