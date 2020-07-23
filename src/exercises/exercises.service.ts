import { InjectRepository } from "@nestjs/typeorm";
import Exercise from "./exercise.entity";
import { Repository } from "typeorm";
import { HttpException, HttpStatus } from "@nestjs/common";
import CreateExerciseDto from "./dto/create-exercise.dto";
import UpdateExerciseDto from "./dto/update-exercise.dto";

class ExercisesService {
  constructor(
    @InjectRepository(Exercise) private exerciseRepository: Repository<Exercise>
  ) {}

  getAllExercises(): Promise<Exercise[]> {
    return this.exerciseRepository.find();
  }

  async getExerciseById(id: number): Promise<Exercise> {
    const exercise = await this.exerciseRepository.findOne(id);

    if (exercise) {
      return exercise;
    }

    throw new HttpException("Exercise not found", HttpStatus.NOT_FOUND);
  }

  async createExercise(exercise: CreateExerciseDto): Promise<Exercise> {
    const newExercise = await this.exerciseRepository.create(exercise);
    await this.exerciseRepository.save(newExercise);
    return newExercise;
  }

  async updateExercise(
    id: number,
    exercise: UpdateExerciseDto
  ): Promise<Exercise> {
    await this.exerciseRepository.update(id, exercise);
    const updatedExercise = await this.exerciseRepository.findOne(id);
    if (updatedExercise) {
      return updatedExercise;
    }

    throw new HttpException("Exercise not found", HttpStatus.NOT_FOUND);
  }

  async deleteExercise(id: number): Promise<void> {
    const deleteResponse = await this.exerciseRepository.delete(id);

    if (!deleteResponse.affected) {
      throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
    }
  }
}

export default ExercisesService;
