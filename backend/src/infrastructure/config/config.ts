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
    port: Number(process.env.PORT) || 3003,
    libernetix: {
      baseUrl: process.env.LIBERNETIX_BASE_URL || 'base_url.com',
      brandId: process.env.LIBERNETIX_BRAND_ID || 'some_id',
      apiKey: process.env.LIBERNETIX_API_KEY || 'some_key',
    },
  };
}