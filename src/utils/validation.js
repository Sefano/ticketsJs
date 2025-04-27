import { body, query } from "express-validator";

export const ticketValidation = [
  body("title", "Необходимо добавить тему обращения").notEmpty(),

  body("text", "Необходимо добавить текст обращения").notEmpty(),
];

export const dateValidation = [
  query("date", "Введите дату в формате YYYY-MM-DD").isDate({
    format: "YYYY-MM-DD",
  }),
];

export const rangeValidation = [
  query("startDate", "Введите дату в формате YYYY-MM-DD").isDate({
    format: "YYYY-MM-DD",
  }),
  query("endDate", "Введите дату в формате YYYY-MM-DD").isDate({
    format: "YYYY-MM-DD",
  }),
];
