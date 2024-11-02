import express from 'express';
import { Request, Response, Application } from 'express';
const app = express();
const port = 8000;

app.use(express.json());

app.get('/', (req: Request , res: Response ) => {
  res.send('Hello, TypeScript!');
});

app.post('/v1/categories', (req: Request , res: Response ) => {
    const { name, image, description, parentId } = req.body as CreateCategoryDTO;

    if(!name) {
        res.status(400).json({message: 'Name is required'});
        return;
    }

    const newId = '0192e907-b87c-7dbe-898c-59ceed5df1123'
    const category: Category = {
        id: newId,
        name,
        image,
        description,
        parentId: parentId || null,
        status: CategoryStatus.Active,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    categories.push(category);
    res.status(201).json({data: newId});
});

app.get('/v1/categories', (req: Request , res: Response ) => {
    res.status(200).send(categories);
})
  
app.get('/v1/categories/:id', (req: Request , res: Response ) =>  {
    const categoryId = req.params.id;
    const category = categories.find((category) => category.id === categoryId);
    if(!category) {
        res.status(404).send('Category not found');
        return;
    }
    res.status(200).json({data:{category}});
})

app.patch('/v1/categories/:id', (req: Request , res: Response ) => {
    const {name , image, description, parentId, status} = req.body as UpdateCategoryDTO;

    const category = categories.find((category) => category.id === req.params.id);
    
    if(!category) {
        res.status(404).send('Category not found');
        return;
    }

    if(name) {
        category.name = name;
    }
    if(image) {
        category.image = image;
    }
    if(description) {
        category.description = description;
    }
    if(parentId) {
        category.parentId = parentId;
    }
    if(status) {
        category.status = status;
    }
    category.updatedAt = new Date();
    res.status(200).json({data: true});

})

app.delete('/v1/categories/:id', (req: Request , res: Response ) => {
    const categoryId = req.params.id;
    const categoryIndex = categories.findIndex((category) => category.id === categoryId);
    if(categoryIndex === -1) {
        res.status(404).send('Category not found');
        return;
    }
    categories.splice(categoryIndex, 1);
    res.status(200).json({data: true});
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

enum CategoryStatus {
    Active = 'active',
    Inactive = 'inactive',
    Deleted = 'deleted',
}

type CreateCategoryDTO = {
    name: string;
    image?: string ;
    description?: string;
    parentId?: string;
}

type UpdateCategoryDTO = {
    name?: string;
    image?: string ;
    description?: string;
    parentId?: string;
    status?: CategoryStatus;
}

//Business model
type Category = {
    id: string;
    name: string;
    image?: string | null;
    description?: string | null;
    position?: number;
    parentId?: string | null;
    status: CategoryStatus;
    createdAt: Date;
    updatedAt: Date;
}

const categories: Category[] = [
    {
        id: '0192e907-b87c-7dbe-898c-59ceed5df148',
        name: 'Category 1',
        image: 'https://example.com/image.jpg',
        description: 'Category 1 description',
        position: 0,
        parentId: null,
        status: CategoryStatus.Active,
        createdAt: new Date(),
        updatedAt: new Date(),
    },

    {
        id: '0192e907-b87c-7dbe-898c-59ceed5df149',
        name: 'Category 2',
        image: 'https://example.com/image.jpg',
        description: 'Category 2 description',
        position: 1,
        parentId: null,
        status: CategoryStatus.Active,
        createdAt: new Date(),
        updatedAt: new Date(),
    },


];
