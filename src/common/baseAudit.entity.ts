import { Column, VersionColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

export abstract class BaseAuditEntity extends BaseEntity {
    @VersionColumn()
    version: number;

    @Column({name: 'created_by'})
    createdBy: string;

    @Column({ type: 'timestamp', name: 'created_date' })
    createdDate: Date;
	
    @Column({name: 'updated_by'})
    updatedBy: string;
    
    @Column({ type: 'timestamp', name: 'updated_date' })
    updatedDate: Date;

}