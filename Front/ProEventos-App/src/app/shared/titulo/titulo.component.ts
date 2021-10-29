import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.scss']
})
export class TituloComponent implements OnInit {

  @Input() titulo : string = '';
  @Input() icone = "fa fa-user";
  @Input() subtitulo = "Desde 2021";
  @Input() botaoListar = false;

  constructor(private rota: Router) { }

  ngOnInit() {
  }

  listar() : void{
    this.rota.navigate([`/${this.titulo.toLocaleLowerCase()}/lista`])
  }

}
