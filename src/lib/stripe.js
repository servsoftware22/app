import Stripe from "stripe";

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
});

export { stripe };

// Create a new Stripe customer
export const createStripeCustomer = async (userData) => {
  try {
    const customer = await stripe.customers.create({
      email: userData.email,
      name: userData.fullName,
      phone: userData.phone,
      metadata: {
        userId: userData.id,
        userType: "owner",
      },
    });

    return {
      customerId: customer.id,
      customer: customer,
      error: null,
    };
  } catch (error) {
    console.error("Error creating Stripe customer:", error);
    return {
      customerId: null,
      customer: null,
      error: error.message,
    };
  }
};

// Get customer by ID
export const getStripeCustomer = async (customerId) => {
  try {
    const customer = await stripe.customers.retrieve(customerId);
    return {
      customer,
      error: null,
    };
  } catch (error) {
    console.error("Error retrieving Stripe customer:", error);
    return {
      customer: null,
      error: error.message,
    };
  }
};

// Update customer
export const updateStripeCustomer = async (customerId, updateData) => {
  try {
    const customer = await stripe.customers.update(customerId, updateData);
    return {
      customer,
      error: null,
    };
  } catch (error) {
    console.error("Error updating Stripe customer:", error);
    return {
      customer: null,
      error: error.message,
    };
  }
};

// Get customer by email (useful for finding existing customers)
export const getStripeCustomerByEmail = async (email) => {
  try {
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (customers.data.length > 0) {
      return {
        customer: customers.data[0],
        error: null,
      };
    }

    return {
      customer: null,
      error: null,
    };
  } catch (error) {
    console.error("Error searching for Stripe customer by email:", error);
    return {
      customer: null,
      error: error.message,
    };
  }
};

// Check if a customer already exists before creating a new one
export const ensureStripeCustomer = async (userData) => {
  try {
    // First check if customer already exists
    const existingCustomer = await getStripeCustomerByEmail(userData.email);

    if (existingCustomer.customer) {
      // Customer exists, return existing customer
      return {
        customerId: existingCustomer.customer.id,
        customer: existingCustomer.customer,
        error: null,
        isNew: false,
      };
    }

    // Customer doesn't exist, create new one
    const newCustomer = await createStripeCustomer(userData);
    return {
      ...newCustomer,
      isNew: true,
    };
  } catch (error) {
    console.error("Error ensuring Stripe customer:", error);
    return {
      customerId: null,
      customer: null,
      error: error.message,
      isNew: false,
    };
  }
};
