import { Publisher, Subjects, TicketUpdatedEvent } from '@samplemitu-common/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
