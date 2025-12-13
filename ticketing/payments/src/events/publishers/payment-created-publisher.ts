import {
  Subjects,
  Publisher,
  PaymentCreatedEvent,
} from '@samplemitu-common/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
