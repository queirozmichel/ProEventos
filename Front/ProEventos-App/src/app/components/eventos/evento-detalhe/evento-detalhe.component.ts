import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-evento-detalhe",
  templateUrl: "./evento-detalhe.component.html",
  styleUrls: ["./evento-detalhe.component.scss"],
})
export class EventoDetalheComponent implements OnInit {
  
  formulario!: FormGroup;

  get f(): any {
    return this.formulario.controls;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validacao();
  }

  public validacao(): void {
    this.formulario = this.fb.group({
      tema: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      local: ["", Validators.required],
      dataEvento: ["", Validators.required],
      qtdPessoas: ["", [Validators.required, Validators.max(120000)]],
      telefone: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      imagemURL: ["", Validators.required],
    });
  }

  public resetarForm():void{
  this.formulario.reset();
  }
}
