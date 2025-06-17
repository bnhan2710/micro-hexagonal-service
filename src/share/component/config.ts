import dotenv from 'dotenv';
dotenv.config();

export const config = {
    rpc: {
        productBrand : process.env.RPC_PRODUCT_BRAND_URL || 'http://localhost:8000',
        productCategory : process.env.RPC_PRODUCT_CATEGORY_URL || 'http://localhost:8000'
    },
    mysql:  
        {
            database: process.env.DB_NAME,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT as string),
            dialect: 'mysql',
            pool: {
                max: 20,
                min: 2,
                acquire: 30000,
                idle: 60000,
            },
            logging: true
        },
    accessToken: {
        secretKey: process.env.ACCESS_TOKEN_SECRET_KEY || 'default_access_token_secret_key',
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '7d'
    },
    refreshToken: {
        secretKey: process.env.REFRESH_TOKEN_SECRET_KEY || 'default_refresh_token_secret_key',
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '30d'
    },
}