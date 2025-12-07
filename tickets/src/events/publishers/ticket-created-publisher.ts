import { Publisher, Subjects, TicketCreatedEvent } from '@samplemitu-common/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
