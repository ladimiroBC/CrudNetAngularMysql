import { Component, OnInit } from '@angular/core';
import { Comentario } from 'src/app/interfaces/comentario';

@Component({
  selector: 'app-listar-comentario',
  templateUrl: './listar-comentario.component.html',
  styleUrls: ['./listar-comentario.component.css']
})
export class ListarComentarioComponent implements OnInit {

  listarComentarios: Comentario[]=[
    {titulo:"Java", 
    creador:"James", 
    fechaCreacion:new Date(), 
    texto:"Orientado a objetos"
    },
    {titulo:"C#", 
    creador:"Anders", 
    fechaCreacion:new Date(), 
    texto:"Orientado a objetos"
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
