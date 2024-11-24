/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

/*export default {
	async fetch(request, env, ctx): Promise<Response> {
		return new Response('Hello World!');
	},
} satisfies ExportedHandler<Env>;
*/

import { Hono } from 'hono';

interface Item {
  id: string;
  title: string;
  description: string;
  seller: string;
  rating: number;
}

const app = new Hono();
let items: Item[] = []; // In-memory data store

// Generate unique IDs for items
const generateId = (): string => Date.now().toString();

// GET ALL Listed Items [GET /listing]
app.get('/listing', (c) => {
  return c.json({ data: items });
});

// GET One Listed Item using ID [GET /listing/:id]
app.get('/listing/:id', (c) => {
  const id = c.req.param('id');
  const item = items.find((item) => item.id === id);
  if (!item) return c.json({ error: 'Item not found' }, 404);
  return c.json({ data: item });
});

// CREATE a Listing [POST /listing]
app.post('/', async (c) => {
  const body = await c.req.json();
  const { title, description, seller, rating } = body as Partial<Item>;
  if (!title || !description || !seller) {
    return c.json({ error: 'Missing required fields' }, 400);
  }
  const newItem: Item = { id: generateId(), title, description, seller, rating: rating || 0 };
  items.push(newItem);
  return c.json({ data: newItem }, 201);
});

// UPDATE Listed Item [PUT /listing/:id]
// UPDATE Listed Item [PUT /listing/:id]
app.put('/listing/:id', async (c) => {
    const id = c.req.param('id');
    const index = items.findIndex((item) => item.id === id);
    
    if (index === -1) return c.json({ error: 'Item not found' }, 404);
  
    const body = await c.req.json();
    const { title, description, rating } = body as Partial<Item>;
  
    // Check if at least one property is provided
    if (!title && !description && rating === undefined) {
        return c.json({ error: 'No update fields provided' }, 400);
    }
  
    // Update only provided fields
    items[index] = {
        ...items[index],
        ...(title !== undefined && { title }), // Ensure title is updated if provided
        ...(description !== undefined && { description }), // Ensure description is updated if provided
        ...(rating !== undefined && { rating }), // Ensure rating is updated if provided
    };
  
    return c.json({ data: items[index] });
});
// DELETE Listed Item [DELETE /listing/:id]
app.delete('/listing/:id', (c) => {
  console.log('DELETE request received');
  const id = c.req.param('id');
  console.log('ID:', id);
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    console.log('Item not found');
    return c.json({ error: 'Item not found' }, 404);
  }

  items.splice(index, 1);
  console.log('Item deleted successfully');
  return c.json({ message: 'Item deleted successfully' }, 204);
});

export default app;
