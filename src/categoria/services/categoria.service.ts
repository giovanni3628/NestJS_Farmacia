import { HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Categoria } from "../entities/categoria.entity";

export class CategoriaService {
    constructor(
        @InjectRepository(Categoria)
        private CategoriaRepository: Repository<Categoria>
    ) {}

    async findAll(): Promise<Categoria[]> {
        return this.CategoriaRepository.find({
            relations: {
                tarefas: true
            }
        })
    }

    async findById(id: number): Promise<Categoria> {
        let categoria = await this.CategoriaRepository.findOne({
            where: {
                id
            }, 
            relations: {
                tarefas: true
            }
        })

        if(!categoria)
        throw new HttpException('Categoria não foi encontrada!', HttpStatus.NOT_FOUND)
        return categoria
    }

    async findByDescricao(descricao: string): Promise<Categoria[]> {
        return this.CategoriaRepository.find({
            where: {
                descricao: ILike(`%${descricao}%`)
            }, 
            relations: {
                tarefas: true
            }
        })
    }
    async create(categoria: Categoria): Promise<Categoria> {
        return this.CategoriaRepository.save(categoria)
    }

    async update(categoria: Categoria): Promise<Categoria> {
        
        let categoriaUpdate = await this.findById(categoria.id)

        if(!categoriaUpdate || !categoria.id)
        throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND)

        return this.CategoriaRepository.save(categoria)
    }

    async delete(id: number): Promise<DeleteResult> {
        let categoriaDelete = await this.findById(id)
        if(!categoriaDelete)
        throw new HttpException('Categoria não foi encontrada!', HttpStatus.NOT_FOUND)

        return this.CategoriaRepository.delete(id)   
    }
}