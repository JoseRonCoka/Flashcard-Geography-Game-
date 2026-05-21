import { corsHeaders } from '../utils/cors';
import bcrypt from 'bcryptjs';

export interface Env {
	flashcard_d1_database: D1Database;
}

export async function handleSignin(request: Request, env: Env): Promise<Response> {
	try {
		const { email, password } = (await request.json()) as {
			email: string;
			password: string;
		};

		const { results } = await env.flashcard_d1_database
			.prepare('SELECT * FROM users WHERE email = ?')
			.bind(email)
			.run();

		if (results.length === 0) {
			return new Response(JSON.stringify({ error: 'Invalid email or password' }), {
				status: 401,
				headers: corsHeaders,
			});
		}

		//Compare password with hashed password in database
		const isPasswordValid = await bcrypt.compare(password, results[0].password as string);

		if (!isPasswordValid) {
			return new Response(JSON.stringify({ error: 'Invalid email or password' }), {
				status: 401,
				headers: corsHeaders,
			});
		}

		//Return user data without password
		return new Response(JSON.stringify(results[0]), {
			headers: corsHeaders,
		});

	} catch (error) {
		return Response.json(
			{ error: 'Signin failed' },
			{
				status: 500,
				headers: corsHeaders,
			},
		);
	}
}
