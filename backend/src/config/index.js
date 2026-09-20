import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  databaseUrl: process.env.DATABASE_URL || 'mysql://root:password@localhost:3306/roadresq_db',
  jwtSecret: process.env.JWT_SECRET || 'roadresq_super_secret_jwt_key_2026_india',
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '',
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_roadresq2026',
    keySecret: process.env.RAZORPAY_KEY_SECRET || 'test_secret_roadresq',
  },
  env: process.env.NODE_ENV || 'development',
};
