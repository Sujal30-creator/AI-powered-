
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GEMINI_MODEL_NAME } from '../constants';
import { EducationalLevel, SubjectRecommendation, Competition, GeminiSubjectResponse, GeminiCompetitionResponse } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const parseJsonFromMarkdown = <T,>(text: string): T | null => {
  let jsonStr = text.trim();
  const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
  const match = jsonStr.match(fenceRegex);
  if (match && match[2]) {
    jsonStr = match[2].trim();
  }
  try {
    return JSON.parse(jsonStr) as T;
  } catch (e) {
    console.error("Failed to parse JSON response:", e, "Original text:", text);
    // Try to handle cases where the response might be an array directly
    if (jsonStr.startsWith('[') && jsonStr.endsWith(']')) {
      try {
        return JSON.parse(jsonStr) as T;
      } catch (innerError) {
        console.error("Failed to parse JSON array after initial failure:", innerError);
      }
    }
    return null;
  }
};


export const getSubjectRecommendations = async (
  educationalLevel: EducationalLevel,
  testInput: string
): Promise<SubjectRecommendation[]> => {
  const prompt = `
    Given a student at the '${educationalLevel}' level who has provided the following information about their interests, skills, or test performance:
    ---
    ${testInput}
    ---
    Please recommend 3-4 academic subjects or fields of study that would be a strong fit for this student. For each recommendation, provide:
    1. The subject name.
    2. A brief reason (1-2 sentences) explaining why it's a good fit based on their input and educational level.
    3. A brief overview of potential career prospects (1-2 sentences) related to this subject, considering current industry trends.

    Return your response as a JSON object. The main key should be "recommendations", and its value should be an array of objects. Each object in the array should have the following keys: "subject" (string), "reason" (string), and "careerProspects" (string).
    Ensure the JSON is valid.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    const parsedData = parseJsonFromMarkdown<GeminiSubjectResponse>(response.text);
    return parsedData?.recommendations || [];
  } catch (error) {
    console.error("Error getting subject recommendations:", error);
    throw new Error("Failed to fetch subject recommendations from AI.");
  }
};

export const getCompetitionInfo = async (
  subjects: string[],
  educationalLevel: EducationalLevel
): Promise<Competition[]> => {
  const subjectsListString = subjects.join(", ");
  const prompt = `
    For the following list of academic subjects: ${subjectsListString}

    Please identify 2-3 relevant or representative competitions, hackathons, challenges, or Olympiads that a student interested in these fields might participate in. These should be suitable for someone at the '${educationalLevel}' level.

    For each competition, provide:
    1. Its name.
    2. A brief description (1-2 sentences).
    3. A plausible example URL (e.g., https://example.com/competition-name). (Since you cannot browse the live internet, generate realistic-sounding examples).

    Return your response as a JSON object. The main key should be "competitions", and its value should be an array of objects. Each object in the array should have the following keys: "name" (string), "description" (string), and "url" (string).
    Ensure the JSON is valid.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    const parsedData = parseJsonFromMarkdown<GeminiCompetitionResponse>(response.text);
    return parsedData?.competitions || [];
  } catch (error) {
    console.error("Error getting competition info:", error);
    throw new Error("Failed to fetch competition information from AI.");
  }
};
