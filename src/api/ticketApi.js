import TicketService from "../services/ticketService.js";
import { validationResult } from "express-validator";
import {
  dateValidation,
  rangeValidation,
  ticketValidation,
} from "../utils/validation.js";

export default (app) => {
  const service = new TicketService();

  app.post("/ticket", ticketValidation, async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Ошибка валидации",
          errors: errors.array(),
        });
      }
      const { title, text } = req.body;
      const ticket = await service.createTicket(title, text);
      return res.json(ticket);
    } catch (error) {
      console.log(error);
    }
  });

  app.put("/ticket", async (req, res) => {
    try {
      const { id, action, completedText } = req.body;
      if (action === "take") {
        const takenTicket = await service.takeTicket(id);
        return res.json(takenTicket);
      }
      if (action === "done") {
        const doneTicket = await service.doneTicket(id, completedText);
        return res.json(doneTicket);
      }
      if (action === "cancel") {
        const cancelledTicket = await service.cancelTicket(id, completedText);
        return res.json(cancelledTicket);
      }
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/tickets/by-date", dateValidation, async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Ошибка валидации",
          errors: errors.array(),
        });
      }
      const { date } = req.query;
      const tickets = await service.getTicketsByDate(date);
      return res.json(tickets);
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/tickets/by-range", rangeValidation, async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Ошибка валидации",
          errors: errors.array(),
        });
      }
      const { startDate, endDate } = req.query;

      const tickets = await service.getTicketsByRange(startDate, endDate);
      return res.json(tickets);
    } catch (error) {
      console.log(error);
    }
  });
};
