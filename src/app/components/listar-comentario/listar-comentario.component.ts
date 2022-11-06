import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Comentario } from 'src/app/interfaces/comentario';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-listar-comentario',
  templateUrl: './listar-comentario.component.html',
  styleUrls: ['./listar-comentario.component.css']
})
export class ListarComentarioComponent implements OnInit {

  listarComentarios: Comentario[]=[]

  constructor(private _commentSvc:ComentarioService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getComment();
  }

  getComment(){
    this._commentSvc.getListComment().subscribe(data=>{
      this.listarComentarios=data;
    },err=>{
      console.log(err);
    })
  }

  eliminarComentario(id:any){
    console.log(id);
    this._commentSvc.deleteComment(id).subscribe(data=>{
      this.getComment();
      this.toastr.error('El comentario fue eliminado!','Registro eliminado')
    },err=>{
      console.log(err)
    })    
  }

}
