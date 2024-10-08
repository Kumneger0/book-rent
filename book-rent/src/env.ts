import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().url(),
		JWTPRIVATEKEY: z.string().min(1),
		SALT: z.string().min(1)
	},
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		JWTPRIVATEKEY: process.env.JWTPRIVATEKEY,
		SALT: process.env.SALT
	}
});
