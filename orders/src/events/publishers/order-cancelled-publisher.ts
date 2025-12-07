import { Subjects, Publisher, OrderCancelledEvent } from '@samplemitu-common/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
