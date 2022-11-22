import {PrimaryGeneratedColumn, Column, Entity, OneToOne} from 'typeorm'
import { EnderecoEntity } from './endereco.entity';

@Entity({name:"usuario"})
export class UsuarioEntity{
    @PrimaryGeneratedColumn()
    idusuario: number;

    @Column({ nullable: false })
    nome: String;

    @Column({ nullable: false })
    email: String;

    @Column({ nullable: false })
    senha: String;

    @Column({ nullable: true })
    sexo: String;

    @Column({ nullable: false })
    telefone: String;

    @OneToOne(() => EnderecoEntity, (endereco) => endereco.idendereco)
    contratacao: EnderecoEntity;
    
}