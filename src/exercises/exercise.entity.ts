import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  videoUrl?: string;
}

export default Exercise;
