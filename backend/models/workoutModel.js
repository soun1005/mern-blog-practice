const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// schema's first arguement : how the object look 객체가 어떻게 생겨야하는지 정의하는 것
// 2nd argument : timestamp -> 자동으로 타임스탬프생성해줌
const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      require: true,
    },
    load: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// schema : defines the structure of a particular document or type of docu inside db (데이터베이스에 저장하고 싶은 형식을 미리 정의하는것)
// model : applys the shcema to a particular model and then we use the model to interact with a collection of that name

// make model based on schema
// first arguement : model name , 2nd argument : schema name
module.exports = mongoose.model('Workout', workoutSchema);

// find all workouts in workout collection
// Workout.find();
