import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContatosComponent } from "./components/contatos/contatos.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { EventosComponent } from "./components/eventos/eventos.component";
import { PalestrantesComponent } from "./components/palestrantes/palestrantes.component";
import { PerfilComponent } from "./components/perfil/perfil.component";

const routes: Routes = [
  { path: "eventos", component: EventosComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "palestrantes", component: PalestrantesComponent },
  { path: "perfil", component: PerfilComponent },
  { path: "contatos", component: ContatosComponent },
  { path: "", redirectTo: "dashboard", pathMatch: "full" }, // caso depois da barra seja vazio manda para dashboard
  { path: "**", redirectTo: "dashboard", pathMatch: "full" }, // caso depois da barra seja qualgo que não consta, manda para dashboard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
