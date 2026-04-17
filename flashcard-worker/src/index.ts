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

export interface Env {
  // If you set another name in the Wrangler config file for the value for 'binding',
  // replace "DB" with the variable name you defined.
  flashcard_d1_database: D1Database;
}

export default {
  async fetch(request, env): Promise<Response> {
    const { pathname } = new URL(request.url);


        // Handle preflight request
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }


     if (request.method === "POST" && new URL(request.url).pathname === "/api/signup") {

      const { email, username, password } = await request.json() as{
		email: string;
		username: string;
		password: string;
	  }

      await env.flashcard_d1_database.prepare(
        "INSERT INTO users (email, username, password) VALUES (?, ?, ?)"
      )
      .bind(email, username, password)
      .run();

      return new Response("User inserted");
    }

    return new Response("Not found", { status: 404 });
  },
} satisfies ExportedHandler<Env>;

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


