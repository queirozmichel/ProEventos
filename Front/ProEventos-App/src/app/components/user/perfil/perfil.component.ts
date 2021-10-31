import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidarCampos } from 'src/app/helpers/ValidarCampos';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  formulario!: FormGroup;

  get f(): any {
    return this.formulario.controls;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.validacao();
  }

  public validacao(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidarCampos.mustMatch("senha", "confirmarSenha"),
    };

    this.formulario = this.fb.group(
      {

        titulo: ["", Validators.required],
        primeiroNome: [
          "",
          [
            Validators.required,
            Validators.maxLength(15),
            Validators.minLength(3),
          ],
        ],
        ultimoNome: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        telefone: ["", Validators.required],
        funcao: ["", Validators.required],
        senha: ["", [Validators.required, Validators.minLength(6)]],
        confirmarSenha: ["", Validators.required],
      },
      formOptions
    );
  }

  public resetarForm(evento:any):void{
    evento.preventDefault();
    this.formulario.reset();
    }

}
