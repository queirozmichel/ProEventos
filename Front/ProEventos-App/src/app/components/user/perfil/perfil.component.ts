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
import { environment } from "src/environments/environment";

@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.component.html",
  styleUrls: ["./perfil.component.scss"],
})
export class PerfilComponent implements OnInit {
  usuario = {} as UserUpdate;
  public file: File;
  public imagemURL = "";
  public get ehPalestrante(): boolean {
    return this.usuario.funcao == "Palestrante";
  }

  constructor(
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private accountService: AccountService
  ) {}

  ngOnInit() {}

  public setFormValue(usuario: UserUpdate): void {
    this.usuario = usuario;
    if (this.usuario.imagemURL) {
      this.imagemURL =
        environment.apiURL + `resources/perfil/${this.usuario.imagemURL}`;
    } else {
      this.imagemURL = "./assets/usuario.png";
    }
  }

  public onFileChange(ev: any): void {
    const reader = new FileReader();
    reader.onload = (evento: any) => (this.imagemURL = evento.target.result);
    this.file = ev.target.files;
    reader.readAsDataURL(this.file[0]);
    this.uploadImagem();
  }

  private uploadImagem(): void {
    this.spinner.show();
    this.accountService
      .postUpload(this.file)
      .subscribe(
        () => this.toaster.success("Imagem atualizada", "Sucesso"),
        (error: any) => {
          this.toaster.error("Erro ao fazer o upload de imagem", "Erro");
          console.error(error);
        }
      )
      .add(() => this.spinner.hide());
  }
}
