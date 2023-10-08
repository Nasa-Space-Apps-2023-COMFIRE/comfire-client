import { z } from 'zod';

const schema = z.object({
    clerk_id: z.string(),
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
})

export default schema;


