import apiClient from "./apiClient";

interface BertPredictionRequest {
  text: string;
}

interface BertPredictionResponse {
  text: string;
  prediction: string;
  confidence: number;
  logits: number[];
}

// Read the correct base URL from the environment
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:7162";

export const predictText = async (
  text: string
): Promise<BertPredictionResponse | Error> => {
  return await apiClient<BertPredictionResponse>(`${BASE_URL}/api/Bert/predict`, {
    method: "POST",
    data: { text },
    timeout: 30000,
  });
};
