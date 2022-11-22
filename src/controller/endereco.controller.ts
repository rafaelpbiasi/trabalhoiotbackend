import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { EnderecoEntity } from "../entity/endereco.entity";
import * as Yup from "yup"

class EntregaController{
    public async create(req:Request, res:Response){
        try{
            const data = req.body
            const schema = Yup.object().shape({
                bairro: Yup.string().required("É obrigatorio"),
                rua: Yup.string().required("É obrigatorio"),
                cidade: Yup.string().required("É obrigatorio"),
                estado: Yup.string().required("É obrigatorio"),
                pais: Yup.string().required("É obrigatorio"),
              });
        
            //Valida Estrutura Json
            await schema.validate(data, {
              abortEarly: false,
            });

            const endereco = getRepository(EnderecoEntity).create(data)
            await getRepository(EnderecoEntity).save(endereco)

            res.status(201).send(endereco);
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
export default new EntregaController();