import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  items: MenuItem[];

  guardar(){

    /*Swal.fire(
      'Perfecto!',
      'Sus cambios se han guardado con éxito',
      'success'
    )*/

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success ml-3',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: "No es posible deshacer esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, guardar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Perfecto!',
          'Sus cambios se han guardado con éxito',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Acción cancelada',
          'No se han guardado los cambios',
          'error'
        )
      }
    })

  }

    ngOnInit() {
        this.items = [
            {
                label: '',
                icon: 'pi pi-fw pi-bars',
                items: [{
                        label: 'Guardar', 
                        icon: 'fas fa-address-book',
                    },
                    {
                      label: 'Cerrar Atención', 
                      icon: 'pi pi-fw pi-window-minimize'
                  },
                  {
                    label: 'Dejar en Resolución', 
                    icon: 'pi pi-fw pi-circle-off'
                },
                {
                  label: 'Cancelar Atención', 
                  icon: 'pi pi-fw pi-times-circle'
              },
                ]
            }
        ];
    }

}
