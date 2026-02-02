# Hea.lth App Backend

A modern healthcare management system backend built with Node.js, Express, and MongoDB.

## Features

- User authentication and authorization
- Patient health records management
- Appointment scheduling
- Doctor-patient relationship management
- Role-based access control (Admin, Doctor, Patient)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   DATABASE_URL="mongodb://localhost:27017/health-app"
   JWT_SECRET="your-super-secret-key"
   NODE_ENV="development"
   ```
4. Initialize the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Patients
- `GET /api/patients/health-records` - Get patient's health records
- `POST /api/patients/health-records` - Add new health record
- `GET /api/patients/appointments` - Get patient's appointments
- `POST /api/patients/appointments` - Create new appointment
- `PATCH /api/patients/appointments/:id` - Update appointment status

### Doctors
- `GET /api/doctors/patients` - Get doctor's patients
- `GET /api/doctors/appointments` - Get doctor's appointments
- `GET /api/doctors/patients/:patientId/health-records` - Get patient's health records
- `POST /api/doctors/patients/:patientId/health-records` - Add health record for a patient
- `PATCH /api/doctors/appointments/:id` - Update appointment status

## Security

- JWT-based authentication
- Role-based access control
- Password hashing with bcrypt
- Helmet for security headers
- CORS enabled

## Database Schema

The application uses Prisma with MongoDB. The schema includes models for:
- Users
- Patients
- Doctors
- Health Records
- Appointments

## Error Handling

The API includes comprehensive error handling for:
- Authentication errors
- Authorization errors
- Validation errors
- Database errors
- Server errors

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 