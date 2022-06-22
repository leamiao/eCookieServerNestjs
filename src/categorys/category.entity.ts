import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/base.entity';
import { Product } from 'src/products/product.entity';

@Entity({name: "categories"})
export class Category extends BaseEntity {

  @Column()
  name: string;
 
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

}
