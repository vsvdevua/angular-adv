import { Component, ChangeDetectorRef } from '@angular/core';
import { BoxComponent } from './box/box.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentBox: BoxComponent = null;
  offsetY: number;
  offsetX: number;
  boxes = [];
  size = 10000;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    for (let i = 0; i < this.size; i++) {
      let randX = Math.floor((Math.random() * 1000) + 1);
      let randY = Math.floor((Math.random() * 1000) + 1);
      this.boxes[i] = { x: randX, y: randY, num: i };
    }
  }

  ngAfterViewInit() {
    this.cdr.detach();
  }

  onMouseMove(event) {
    event.preventDefault();
    if (this.currentBox !== null) {
      this.updateBox(this.currentBox, event.clientX + this.offsetX, event.clientY + this.offsetY);
    }
  }

  onMouseUp(event) {
    if (this.currentBox) {
      this.currentBox.selected = false;
      this.currentBox.update();
    }
    this.currentBox = null;
  }

  onMouseDown(event) {
    const box = <BoxComponent>event.target["BoxComponent"];

    this.offsetX = box.x - event.clientX;
    this.offsetY = box.y - event.clientY;

    this.currentBox = box;

    box.selected = true;
    box.update();
  }

  updateBox(box: BoxComponent, x: number, y: number) {
    box.x = x;
    box.y = y;
    box.update();
  }
}
