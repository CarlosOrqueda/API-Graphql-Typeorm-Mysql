import { Query, Resolver, Mutation, Arg, Field, InputType, Int } from 'type-graphql'
import { Product } from '../entity/Products'

@InputType()
class ProductInput {
    @Field(() => String)
    name!: string;

    @Field(() => Int)
    quantity!: number;
}

@InputType()
class ProductUpdateInput {
    @Field(() => String, {nullable: true})
    name?: string;

    @Field(() => Int, {nullable: true})
    quantity!: number;
}

@Resolver()
export class ProductResolver {

    @Mutation(() => Product)
    async createProduct(@Arg('variables', () => ProductInput) variables: ProductInput) {
        return await Product.create(variables).save()
    }

    @Mutation(() => Boolean)
    async deleteProduct(@Arg('id', () => Int) id: number){
        await Product.delete(id)
        return true
    }

    @Mutation(() => Boolean)
    async updateProduct(@Arg('id', () => Int) id : number, @Arg('fields', () => ProductUpdateInput) fields : ProductInput){
        await Product.update({id}, fields)
        return true
    }

    @Query(() => [Product])
    products() {
        return Product.find()
    }

}