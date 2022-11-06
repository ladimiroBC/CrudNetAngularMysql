import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comentario } from 'src/app/interfaces/comentario';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-ver-comentario',
  templateUrl: './ver-comentario.component.html',
  styleUrls: ['./ver-comentario.component.css']
})
export class VerComentarioComponent implements OnInit {

  id:number;
  comentario:Comentario | undefined;

  constructor(private aRoute: ActivatedRoute, private _commentSvc: ComentarioService) { 
    this.aRoute.snapshot.paramMap.get('id');
    //Aca estamos invalidado valores tipo null o undefined
    this.id=+this.aRoute.snapshot.paramMap.get('id')!;

  }

  ngOnInit(): void {
    this.getCommentId();
  }

  getCommentId(){
    this._commentSvc.getCommentId(this.id).subscribe(data=>{
      this.comentario=data;
    })
  }
}
