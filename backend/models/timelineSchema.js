import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title Required!"],
  },
  description: {
    type: String,
    required: [true, "Description Required!"],
  },
  timeline: {
    from: {
      type: String, // Solo almacenará el año como una cadena
      required: [true, "Timeline starting year is required"],
      validate: {
        validator: function (v) {
          return /^\d{4}$/.test(v); // Validar formato YYYY
        },
        message: "Invalid year format for 'from'",
      },
    },
    to: {
      type: String, // Solo almacenará el año como una cadena
      validate: {
        validator: function (v) {
          return /^\d{4}$/.test(v); // Validar formato YYYY
        },
        message: "Invalid year format for 'to'",
      },
    },
  },
});

export const Timeline = mongoose.model("Timeline", timelineSchema);
