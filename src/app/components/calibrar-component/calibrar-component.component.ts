import { Component, OnInit } from '@angular/core';
import { ToolbarService } from '../../services/ToolbarService';

@Component({
  selector: 'app-calibrar-component',
  templateUrl: './calibrar-component.component.html',
  styleUrls: ['./calibrar-component.component.css'],
})
export class CalibrarComponentComponent implements OnInit {



  constructor(private toolbar: ToolbarService) { }


  ngOnInit() { this.toolbar.setChangeToolbar("accent"); }

}
