import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Comentario } from 'src/app/interfaces/comentario';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-agregar-editar-comentario',
  templateUrl: './agregar-editar-comentario.component.html',
  styleUrls: ['./agregar-editar-comentario.component.css']
})
export class AgregarEditarComentarioComponent implements OnInit {

  agregarComentario: FormGroup;
  accion='Agregar';
  id=0;
  comentario:Comentario | undefined;

  constructor(private fb: FormBuilder, 
    private _commentSvc: ComentarioService,
    private route: Router,
    private aRoute: ActivatedRoute,
    private toastr: ToastrService) 
    { 
      this.agregarComentario=this.fb.group({
        titulo:['',Validators.required],
        creador:['',Validators.required],
        texto:['',Validators.required]
    })
    this.id=+this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.esEditar();
  }

  esEditar(){
    if(this.id!=0){
      this.accion='Editar'
      this._commentSvc.getCommentId(this.id).subscribe(data=>{
        this.comentario=data;
        this.agregarComentario.patchValue({
          titulo:data.titulo,
          creador:data.creador,
          texto:data.texto
        })
      },err=>{
        console.log(err)
      })
    }
  }

  agregarOEditarComentario(){
    
    if(this.comentario == undefined){
      
      //Agregamos un nuevo comentario
      const comentario: Comentario={
        titulo:this.agregarComentario.get('titulo')?.value,
        creador:this.agregarComentario.get('creador')?.value,
        texto:this.agregarComentario.get('texto')?.value,
        fechaCreacion: new Date()
      }
  
      this._commentSvc.saveComment(comentario).subscribe(data=>{
        this.toastr.success('Comentario agregado con exito!','Comentario creado')
        this.route.navigate(['/']);
      },err=>{
        console.log(err);
      })
    }else{
      
      //Editamos un comentario
      const comentario: Comentario={
        id:this.comentario.id,
        titulo:this.agregarComentario.get('titulo')?.value,
        creador:this.agregarComentario.get('creador')?.value,
        texto:this.agregarComentario.get('texto')?.value,
        fechaCreacion: this.comentario.fechaCreacion
      }
      
      this._commentSvc.updateComment(this.id,comentario).subscribe(data=>{
        this.toastr.info('Comentario actualizado con exito!','Comentario actualizado')
        this.route.navigate(['/']);
      },err=>{
        console.log(err)
      })
    }
       
      
  }
}
