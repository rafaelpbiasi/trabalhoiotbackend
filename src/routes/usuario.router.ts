import { Router } from "express";
import usuarioController from "../controller/usuario.controller";

class Routes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.post(
      "/",
      usuarioController.create
    );
    this.router.post(
      "/login",
      usuarioController.login
    );
  }
}

export const UsuarioRouter = () => {
  return new Routes().router;
};