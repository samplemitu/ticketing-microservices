---

# 🎟️ Distributed Ticketing Platform (Microservices Architecture)

A **production-grade, event-driven ticketing system** built to model real-world **booking, reservation, payment, and expiration workflows** used by platforms like BookMyShow, Ticketmaster, Uber, and airline reservation systems.

This project focuses deeply on **backend engineering**, **system design**, and **distributed systems correctness** — not UI demos.

---

## 🚀 Key Highlights

* Fully **event-driven microservices** architecture
* Strong focus on **booking domain problems**
* Handles **concurrency, expiration, payments, and consistency**
* Designed using **real production patterns**, 
* Built for **scale, reliability, and correctness**

---

## 🧠 Domain Problems Solved

This project explicitly solves **hard booking system problems**:

* Prevent double booking
* Handle race conditions safely
* Time-bound reservation
* Order expiration with background workers
* Eventual consistency across services
* Payment confirmation & order finalization
* Service-to-service communication via events (not HTTP)

---

## 🏗️ System Architecture

### Microservices

| Service                | Responsibility                                         |
| ---------------------- | ------------------------------------------------------ |
| **Auth Service**       | User signup, signin, JWT-based authentication          |
| **Tickets Service**    | Create & update tickets, versioned concurrency control |
| **Orders Service**     | Create orders, manage order lifecycle                  |
| **Expiration Service** | Time-based order expiration using Redis                |
| **Payments Service**   | Secure payment processing using Stripe                 |
| **Common Library**     | Shared errors, middlewares, events, types              |

---

## 🔄 Event-Driven Workflow

The system uses **NATS Streaming** for communication:

```
TicketCreated → OrderCreated → ExpirationScheduled
     ↓                ↓
TicketUpdated ← OrderCancelled ← ExpirationComplete
     ↓
PaymentCreated → OrderCompleted
```

No tight coupling.
No synchronous cross-service calls.
Everything is **event-driven**.

---

## ⏱️ Order Expiration (Core Booking Logic)

* Orders are created with an `expiresAt` timestamp
* Expiration Service schedules delayed jobs using **Bull + Redis**
* When time expires → `ExpirationComplete` event is published
* Orders Service cancels order
* Tickets are automatically released

This mimics **real booking hold systems**.

---

## 💳 Payments Flow (Secure & Industry-Standard)

* Frontend collects card details using **Stripe.js**
* Backend never touches raw card data
* Payments Service uses **Stripe Secret Key**
* After successful charge → `PaymentCreated` event
* Orders Service marks order as **Completed**

Follows **PCI-compliant payment architecture**.

---

## 🧩 Technology Stack

### Backend

* Node.js + TypeScript
* Express
* MongoDB + Mongoose
* Redis 
* NATS Streaming (Event Bus)

### Infrastructure

* Docker
* Kubernetes
* Skaffold
* Ingress-NGINX

### Security & Reliability

* JWT-based authentication
* Optimistic concurrency control (versioning)
* Centralized error handling
* Shared common library published to npm

---

## 📦 Shared Common Library (`@samplemitu-common/common`)

A reusable npm package containing:

* Custom error classes
* Authentication & authorization middlewares
* Typed event definitions
* Base Publisher & Listener abstractions

Used by **all services** to enforce consistency.

---

## ⚙️ Local Development

### Prerequisites

* Docker Desktop (Kubernetes enabled)
* Node.js
* Skaffold

### Run the entire system

```bash
skaffold dev
```

Services will auto-rebuild and hot-reload on code changes.

---

## 📐 System Design Focus

This project intentionally prioritizes:

* **Correctness over UI**
* **Distributed systems thinking**
* **Booking domain mastery**
* **Interview-level system design**

## 🎯 Why This Project Matters


## 📌 Future Enhancements

* Stripe webhooks for payment verification
* Razorpay integration (India payments)
* Read replicas & caching
* Metrics & observability
* Saga orchestration improvements

---

## 👨‍💻 Author

**Mithu Kr**
Backend Engineer | Booking & Distributed Systems
Focused on **Node.js, System Design, Microservices, and Scalable Architecture**

