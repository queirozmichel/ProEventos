import { Component, OnInit } from "@angular/core";
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ValidarCampos } from "src/app/helpers/ValidarCampos";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
})
export class RegistrationComponent implements OnInit {
  formulario!: FormGroup;

  get f(): any {
    return this.formulario.controls;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validacao();
  }

  public validacao(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidarCampos.mustMatch("senha", "confirmarSenha"),
    };

    this.formulario = this.fb.group(
      {
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
        userName: ["", Validators.required],
        senha: ["", [Validators.required, Validators.minLength(6)]],
        confirmarSenha: ["", Validators.required],
      },
      formOptions
    );
  }
}
