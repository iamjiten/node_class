// import mongoose from "mongoose";
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
    assignedTo: {
      name: String,
      email: Schema.Types.String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const TodoModel = model("Todo", todoSchema);
// const TodoModel = mongoose.model("Todo", todoSchema);
export default TodoModel;
