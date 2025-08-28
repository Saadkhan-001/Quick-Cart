'use server';

/**
 * @fileOverview Product recommendation AI agent.
 *
 * - productRecommendations - A function that handles the product recommendation process.
 * - ProductRecommendationsInput - The input type for the productRecommendations function.
 * - ProductRecommendationsOutput - The return type for the productRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductRecommendationsInputSchema = z.object({
  shoppingHistory: z
    .array(z.string())
    .describe('List of product names the user has purchased in the past.'),
  currentCart: z
    .array(z.string())
    .describe('List of product names currently in the user\'s cart.'),
});
export type ProductRecommendationsInput = z.infer<typeof ProductRecommendationsInputSchema>;

const ProductRecommendationsOutputSchema = z.object({
  recommendedProducts: z
    .array(z.string())
    .describe('List of product names recommended to the user.'),
});
export type ProductRecommendationsOutput = z.infer<typeof ProductRecommendationsOutputSchema>;

export async function productRecommendations(input: ProductRecommendationsInput): Promise<ProductRecommendationsOutput> {
  return productRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productRecommendationsPrompt',
  input: {schema: ProductRecommendationsInputSchema},
  output: {schema: ProductRecommendationsOutputSchema},
  prompt: `You are a shopping assistant. Your task is to recommend products to the user based on their shopping history and current cart.

Shopping History: {{#if shoppingHistory}}{{#each shoppingHistory}}- {{{this}}}
{{/each}}{{else}}No shopping history{{/if}}

Current Cart: {{#if currentCart}}{{#each currentCart}}- {{{this}}}
{{/each}}{{else}}No current cart{{/if}}

Recommend 3 products that the user might be interested in.`,
});

const productRecommendationsFlow = ai.defineFlow(
  {
    name: 'productRecommendationsFlow',
    inputSchema: ProductRecommendationsInputSchema,
    outputSchema: ProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
