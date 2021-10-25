import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { EventosComponent } from "./components/eventos/eventos.component";
import { PalestrantesComponent } from "./components/palestrantes/palestrantes.component";
import { NavComponent } from "./shared/nav/nav.component";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { ModalModule } from 'ngx-bootstrap/modal'
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { EventoService } from "./services/evento.service";
import { FormatarDataHoraPipe } from "./helpers/FormatarDataHora.pipe";
import { ContatosComponent } from "./components/contatos/contatos.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { PerfilComponent } from "./components/perfil/perfil.component";
import { TituloComponent } from "./shared/titulo/titulo.component";

@NgModule({
  declarations: [
    AppComponent,
    EventosComponent,
    PalestrantesComponent,
    ContatosComponent,
    DashboardComponent,
    PerfilComponent,
    TituloComponent,
    NavComponent,
    FormatarDataHoraPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
    }),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxSpinnerModule,
  ],
  providers: [EventoService], //injeção
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
