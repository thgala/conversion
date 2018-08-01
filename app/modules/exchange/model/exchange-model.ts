export interface Rate {
    currency: string;
    rate: string;
}

export interface RatesMap {
    [key: string]: Rate;
}

export interface ConversionRatesData {
    base: string;
    rates: Rate[];
    time: string;
}

export interface ExchangeState {
    loading: boolean;
    currentConversion: ConversionResponse;
    conversionRatesData?: ConversionRatesData;
    rates: RatesMap;
    requestHistory: ConversionResponse[];
}

export interface RateConfig {
    currency: string;
    amount: number;
}

export interface ConversionRequest {
    from?: RateConfig;
    to?: RateConfig;
    toCurrency: string;
}

export interface ConversionResponse {
    from: RateConfig;
    to: RateConfig;
}

export const services = {
    rateServiceConfig: {
        index: {
            method: 'get',
            url: 'https://txf-ecb.glitch.me/rates',
        },
    },
};
