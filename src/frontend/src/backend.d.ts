import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Company {
    ticker: string;
    marketCap: number;
    name: string;
    description: string;
    sector: string;
    week52Low: number;
    week52High: number;
    price: number;
    changePercent: number;
}
export interface Commodity {
    ticker: string;
    name: string;
    description: string;
    volume: number;
    week52Low: number;
    category: string;
    week52High: number;
    price: number;
    changePercent: number;
}
export interface UserProfile {
    name: string;
    description: string;
    email: string;
    phone: string;
}
export interface MarketIndex {
    value: number;
    name: string;
    changeAmount: number;
    changePercent: number;
    symbol: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCommodities(): Promise<Array<Commodity>>;
    getCommoditiesByCategory(): Promise<Array<Commodity>>;
    getEquities(): Promise<Array<Company>>;
    getEquitiesBySector(): Promise<Array<Company>>;
    getInstrumentDetail(ticker: string): Promise<{
        __kind__: "company";
        company: Company;
    } | {
        __kind__: "commodity";
        commodity: Commodity;
    }>;
    getMarketIndices(): Promise<Array<MarketIndex>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    initializeStaticData(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
