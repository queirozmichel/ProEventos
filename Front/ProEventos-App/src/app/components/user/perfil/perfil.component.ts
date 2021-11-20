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
import { UserUpdate } from "src/app/models/identity/UserUpdate";
import { AccountService } from "src/app/services/account.service";

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.component.html",
  styleUrls: ["./perfil.component.scss"],
})
export class PerfilComponent implements OnInit {
  userUpdate = {} as UserUpdate;
  formulario!: FormGroup;

  get f(): any {
    return this.formulario.controls;
  }

  constructor(
    private fb: FormBuilder,
    public accountService: AccountService,
    private rota: Router,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.validacao();
    this.carregarUsuario();
  }

  private carregarUsuario(): void {
    this.accountService.getUser().subscribe(
      (userRetorno: UserUpdate) => {
        console.log(userRetorno);
        this.userUpdate = userRetorno;
        this.formulario.patchValue(this.userUpdate);
        this.toaster.success("Usuário Carregado!", "Sucesso");
      },
      (error) => {
        console.error(error);
        this.toaster.error("Usuário não Carregado!", "Erro");
        this.rota.navigate(["/dashboard"]);
      },
      () => {}
    );
  }

  public validacao(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidarCampos.mustMatch("password", "confirmarPassword"),
    };

    this.formulario = this.fb.group(
      {
        userName:[""],
        titulo: ["NaoInformado", Validators.required],
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
        phoneNumber: ["", Validators.required],
        descricao: ["", Validators.required],
        funcao: ["NaoInformado", Validators.required],
        password: ["", [Validators.required, Validators.minLength(4)]],
        confirmarPassword: ["", Validators.nullValidator],
      },
      formOptions
    );
  }

  onSubmit(): void {
    this.atualizarUsuario();
  }

  public atualizarUsuario() {
    this.userUpdate = { ...this.formulario.value };
    this.spinner.show();
    this.accountService.updateUser(this.userUpdate).subscribe({
      next: () => this.toaster.success("Usuário atualizado", "Sucesso"),
      error: (error: any) => {
        console.error(error);
        this.spinner.hide();
        this.toaster.error(error.error);
      },
      complete: () => this.spinner.hide(),
    });
  }

  public resetarForm(evento: any): void {
    evento.preventDefault();
    this.formulario.reset();
  }
}
