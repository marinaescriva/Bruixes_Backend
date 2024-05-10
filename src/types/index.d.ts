export type TokenData = {
    id: number;
    nombre: string;
    id_role: number;
    email: string;
};

declare global {
  
    namespace Express {
        export interface Request {
            tokenData: TokenData;
        }
    }
}