export const addSystemPromptAndQuestion = ({
   system,
   input,
}: {
   system?: string;
   input: string;
}) => {
   if (system) {
      return `<|system|>${system}<|end|><|user|>${input}<|end|><|assistant|>`;
   }
   return `<|system|> <|end|>\n<|user|>\n${input}\n<|end|>\n<|assistant|>`;
};

export const cleanAnswer = (answer: any) => {
   return answer?.[0].generated_text
      .split("<|assistant|>")[1]
      .replace("<|end|>", "");
};

export const phi3QuestionParser = ({
   system,
   input,
}: {
   system?: string;
   input: string;
}) => {
   if (system) {
      return `<|system|>\n${system}<|end|>\n<|user|>\n${input}\n<|end|>\n<|assistant|>`;
   }
   return `<|system|> <|end|>\n<|user|>\n${input}\n<|end|>\n<|assistant|>`;
};

export const llama3QuestionParser = ({
   system,
   input,
}: {
   system?: string;
   input: string;
}) => {
   if (system) {
      return `<|begin_of_text|><|start_header_id|>system<|end_header_id|>${system}<|eot_id|><|start_header_id|>user<|end_header_id|>
      ${input}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n`;
   }
   return `<|start_header_id|>system<|end_header_id|>\n\n<|eot_id|><|start_header_id|>user<|end_header_id|>
      \n\n${input}\n<|eot_id|><|start_header_id|>assistant<|end_header_id|>`;
};

export const cleanAnswerLlama3 = (answer: any) => {
   return answer?.[0].generated_text;
};
