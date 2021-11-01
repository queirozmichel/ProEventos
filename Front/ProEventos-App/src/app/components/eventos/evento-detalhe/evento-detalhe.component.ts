import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { NgxSpinner, NgxSpinnerService, Spinner } from "ngx-spinner";

import { ToastrService } from "ngx-toastr";
import { Evento } from "src/app/models/Evento";
import { EventoService } from "src/app/services/evento.service";

@Component({
  selector: "app-evento-detalhe",
  templateUrl: "./evento-detalhe.component.html",
  styleUrls: ["./evento-detalhe.component.scss"],
})
export class EventoDetalheComponent implements OnInit {
  formulario!: FormGroup;
  evento = {} as Evento; //cria variável passando um objeto vazio
  novoEventoOuSalvarVelho = "post";

  get f(): any {
    return this.formulario.controls;
  }

  bsConfig(): any {
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: "DD/MM/YYYY hh:mm a",
      containerClass: "theme-default",
      showWeekNumbers: false,
    };
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private rota: ActivatedRoute,
    private eventoService: EventoService,
    private efeitoToaster: ToastrService,
    private efeitoSpinner: NgxSpinnerService
  ) {
    this.localeService.use("pt-br");
  }

  public carregarEvento(): any {
    const eventoIdParam = this.rota.snapshot.paramMap.get("id");
    if (eventoIdParam != null) {
      this.novoEventoOuSalvarVelho = "put";
      this.eventoService.getEventoById(+eventoIdParam).subscribe({
        next: (evento: Evento) => {
          this.evento = { ...evento }; //...spread
          this.formulario.patchValue(this.evento);
        },
        error: (error: any) => {
          this.efeitoToaster.error("Erro ao tentar carregar o evento!");
          console.error(error);
        },
        complete: () => {},
      });
    }
  }

  ngOnInit(): void {
    this.validacao();
    this.carregarEvento();
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

  public resetarForm(): void {
    this.formulario.reset();
  }

  public cssValidacao(campo: FormControl): any {
    return { "is-invalid": campo.errors && campo.touched };
  }

  public salvarAlteracao(): void {
    this.efeitoSpinner.show();
    if (this.formulario.valid) {
      

      if (this.novoEventoOuSalvarVelho == "post") {
        this.evento = { ...this.formulario.value };
        this.eventoService.postEvento(this.evento).subscribe({
          next: () =>
            this.efeitoToaster.success("Evento salvo com sucesso!", "Sucesso!"),
          error: (error: any) => {
            console.error(error);
            this.efeitoSpinner.hide();
            this.efeitoToaster.error(
              "Ocorre um erro ao tentar salvar o evento!",
              "Erro!"
            );
          },
          complete: () => this.efeitoSpinner.hide(),
        });
      } else {
        this.evento = {id: this.evento.id, ...this.formulario.value };
        this.eventoService.putEvento(this.evento.id, this.evento).subscribe({
          next: () =>
            this.efeitoToaster.success("Evento salvo com sucesso!", "Sucesso!"),
          error: (error: any) => {
            console.error(error);
            this.efeitoSpinner.hide();
            this.efeitoToaster.error(
              "Ocorre um erro ao tentar salvar o evento!",
              "Erro!"
            );
          },
          complete: () => this.efeitoSpinner.hide(),
        });
      }
    }
  }
}
