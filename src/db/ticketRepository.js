import ApiError from "../utils/errorsHandler.js";
import STATUS from "../utils/status.js";
import TicketModel from "./models/TicketModel.js";

class TicketRepository {
  async createTicket(title, text) {
    try {
      const ticket = new TicketModel({
        title,
        text,
      });
      const newTicket = ticket.save();
      return newTicket;
    } catch (error) {
      console.log(error);
    }
  }

  async takeTicket(id) {
    try {
      const ticket = await TicketModel.findById(id);
      if (!ticket) {
        throw ApiError.BadRequest("Обращение не найдено");
      }
      if (ticket.status !== STATUS.new) {
        throw ApiError.BadRequest(
          "В работу можно взять только новое обращение!"
        );
      }
      ticket.status = STATUS.processed;
      const takenTicket = ticket.save();
      return takenTicket;
    } catch (error) {
      console.log(error);
    }
  }

  async doneTicket(id, completedText) {
    try {
      const ticket = await TicketModel.findById(id);
      if (!ticket) {
        throw ApiError.BadRequest("Обращение не найдено");
      }
      if (ticket.status !== STATUS.processed) {
        throw ApiError.BadRequest(
          "Нельзя завершить не взятые в работу обращения!"
        );
      }
      ticket.status = STATUS.done;
      ticket.completedText = completedText;
      const doneTicket = ticket.save();
      return doneTicket;
    } catch (error) {
      console.log(error);
    }
  }

  async cancelTicket(id, completedText) {
    try {
      const ticket = await TicketModel.findById(id);
      if (!ticket) {
        throw ApiError.BadRequest("Обращение не найдено");
      }
      if (ticket.status !== STATUS.processed) {
        throw ApiError.BadRequest(
          "Нельзя завершить не взятые в работу обращения!"
        );
      }
      ticket.status = STATUS.cancelled;
      ticket.completedText = completedText;
      const cancelledTicket = ticket.save();
      return cancelledTicket;
    } catch (error) {
      console.log(error);
    }
  }

  async getTicketsByDate(date) {
    try {
      const startDate = new Date(date);
      const endDate = new Date(date);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      const tickets = await TicketModel.find({
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      });
      console.log(tickets);
      if (!tickets) {
        throw ApiError.BadRequest("Обращения не найдены");
      }

      return tickets;
    } catch (error) {
      console.log(error);
    }
  }

  async getTicketsByRange(startDate, endDate) {
    try {
      const startRange = new Date(startDate);
      const endRange = new Date(endDate);

      startRange.setHours(0, 0, 0, 0);
      endRange.setHours(23, 59, 59, 999);

      const tickets = await TicketModel.find({
        createdAt: {
          $gte: startRange,
          $lte: endRange,
        },
      });

      if (!tickets) {
        throw ApiError.BadRequest("Обращения не найдены");
      }

      return tickets;
    } catch (error) {
      console.log(error);
    }
  }
}
export default TicketRepository;
