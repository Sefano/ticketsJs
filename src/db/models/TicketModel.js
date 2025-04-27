import { model, Schema } from "mongoose";
import STATUS from "../../utils/status.js";

const TicketSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    completedText: { type: String },
    status: { type: String, default: STATUS.new },
  },
  {
    timestamps: true,
  }
);

export default model("ticket", TicketSchema);
