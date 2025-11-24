import { Request, Response } from "express";
import { Crud, Citi } from "src/global";

class PostController implements Crud {
    constructor(private readonly citi = new Citi("Post")) {}

    create = async (request: Request, response: Response) => {
        const { title, description, authorId } = request.body;

        const isAnyUndefined = this.citi.areValuesUndefined(
            title,
            description,
            authorId
        );

        if (isAnyUndefined) return response.status(400).send();

        const newPost = { title, description, authorId };
        const { httpStatus, message } = await this.citi.insertIntoDatabase(newPost);

        return response.status(httpStatus).send({ message });
    }

    get = async (request: Request, response: Response) => {
        const { httpStatus, values } = await this.citi.getAll();
        return response.status(httpStatus).send(values);
    }

    delete = async (request: Request, response: Response) => {
        const { id } = request.params;
        const { httpStatus, messageFromDelete } = await this.citi.deleteValue(id);
        return response.status(httpStatus).send( {messageFromDelete} );
    }

    update = async (request: Request, response: Response) => {
        const { id } = request.params;
        const { title, description, authorId } = request.body;

        const updatedValues = { title, description, authorId };
        const { httpStatus, messageFromUpdate } = await this.citi.updateValue(id, updatedValues);
        
        return response.status(httpStatus).send( {messageFromUpdate} );
    }

}

export default new PostController();