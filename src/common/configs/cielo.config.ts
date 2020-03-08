/**
 * Identificador da loja na Cielo.
 */
export const cieloMerchantId = process.env.CIELO_MERCHANT_ID;

/**
 * Chave Publica para Autenticação Dupla na Cielo.
 */
export const cieloMerchantKey = process.env.CIELO_MERCHANT_KEY;

/**
 * URL para verbos POST e PUT
 */
export const cieloURLRequest = process.env.CIELO_REQUEST_URL;

/**
 * URL para GET
 */
export const cieloURLQuery = process.env.CIELO_QUERY_URL;


/**
 * Endpoint da API da Cielo usado para vendas no e-commerce
 */
export const cieloEndpointForSales = process.env.CIELO_SALES_ENDPOINT;


/**
 * Endpoint da API da Cielo usado para cadastrar novos cartões
 */
export const cieloEndpointForCards = process.env.CIELO_CARDS_ENDPOINT;


/**
 * Endpoint da API Cielo usada para validação Zeroauth de dados de cartões
 */
export const cieloEndpointForZeroauthValidation = process.env.CIELO_ZEROAUTH_ENDPOINT;

