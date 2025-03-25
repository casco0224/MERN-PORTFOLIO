import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Timeline } from "../models/timelineSchema.js";

// Crear una nueva línea de tiempo
export const postTimeline = catchAsyncErrors(async (req, res, next) => {
  const { title, description, from, to } = req.body;

  if (!/^\d{4}$/.test(from)) {
    return next(new ErrorHandler("Invalid 'from' year format!", 400));
  }
  if (to && !/^\d{4}$/.test(to)) {
    return next(new ErrorHandler("Invalid 'to' year format!", 400));
  }

  const newTimeline = await Timeline.create({
    title,
    description,
    timeline: { from, to },
  });
  res.status(200).json({
    success: true,
    message: "Timeline Added!",
    newTimeline,
  });
});

// Actualizar una línea de tiempo existente
export const updateTimeline = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { title, description, from, to } = req.body;

  if (from && !/^\d{4}$/.test(from)) {
    return next(new ErrorHandler("Invalid 'from' year format!", 400));
  }
  if (to && !/^\d{4}$/.test(to)) {
    return next(new ErrorHandler("Invalid 'to' year format!", 400));
  }

  let timeline = await Timeline.findById(id);
  if (!timeline) {
    return next(new ErrorHandler("Timeline not found!", 404));
  }

  timeline = await Timeline.findByIdAndUpdate(
    id,
    { title, description, timeline: { from, to } },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(200).json({
    success: true,
    message: "Timeline Updated!",
    timeline,
  });
});

// Obtener todas las líneas de tiempo
export const getAllTimelines = catchAsyncErrors(async (req, res, next) => {
  const timelines = await Timeline.find();
  res.status(200).json({
    success: true,
    timelines,
  });
});

// Obtener una línea de tiempo por ID
export const getTimelineById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const timeline = await Timeline.findById(id);
  if (!timeline) {
    return next(new ErrorHandler("Timeline not found!", 404));
  }

  res.status(200).json({
    success: true,
    timeline,
  });
});

// Eliminar una línea de tiempo
export const deleteTimeline = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  let timeline = await Timeline.findById(id);
  if (!timeline) {
    return next(new ErrorHandler("Timeline not found!", 404));
  }

  await timeline.deleteOne();
  res.status(200).json({
    success: true,
    message: "Timeline Deleted!",
  });
});
