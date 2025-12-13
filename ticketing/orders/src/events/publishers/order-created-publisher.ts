import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from '@samplemitu-common/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
