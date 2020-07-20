import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import ExercisesService from "./exercises.service";
import { CreateExerciseDto } from "./dto/createExercise.dto";
import { UpdateExerciseDto } from "./dto/updateExercise.dto";

@Controller("exercises")
class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Get()
  getAllExercises() {
    return this.exercisesService.getAllExercises();
  }

  @Get(":id")
  getExerciseById(@Param("id") id: string) {
    return this.exercisesService.getExerciseById(Number(id));
  }

  @Post()
  createExercise(@Body() exercise: CreateExerciseDto) {
    return this.exercisesService.createExercise(exercise);
  }

  @Patch(":id")
  updateExercise(@Param("id") id: string, @Body() exercise: UpdateExerciseDto) {
    return this.exercisesService.updateExercise(Number(id), exercise);
  }

  @Delete(":id")
  deleteExercise(@Param("id") id: string) {
    return this.exercisesService.deleteExercise(Number(id));
  }
}

export default ExercisesController;
