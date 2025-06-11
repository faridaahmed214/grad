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

export const predictText = async (
  text: string
): Promise<BertPredictionResponse | Error> => {
  return await apiClient<BertPredictionResponse>("/api/Bert/predict", {
    method: "POST",
    data: { text },
    timeout: 30000,
  });
};
