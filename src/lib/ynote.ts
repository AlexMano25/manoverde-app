/**
 * Y-Note / PayNote MTN MoMo API Client
 * Documentation: WapiBot Y-Note Integration
 *
 * CRITICAL NOTES:
 * - Status endpoint uses snake_case: message_id, customerkey, customersecret
 * - Payment endpoint uses camelCase for some fields: subscriberMsisdn, notifUrl
 * - OAuth2 token uses Basic Auth with client_id:client_secret (base64)
 */

const YNOTE_TOKEN_URL = 'https://omapi-token.ynote.africa/oauth2/token';
const YNOTE_PAYMENT_URL = 'https://omapi.ynote.africa/prod/webpayment';
const YNOTE_STATUS_URL = 'https://omapi.ynote.africa/prod/webpaymentmtn/status';

export interface YNoteCredentials {
  customer_key: string;
  customer_secret: string;
  client_id: string;
  client_secret: string;
}

export interface YNotePaymentRequest {
  orderId: string;
  amount: number;
  phoneNumber: string; // Format: 237XXXXXXXXX
  notifyUrl: string;
}

export interface YNoteTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface YNotePaymentResponse {
  message_id?: string;
  status?: string;
  [key: string]: unknown;
}

/**
 * Get OAuth2 access token from Y-Note
 */
export async function getYNoteToken(credentials: YNoteCredentials): Promise<string> {
  const basicAuth = Buffer.from(
    `${credentials.client_id}:${credentials.client_secret}`
  ).toString('base64');

  const response = await fetch(YNOTE_TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Y-Note token error: ${response.status} - ${error}`);
  }

  const data: YNoteTokenResponse = await response.json();
  return data.access_token;
}

/**
 * Initiate MTN MoMo payment via Y-Note
 */
export async function initiatePayment(
  credentials: YNoteCredentials,
  accessToken: string,
  request: YNotePaymentRequest
): Promise<YNotePaymentResponse> {
  // Build the API_MUT body as specified in Y-Note docs
  const body = {
    customerkey: credentials.customer_key,
    customersecret: credentials.customer_secret,
    order_id: request.orderId,
    amount: request.amount.toString(),
    subscriberMsisdn: request.phoneNumber,
    notifUrl: request.notifyUrl,
    PaiementMethod: 'MTN_MOMO',
  };

  const response = await fetch(YNOTE_PAYMENT_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Y-Note payment error: ${response.status} - ${error}`);
  }

  return response.json();
}

/**
 * Check payment status via Y-Note
 * CRITICAL: Must use snake_case "message_id" NOT "MessageId"
 */
export async function checkPaymentStatus(
  credentials: YNoteCredentials,
  accessToken: string,
  messageId: string
): Promise<YNotePaymentResponse> {
  // IMPORTANT: snake_case keys as per Y-Note docs (NOT PascalCase)
  const body = {
    customerkey: credentials.customer_key,
    customersecret: credentials.customer_secret,
    message_id: messageId, // MUST be snake_case
  };

  const response = await fetch(YNOTE_STATUS_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Y-Note status error: ${response.status} - ${error}`);
  }

  return response.json();
}
