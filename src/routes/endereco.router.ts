import { Router } from "express";
import enderecoController from "../controller/endereco.controller";

class Routes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.post(
      "/",
      enderecoController.create
    );
  }
}

export const EnderecoRouter = () => {
  return new Routes().router;
};