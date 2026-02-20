'use server';
/**
 * @fileOverview AI flow to analyze safety reports for RITM staff.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeReportInputSchema = z.object({
  description: z.string().describe('The full description of the reported incident.'),
});

const AnalyzeReportOutputSchema = z.object({
  summary: z.string().describe('A concise 2-line summary of the incident.'),
  urgency: z.enum(['Low', 'Medium', 'High']).describe('The calculated urgency level.'),
  suggestedAction: z.string().describe('A recommended next step for the RITM committee.'),
});

export async function analyzeReport(input: {description: string}) {
  return analyzeReportFlow(input);
}

const analyzePrompt = ai.definePrompt({
  name: 'analyzeReportPrompt',
  input: {schema: AnalyzeReportInputSchema},
  output: {schema: AnalyzeReportOutputSchema},
  prompt: `You are an expert safety consultant for RITM (Rameshwaram Institute of Technology & Management). 
Analyze the following incident report and provide a summary, urgency level, and suggested action for the college staff.

Incident Description: {{{description}}}`,
});

const analyzeReportFlow = ai.defineFlow(
  {
    name: 'analyzeReportFlow',
    inputSchema: AnalyzeReportInputSchema,
    outputSchema: AnalyzeReportOutputSchema,
  },
  async input => {
    const {output} = await analyzePrompt(input);
    return output!;
  }
);
