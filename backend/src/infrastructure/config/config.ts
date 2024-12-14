export type Config = {
  port: number;
  libernetix: {
    baseUrl: string;
    brandId: string;
    apiKey: string;
  };
}

export function getConfigs(): Config {
  return {
    port: Number(process.env.PORT) || 3002,
    libernetix: {
      baseUrl: process.env.LIBERNETIX_BASE_URL || 'https://gate.libernetix.com/api/v1',
      brandId: process.env.LIBERNETIX_BRAND_ID || '77ede2ab-d039-4894-8913-6acf29551825',
      apiKey: process.env.LIBERNETIX_API_KEY || 'SdBpGfsO_dz6rcPkIyaWXFICoN_1RYnWGeLIUq8HOypu3Ne70RUx75TRFHzi0Y_yTdN5mwJkORUkXMVyPmp0CQ==',
    },
  };
}