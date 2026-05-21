/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
/*
export default {
	async fetch(request, env, ctx): Promise<Response> {
		return new Response("Hello World!");
	},
} satisfies ExportedHandler<Env>;*/

import { handleSignup } from './handlers/signup';
import { handleSignin } from './handlers/signin';
import { corsHeaders } from './utils/cors';

export interface Env {
	// If you set another name in the Wrangler config file for the value for 'binding',
	// replace "DB" with the variable name you defined.
	flashcard_d1_database: D1Database;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {


		const url = new URL(request.url);

		// Handle preflight request
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				headers: corsHeaders,
			});
		}

    //Sign Up Handler Code
		if (request.method === 'POST' && url.pathname === '/api/signup') {
	  		return handleSignup(request, env);
		} 
			
    //return new Response('Not found', { status: 404 });
		

    //Sign In Handler Code
    if (request.method === 'POST' && url.pathname === '/api/signin') {

		return handleSignin(request, env);
	}

	return new Response('Not found', {
            status: 404,
            headers: corsHeaders
        });
}
};


/*
      const { results } = await env.flashcard_d1_database.prepare(
        "SELECT * FROM users WHERE email = ?",
      )
        .bind("john.doe@example.com")
        .run();
      return Response.json(results);
    }

    return new Response(
      "Call /api/signup to see the signed-up users in the D1 database.",
    );*/
