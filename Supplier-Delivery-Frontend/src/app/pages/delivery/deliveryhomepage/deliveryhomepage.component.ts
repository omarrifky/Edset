import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deliveryhomepage',
  templateUrl: './deliveryhomepage.component.html',
  styleUrls: ['./deliveryhomepage.component.scss']
})
export class DeliveryhomepageComponent implements OnInit {
  selectedTable:string = "all"
  constructor() { }

  ngOnInit(): void {
  }
  changeTable(table:string){
    this.selectedTable = table;
  }

}
