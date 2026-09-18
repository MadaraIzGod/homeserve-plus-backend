# REST API Routes

All route files are mounted by `routes/index.js` under `/api` in `app.js`.

## Public and authentication

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET /api/home`
- `GET /api/services`
- `GET /api/services/:slug`
- `GET /api/workers`

## Customer

- `GET /api/customer/dashboard`
- `GET|POST /api/addresses`
- `PATCH|DELETE /api/addresses/:id`
- `POST /api/coupons/validate`
- `POST /api/bookings` — requires `paymentMethod: cod | razorpay`
- `GET /api/bookings/my`
- `PATCH /api/bookings/:id/status`
- `POST /api/bookings/:id/payment-verify`
- `GET /api/favorites`
- `PUT /api/favorites/:serviceId`
- `POST /api/reviews`
- `POST /api/complaints`

## Worker

- `GET|PUT /api/worker/profile`
- `POST /api/worker/verification/submit`
- `GET /api/worker/summary`
- `PUT /api/worker/availability`
- `POST /api/worker/payouts`
- `POST /api/bookings/:id/cod-payment`

## Admin

- `GET /api/admin/worker-verifications`
- `GET /api/admin/worker-verifications/:id`
- `PATCH /api/admin/worker-verifications/:id`
- `GET /api/admin/dashboard`
- `GET /api/admin/reports`
- `GET|POST /api/admin/:resource`
- `PATCH|DELETE /api/admin/:resource/:id`

## Shared and integrations

- `GET /api/notifications`
- `GET|POST /api/chat/:bookingId`
- `GET /api/uploads/signature`
- `GET /api/health`

Authentication uses `Authorization: Bearer <accessToken>` and an HTTP-only refresh cookie.
