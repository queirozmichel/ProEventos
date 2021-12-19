import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { map } from "rxjs/internal/operators/map";
import { debounceTime, tap } from "rxjs/operators";
import { Palestrante } from "src/app/models/Palestrante";
import { PalestranteService } from "src/app/services/palestrante.service";

@Component({
  selector: "app-palestrante-detalhe",
  templateUrl: "./palestrante-detalhe.component.html",
  styleUrls: ["./palestrante-detalhe.component.scss"],
})
export class PalestranteDetalheComponent implements OnInit {
  public formulario!: FormGroup;
  public situacaoDoForm = "";
  public corDaDescricao = "";

  constructor(
    private fb: FormBuilder,
    public palestranteService: PalestranteService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.validation();
    this.verificaForm();
    this.carregarPalestrante();
  }

  private validation(): void {
    this.formulario = this.fb.group({ miniCurriculo: [""] });
  }

  public get f(): any {
    return this.formulario.controls;
  }

  private verificaForm(): void {
    this.formulario.valueChanges
      .pipe(
        map(() => {
          this.situacaoDoForm = "Minicurrículo está sendo atualizado!";
          this.corDaDescricao = "text-warning";
        }),
        debounceTime(1000),
        tap(() => this.spinner.show())
      )
      .subscribe(() => {
        this.palestranteService
          .putPalestrante({ ...this.formulario.value })
          .subscribe(
            () => {
              this.situacaoDoForm = "Minicurrículo foi atualizado!";
              this.corDaDescricao = "text-success";

              setTimeout(() => {
                this.situacaoDoForm = "Minicurrículo foi carregado!";
                this.corDaDescricao = "text-muted";
              }, 2000);
            },
            () => {
              this.toastr.error(
                "Erro ao tentar atualizar o minicurriculo",
                "Erro"
              );
            }
          )
          .add(() => this.spinner.hide());
      });
  }
  private carregarPalestrante(): void {
    this.spinner.show();
    this.palestranteService.getPalestrante().subscribe(
      (palestrante: Palestrante) => {
        this.formulario.patchValue(palestrante);
      },
      (error: any) => {
        this.toastr.error("Erro ao carregar o palestrante", "Erro");
      }
    );
  }
}
