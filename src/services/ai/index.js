import { GoogleGenerativeAI } from '@google/generative-ai';
import { AI_CONFIG } from '../../config';
import * as FileSystem from 'expo-file-system/legacy';

const genAI = new GoogleGenerativeAI(AI_CONFIG.geminiApiKey);

/**
 * Service to handle all AI-related features using Google Gemini
 */
export const aiService = {
    /**
     * Analyzes a traffic violation image to extract vehicle details and violation type.
     * @param {string} imageUri - The local URI of the image to analyze
     * @returns {Promise<Object>} - The AI detection results
     */
    analyzeViolationImage: async (imageUri) => {
        try {
            // 1. Convert image to base64
            // Using 'base64' string directly to avoid potential EncodingType undefined issues
            const base64Image = await FileSystem.readAsStringAsync(imageUri, {
                encoding: 'base64',
            });

            // 2. Initialize Model
            const model = genAI.getGenerativeModel({ model: AI_CONFIG.modelName });

            // 3. Define Prompt
            const prompt = `
                You are a sophisticated traffic violation detection AI. 
                Analyze this image and provide the following information in JSON format:
                1. vehicleNumber: Extract the license plate number clearly. If not visible, return "Not detected".
                2. violationType: Identify the most likely traffic violation (e.g., Speeding, Red Light, No Helmet, Triple Riding, Wrong Parking).
                3. confidence: A number between 0-100 representing your confidence level.
                
                Return ONLY the JSON object.
                Example: {"vehicleNumber": "MH12AB1234", "violationType": "No Helmet", "confidence": 92}
            `;

            // 4. Send to Gemini
            const result = await model.generateContent([
                prompt,
                {
                    inlineData: {
                        data: base64Image,
                        mimeType: 'image/jpeg',
                    },
                },
            ]);

            const responseText = result.response.text();

            // 5. Parse and clean response
            // Sometimes Gemini wraps JSON in markdown code blocks
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }

            throw new Error('Invalid AI response format');
        } catch (error) {
            console.error('AI Analysis Error:', error);
            // Fallback for demo or failure
            return {
                vehicleNumber: 'Manual entry required',
                violationType: 'Other',
                confidence: 60,
                error: error.message
            };
        }
    }
};

export default aiService;
