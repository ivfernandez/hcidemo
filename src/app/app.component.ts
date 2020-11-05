import { CdkDragDrop, CdkDragExit, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Output } from '@angular/core';
import { Card } from './models/card.model';
import $ from 'jquery';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hci3demo';

  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker'
  ];

  //$: any;
  cardList : Card[] = [];
  @Output() cardSeleccionada: EventEmitter<string>;
  expandir : boolean = false;
  showModalGraficos: boolean = false;
  showModalOrdenarLista: boolean = false;
  dataGrafico : any;
  sePuedeMover : boolean = false;
  porcentajeCard : number = 0;
  _mostrarDetalleCard : boolean = false;
  prueba2 : string = '';

  /*private _mostrarDetalleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public mostrarDetalleObs: Observable<boolean> = this._mostrarDetalleSubject.asObservable();*/

  get mostrarDetalleCard(){
    return this._mostrarDetalleCard;
}

  set mostrarDetalleCard(mostrarDetalleCard){
    this._mostrarDetalleCard = mostrarDetalleCard;
}

  mouseDown : boolean = false;

  constructor() {
    this.cardSeleccionada = new EventEmitter();

    this.armarGraficoBarras();


   }

  ngOnInit(): void {

    //this.mostrarDetalleObs.subscribe(mostrar => this._mostrarDetalleCard = mostrar);

    this.cardList.push(new Card('Examen Físico'));
    this.cardList.push(new Card('Prueba 2'));
    this.cardList.push(new Card('Prueba 3'));
    this.cardList.push(new Card('Prueba 4'));

    /*INICIO-PRUEBAJQUERY*/ 
    var current_index = 0,
    index,
    menu,
    menu_items_count,
    mouse_down,
    mouse_start_y,
    pull_step,
    total_pull = 80,
    release = 40,
    pull_release = total_pull + release;

  $(document).ready(function () {

  $("#detallesTarjeta").hide();

  $("#menu li").each(function (i, e) {
    $(this).attr("data-index", i);
  });

  //
  menu = $("#menu").html();
  menu_items_count = $("#menu li").length;
  pull_step = total_pull / (menu_items_count - 1);

  //$("#menu").css("transform", "translate3d(" + getItemX(0) + "px,0,0)");
  $("#menu li").removeClass("show");
  $("#menu li").eq(0).addClass("show");
});

  $('#header').on('mousedown', (e) => {
  //
  mouse_down = true;
  this.mouseDown = true;
  mouse_start_y = e.pageY;
  //

  if (index == menu_items_count - 1) {
    index = 0;
  } else {
    var $item = $("#menu li").eq(index);
    $("#menu").html(menu);
    $("#menu li").eq($item.attr("data-index")).remove();
    $item.prependTo($("#menu"));
    $("#menu li").eq(0).addClass("show");
    $("#menu").addClass("notrans");
    //$("#menu").css("transform", "translate3d(" + getItemX(0) + "px,0,0)");
  }
});

$(document).mouseup(function (e) {
  if (mouse_down) {
    //
    mouse_down = false;
    this.mouseDown = false;
    //$("#menu").removeClass("show");
    //$(".pullmenu-icon").removeClass("hide");
  }
});

$(document).mousemove((e) => {

  $("#menu").removeClass("notrans");

  if (mouse_down) {
    var diff = Math.max(0, e.pageY - mouse_start_y);
    if (diff > pull_release)
      diff = pull_release + (diff - pull_release) / (diff * 0.01);

    $("#header").height(46 + diff);

    /*index = Math.max(
      0,
      Math.min(menu_items_count - 2, Math.floor((diff - release) / pull_step))
    );
    if (diff > pull_release + pull_step * 2) {
      index = menu_items_count - 1;
    }*/

    this.porcentajeCard = ($("#header").height() / 220 * 100) - 10;
    console.log(this.porcentajeCard);

    this.mostrarDetalleCard = $("#header").height() >= 150;
    console.log(this.mostrarDetalleCard);

    if($("#header").height() >= 150){
      $("#detallesTarjeta").show('slow');
      $("#menu").addClass('ulExpandido');
    } else
    {
      $("#detallesTarjeta").hide('slow');
    }


    //this._mostrarDetalleSubject.next($("#header").height() >= 150);

    if($("#header").height() >= 220) {
      this.showModalGraficos = true;
      colapsarTarjeta();
    }

    if (diff > release) {
      $("#menu").addClass("show");
    }

    /*if (diff > release) {
      $("#menu").addClass("show");
      $(".pullmenu-icon").addClass("hide");
    } else {
      $("#menu").removeClass("show");
      $(".pullmenu-icon").removeClass("hide");
    }*/

    /*$("#menu").css("transform", "translate3d(" + getItemX(index) + "px,0,0)");
    $("#menu li").removeClass("show");
    $("#menu li").eq(index).addClass("show");*/

    //$(".loader-icon").css("transform", "rotate(" + diff * 20 + "deg)");
  }
});

/*var getItemX = function (index) {
  var $item = $("#menu li").eq(index);
  var item_offset = $item.offset().left;
  var item_width = $item.outerWidth();
  var menu_offset = $("#menu").offset().left;
  var screen_width = $("#screen").width();
  return menu_offset - item_offset + (screen_width - item_width) / 2;
};*/

 let colapsarTarjeta = () => {
  this.porcentajeCard = 0;
  
  $("#header").animate({ height: 46 }, 300);

 }

    /*FIN-PRUEBAJQUERY*/

  }

  /*drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.cardList, event.previousIndex, event.currentIndex);
    //copyArrayItem(this.cardList, event.previousIndex, event.currentIndex);
    //console.log(event);
    //this.cardSeleccionada.emit(event);
  }*/
  
  prueba(event: CdkDragExit<string[]>) {
    console.log(event);
  }

  modalGraficos(){
    console.log('modal...');
    this.showModalGraficos = true;
  }

  modalOrdenarLista(){
    this.showModalOrdenarLista = true;
  }

  armarGraficoBarras() {
    this.dataGrafico = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
      datasets: [
          {
              label: 'My First dataset',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
              label: 'My Second dataset',
              backgroundColor: '#9CCC65',
              borderColor: '#7CB342',
              data: [28, 48, 40, 19, 86, 27, 90]
          }
      ]
    }
  }
  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

}
