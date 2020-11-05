import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import {CdkDragDrop, CdkDragEnd, CdkDragExit, copyArrayItem, moveItemInArray} from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {

  cardList : Card[] = [];
  @Output() cardSeleccionada: EventEmitter<string>;

  constructor() {
    this.cardSeleccionada = new EventEmitter();
   }

  ngOnInit(): void {
    this.cardList.push(new Card('Prueba 1'))
    this.cardList.push(new Card('Prueba 2'))
    this.cardList.push(new Card('Prueba 3'))
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.cardList, event.previousIndex, event.currentIndex);
    //copyArrayItem(this.cardList, event.previousIndex, event.currentIndex);
    //console.log(event);
    //this.cardSeleccionada.emit(event);
  }
  
  prueba(event: CdkDragExit<string[]>) {
    console.log(event);
  }

}
