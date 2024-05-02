export type TokenData = {
    userId: number;
    name: string;
};

declare global {
  
    namespace Express {
        export interface Request {
            tokenData: TokenData;
        }
    }
}