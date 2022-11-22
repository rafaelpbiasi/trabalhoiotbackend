import { Request, Response } from "express";
import { Equal, getRepository } from "typeorm";
import { UsuarioEntity } from "../entity/usuario.entity";
import * as Yup from "yup"

class UsuarioController{

    public async login(req:Request, res:Response){
      try{
          const data = req.body
          const usuario = await getRepository(UsuarioEntity).findOne(
            {where: {email: data.email, senha: data.senha}}
          )

          if(usuario){
            res.status(200).send({usuario});
            return 
          }

          res.status(404).send({mensagem: "dados inválidos"});

      }catch (error) {
          res.status(500).send({ error});
      }
  }

    public async create(req:Request, res:Response){
        try{
            const data = req.body
            console.log(data)
            const schema = Yup.object().shape({
                senha: Yup.string().required("É obrigatorio"),
                email: Yup.string().email('e-mail não é válido').required("É obrigatorio"),
                telefone: Yup.string().required("É obrigatorio"),
              });
        
            //Valida Estrutura Json
            await schema.validate(data, {
              abortEarly: false,
            });

            const usuario = getRepository(UsuarioEntity).create(data)
            await getRepository(UsuarioEntity).save(usuario)
            
            res.status(201).send(usuario);
        }catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errorMessages = {};
                error.inner.forEach((err) => {
                  errorMessages[err.path] = err.message;
                });
                return res.status(400).send(errorMessages);
              } else {
                return res.status(500).send(error);
              }
        }
    }
}
export default new UsuarioController();