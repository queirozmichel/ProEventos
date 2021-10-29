import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
})
export class NavComponent implements OnInit {
  isCollapsed = true;
  constructor(private rota: Router) {}

  ngOnInit(): void {}

  mostrarMenu(): boolean {
    return this.rota.url != "/user/login";
  }
}
