import { Component, OnInit } from "@angular/core";
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { ValidarCampos } from "src/app/helpers/ValidarCampos";
import { User } from "src/app/models/identity/User";
import { AccountService } from "src/app/services/account.service";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
})
export class RegistrationComponent implements OnInit {
  formulario!: FormGroup;
  user = {} as User;

  get f(): any {
    return this.formulario.controls;
  }

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private rota: Router,
    private toaster: ToastrService,
    private efeitoSpinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    this.validacao();
  }

  public validacao(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidarCampos.mustMatch("password", "confirmarPassword"),
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
        password: ["", [Validators.required, Validators.minLength(4)]],
        confirmarPassword: ["", Validators.required],
      },
      formOptions
    );
  }

  registerUser(): void {
    this.efeitoSpinner.show();
    this.user = { ...this.formulario.value }; // spread operator
    this.accountService.registerUser(this.user).subscribe(
      () => this.rota.navigateByUrl("/dashboard"),
      (error: any) => {
        this.efeitoSpinner.hide();
        this.toaster.error("Aconteceu algo de errado"), console.error(error);
      },
      () => this.efeitoSpinner.hide()
    );
  }
}
