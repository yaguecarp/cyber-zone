import { Configuration, OpenAIApi } from 'openai';
import { ChatCompletionRequestMessage } from 'openai/api';

export class OpenaiService {

    configuration = new Configuration({
        //apiKey: process.env.OPENAI_API_KEY,
        apiKey: process.env.OPENAI_API_KEY
    });
    openai = new OpenAIApi(this.configuration);

    async completion(messages: Array<ChatCompletionRequestMessage>): Promise<{ text: string, tokens: number }> {

        const completion = await this.openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: messages,
            temperature: 0.6,
            max_tokens: 500,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });

        if (!completion.data.usage) {
            return {
                text: completion.data.choices[0].message?.content || '',
                tokens: 0,
            }
        }

        return {
            text: completion.data.choices[0].message?.content || '',
            tokens: completion.data.usage.total_tokens,
        }
    }

    async completionGpt4(messages: Array<ChatCompletionRequestMessage>): Promise<{ text: string, tokens: number }> {

        const completion = await this.openai.createChatCompletion({
            model: 'gpt-4',
            messages: messages,
            temperature: 0.6,
            max_tokens: 500,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });

        if (!completion.data.usage) {
            return {
                text: completion.data.choices[0].message?.content || '',
                tokens: 0,
            }
        }

        return {
            text: completion.data.choices[0].message?.content || '',
            tokens: completion.data.usage.total_tokens,
        }
    }
}
