import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseAuditEntity } from 'src/common/baseAudit.entity';
import { Category } from 'src/categorys/category.entity';

@Entity({name: "products"})
export class Product extends BaseAuditEntity {

  @Column()
  name: string;

  @Column({ name: 'image_url' })
  imageUrl?: string;

  @Column()
  description?: string;

  @Column()
  price?: number;

  @ManyToOne(() => Category, (category) => category.products, { eager: true })
  @JoinColumn({ name: 'ref_category_id' })
  category: Category

  categoryId?: number
}
