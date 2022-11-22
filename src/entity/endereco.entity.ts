import {PrimaryGeneratedColumn, Column, Entity} from 'typeorm'

@Entity({name:"endereco"})
export class EnderecoEntity{
    @PrimaryGeneratedColumn()
    idendereco: number;

    @Column({ nullable: false })
    bairro: String;

    @Column({ nullable: false })
    rua: String;

    @Column({ nullable: false })
    cidade: String;

    @Column({ nullable: false })
    estado: String;

    @Column({ nullable: false })
    pais: String;
}