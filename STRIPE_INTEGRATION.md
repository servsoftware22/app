# Stripe Integration for User Signup

This document explains how Stripe customers are automatically created during user signup.

## Overview

When a user signs up through the `/api/auth/signup` endpoint, the system automatically:

1. Creates a Supabase auth user
2. Creates a user record in the `users` table
3. Creates or retrieves a Stripe customer
4. Stores Stripe information in the `users.stripe` JSONB column

## Environment Variables Required

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

## Database Schema

The `users` table includes a `stripe` JSONB column with the following structure:

```json
{
  "customerId": "cus_...",
  "customer": {
    /* Full Stripe customer object */
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "status": "active",
  "isNew": true,
  "lastUpdated": "2024-01-01T00:00:00.000Z"
}
```

## Stripe Customer Creation

### Function: `ensureStripeCustomer(userData)`

This function:

- Checks if a Stripe customer already exists with the given email
- If exists, returns the existing customer
- If not exists, creates a new customer
- Returns metadata about whether the customer is new or existing

### Customer Data Stored

- **Email**: User's email address
- **Name**: User's full name
- **Phone**: User's phone number
- **Metadata**:
  - `userId`: Internal user ID
  - `userType`: User role (always "owner" for signups)

## Error Handling

- Stripe failures do not prevent user signup
- All Stripe errors are logged for debugging
- Users can still access the application even if Stripe integration fails
- The system gracefully degrades when Stripe is unavailable

## API Response

Successful signup returns:

```json
{
  "message": "User created successfully",
  "user": {
    /* User object */
  },
  "stripeCustomerId": "cus_..." // or null if Stripe failed
}
```

## Usage Examples

### Creating a Stripe Customer

```javascript
import { createStripeCustomer } from "@/lib/stripe";

const result = await createStripeCustomer({
  id: "user-uuid",
  email: "user@example.com",
  fullName: "John Doe",
  phone: "1234567890",
});
```

### Retrieving Customer Information

```javascript
import { getStripeCustomer } from "@/lib/stripe";

const result = await getStripeCustomer("cus_...");
```

### Updating Customer Information

```javascript
import { updateStripeCustomer } from "@/lib/stripe";

const result = await updateStripeCustomer("cus_...", {
  name: "New Name",
  phone: "0987654321",
});
```

## Security Considerations

- Stripe secret key is only used server-side
- Customer data is stored securely in Supabase
- No sensitive payment information is stored locally
- All Stripe operations use proper error handling

## Troubleshooting

### Common Issues

1. **Stripe customer creation fails**

   - Check environment variables
   - Verify Stripe account status
   - Check network connectivity

2. **Database update fails**

   - Verify `users.stripe` column exists
   - Check Supabase permissions
   - Verify user record exists

3. **Customer already exists**
   - System automatically handles duplicates
   - Uses existing customer if found
   - No duplicate customers created

### Logs

Check server logs for:

- Stripe API errors
- Database update failures
- Customer creation/retrieval status

## Future Enhancements

- Retry mechanism for failed Stripe operations
- Webhook handling for customer updates
- Subscription management integration
- Payment method storage
- Invoice generation
