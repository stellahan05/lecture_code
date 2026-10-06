// SHARED INTERFACE — the only payment contract the rest of the app touches.
// Any class that implements this can be passed to CoffeeCart.

export interface PaymentResult {
  success: boolean;
  transactionId?: string; // present on success
  errorMessage?: string;  // present on failure
}

export interface PaymentGateway {
  readonly providerName: string;

  /**
   * Charge the given amount in cents (CAD).
   * Implementations convert to their provider's native unit internally.
   */
  pay(amountCents: number, description: string): PaymentResult;
}
