const geminiService = require("../services/geminiService");

/**
 * POST /api/generate-trip
 * Generates an AI-powered trip plan based on user preferences
 */
const generateTrip = async (req, res) => {
    try {
        const { startingPoint, destination, days, budget, companions } = req.body;

        // Input validation
        if (!startingPoint || !destination || !budget || !companions) {
            return res.status(400).json({
                error: "Missing required fields",
                required: ["startingPoint", "destination", "budget", "companions"],
            });
        }

        console.log(`[AI Request] Generating trip: ${startingPoint} → ${destination}`);

        // Call Gemini AI service
        const tripPlan = await geminiService.generateTripPlan({
            startingPoint,
            destination,
            days: days || "3",
            budget,
            companions,
        });

        console.log(`[AI Response] Trip plan generated successfully`);

        res.json({
            success: true,
            tripData: tripPlan,
        });
    } catch (error) {
        console.error("[AI Error]", error.message);

        // Handle specific error types
        if (error.message.includes("API key")) {
            return res.status(500).json({
                error: "AI service configuration error",
                details: "Invalid or missing API key",
            });
        }

        res.status(500).json({
            error: "Failed to generate trip plan",
            details: error.message,
        });
    }
};

module.exports = {
    generateTrip,
};
