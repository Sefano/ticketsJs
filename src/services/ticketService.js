import TicketRepository from "../db/ticketRepository.js";
import { myTickets } from "../utils/storage.js";

class TicketService {
  constructor() {
    this.repository = new TicketRepository();
  }

  async createTicket(title, text) {
    const ticket = await this.repository.createTicket(title, text);
    return ticket;
  }

  async takeTicket(id) {
    const takenTicket = await this.repository.takeTicket(id);
    myTickets.set(takenTicket._id, takenTicket);
    return takenTicket;
  }

  async doneTicket(id, completedText) {
    const doneTicket = await this.repository.doneTicket(id, completedText);
    return doneTicket;
  }

  async cancelTicket(id, completedText) {
    const cancelledTicket = await this.repository.cancelTicket(
      id,
      completedText
    );
    return cancelledTicket;
  }
  async getTicketsByDate(date) {
    const tickets = await this.repository.getTicketsByDate(date);
    return tickets;
  }

  async getTicketsByRange(startDate, endDate) {
    const tickets = await this.repository.getTicketsByRange(startDate, endDate);
    return tickets;
  }
}
export default TicketService;
