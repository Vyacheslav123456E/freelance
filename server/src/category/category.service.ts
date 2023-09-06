import {InjectModel} from "@nestjs/sequelize";
import {Category} from "./category.model";
import {Injectable} from "@nestjs/common";
import {Sub_category} from "./sub_category.model";
//import {CategoriesCascader} from "../../../client/src/store/category";

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category) private categoryModel: typeof Category) {}

    async getCategories() {
        const res = await this.categoryModel.findAll(
            {
                include: [{
                    model: Sub_category, required: true,
                    attributes:  ['isLeaf',['sub_id', 'key'],['name', 'title']],
                }],
             attributes:  ['key',['name', 'title'],],
            });
        return JSON.stringify(res, null, 2);
    }
    async getCategoriesCascader() {
        const res = await this.categoryModel.findAll(
            {
                include: [{
                    model: Sub_category, required: true,
                    attributes:  ['id',['name', 'value'],['name','label']],
                }],
                attributes:  ['id',['name', 'value'],['name','label']],
            });
        return JSON.stringify(res, null, 2);
    }
}