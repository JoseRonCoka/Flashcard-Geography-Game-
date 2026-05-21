import { corsHeaders } from '../utils/cors';
import bcrypt from 'bcryptjs';

export interface Env {
	flashcard_d1_database: D1Database;
}
export async function handleSignup(
    request: Request,
    env: Env
): Promise<Response> {



    try {

        const { email, username, password } = (await request.json()) as {
				email: string;
				username: string;
				password: string;
			};
        
        //Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        await env.flashcard_d1_database
            .prepare(
                'INSERT INTO users (email, username, password) VALUES (?, ?, ?)'
            )
            .bind(email, username, hashedPassword)
            .run();

        return Response.json(
            { success: true },
            { headers: corsHeaders }
        );

    } catch (error) {

        return Response.json(
            { error: 'Signup failed' },
            {
                status: 500,
                headers: corsHeaders
            }
        );
    }
}