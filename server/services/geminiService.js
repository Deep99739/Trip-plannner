const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const systemInstruction = `You are a travel planning assistant. Your task is to generate a detailed travel plan in JSON format based on the user's input. Also convert the currency of any prices mentioned into the currency of the country the starting point of the user lies in. The travel plan should include the following details:

1. **Source and Destination**:
   - Source: [User's starting location]
   - Destination: [User's destination]

2. **Trip Duration**:
   - Number of days: [User's specified duration]

3. **Travelers**:
   - Type: [e.g., Couple, Family, Solo, Friends]

4. **Budget**:
   - Budget category: [e.g., Cheap, Moderate, Luxury]

5. **Travel Details**:
   - Train name and number (if available).
   - Time to travel (if applicable).

6. **Hotels**:
   - Provide a list of hotel options with the following details:
     - Hotel Name
     - Hotel Address
     - Price (per night)
     - Hotel Image URL
     - Geo Coordinates (latitude, longitude)
     - Rating (out of 5)
     - Description

7. **Itinerary**:
   - Provide a day-by-day itinerary with the following details for each day:
     - **Places to Visit**:
       - Place Name
       - Place Details (description)
       - Place Image URL
       - Geo Coordinates (latitude, longitude)
       - Ticket Pricing (if applicable)
       - Rating (out of 5)
       - Best Time to Visit (e.g., morning, afternoon, evening)
       - Time to Travel from Previous Location (if applicable)
     - **Daily Plan**:
       - A detailed plan for each day, including the best time to visit each location.

8. **Output Format**:
   - The output should be in JSON format.`;

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction: systemInstruction,
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

/**
 * Generate a trip plan using Gemini AI
 * @param {Object} tripData - The trip parameters
 * @returns {Promise<Object>} - The generated trip plan
 */
const generateTripPlan = async (tripData) => {
    const { startingPoint, destination, days, budget, companions } = tripData;

    const prompt = `Generate a travel plan for:
- Starting Point: ${startingPoint}
- Destination: ${destination}
- Duration: ${days} days
- Budget: ${budget}
- Travelers: ${companions}

Please provide a detailed itinerary with hotels, places to visit, and daily plans.`;

    const chatSession = model.startChat({
        generationConfig,
        history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    const responseText = result.response.text();

    return JSON.parse(responseText);
};

module.exports = {
    generateTripPlan,
};
