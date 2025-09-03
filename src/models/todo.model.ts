// import mongoose from "mongoose";
import { TodoType } from "@/types/todo.types";
import { model, Schema } from "mongoose";
// const { Schema } = mongoose;
const todoSchema = new Schema(
  {
    title: String,
    // title: {
    //   type: String,
    // },
    status: Boolean,
    // createdAt: { type: Date, default: Date.now() },
    // assignedTo: Array<String>,
    user: {
      // type: String,
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const TodoModel = model<TodoType>("Todo", todoSchema);
// const TodoModel = mongoose.model("Todo", todoSchema);
export default TodoModel;
