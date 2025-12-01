# ticketing-microservices
A production-grade, event-driven microservices application.

Ticketing Microservices Platform (In Progress)

A production-grade, event-driven ticketing platform built with a microservices architecture.
This project is part of my journey to master real-world backend engineering, scalable systems, and Kubernetes deployment.

🚀 Tech Stack

Node.js

TypeScript

Express

MongoDB

JWT Authentication

Docker

Kubernetes

NATS Streaming (coming soon)

✅ Current Progress (Day 1)

Setup Express server

Implemented password hashing (bcrypt)

Added basic routes (signup, signin, signout, current-users)

Created project structure for auth service

Initialized repository structure (auth, infra)

🔜 Next Steps (Upcoming)

Add MongoDB user model

Complete signup/signin validation

Implement JWT + cookie session

Add full Auth service

Add Tickets service

Implement NATS event bus

Deploy via Kubernetes

Add frontend (Next.js SSR)

📁 Project Structure
ticketing-microservices/
   ├── auth/
   ├── infra/
   └── README.md

📌 Follow Along

I will be updating this repo daily as I build the entire microservices platform.

---
### ✅ Current Progress (Day 2)

- Added strongly-typed Mongoose user model using `UserAttrs`, `UserDoc`, and `UserModel`
- Implemented secure password hashing in `pre('save')` middleware
- Added industry-standard password validation (uppercase, lowercase, number, special character)
- Fixed schema static methods (`userSchema.statics.build`) for type-safe user creation
- Improved Auth service structure and JSON transformation for secure output
- Cleaned and standardized `skaffold.yaml` using local image names
- Verified Kubernetes setup: ingress-nginx running and routing correctly
- Reset and rebuilt a fully clean local Docker + K8s environment for development stability

---
✅ Current Progress (Day 3) — Auth Service Completed

Today I completed the full Auth microservice, including all authentication flows and production-ready patterns:

🔐 Authentication Features Finished

Implemented Signup, Signin, Signout, and Current User routes

Added JWT-based authentication using secure cookies

Added industry-level password hashing & validation

Implemented currentUser & requireAuth middlewares

Added complete error-handling system with CustomError classes

Added input validation & request sanitization

Setup MongoDB connection using Kubernetes DNS

Injected environment variables (JWT_KEY, MONGO_URI) the correct way

Built type-safe models using Mongoose + TypeScript interfaces

Added strict request types & global request augmentation

🧱 Infrastructure Completed

Cleaned up skaffold.yaml

Correct Kubernetes Deployment for Auth service

Added MongoDB Deployment & Service

Configured JWT secret via Kubernetes Secrets

Verified pods restart behavior + cluster stability

Static image name setup (auth-service) for fast local rebuilds

🌐 Routes Completed

POST   /api/users/signup
POST   /api/users/signin
POST   /api/users/signout
GET    /api/users/currentuser


### ✅ Current Progress (Day 3)

Today I completed the setup of the Tickets microservice, extended the infrastructure, and ensured everything works end-to-end inside Kubernetes with Skaffold.

The Tickets service is now fully scaffolded with all core CRUD features needed for a production-ready event marketplace.
This service uses its own MongoDB, its own schema, its own routes, and follows the same strict TypeScript + Mongoose patterns established in the Auth service.

🧱 Tickets Service Backend Features

✅ 1. Create Ticket (POST /api/tickets)

Validates input (title, price)
Requires authentication
Saves ticket to MongoDB


✅ 2. Update Ticket (PUT /api/tickets/:id)

Requires authentication
User can update only his own ticket
Validates updated fields
Updates the ticket in MongoDB


✅ 3. Show Ticket (GET /api/tickets/:id)

Fetch ticket by MongoDB ID
Returns 404 if not found

✅ 4. List All Tickets (GET /api/tickets)

Returns all tickets currently stored
Includes pagination-ready structure (future upgrade)


## 🍃 Tickets Mongoose Model — Type-Safe & Production-Ready

Just like Auth, Tickets service uses:
TicketAttrs → attributes required to create a ticket
TicketDoc → properties inside a Ticket document
TicketModel → static build function for type-safe creation

🔌 Routes Included

POST   /api/tickets        (Create Ticket)
PUT    /api/tickets/:id    (Update Ticket)
GET    /api/tickets/:id    (Show Ticket)
GET    /api/tickets        (List All Tickets)

Shared Middlewares:

requireAuth
validateRequest
currentUser
NotFoundError, BadRequestError, etc.
