import { Ollama, type Message } from 'ollama';
import { json } from "@sveltejs/kit";

import { OLLAMA_URL } from '$env/static/private';

import levels from '../../levels.json';

const ollama = new Ollama({
    host: OLLAMA_URL,
});

export const POST = async (event) => {
    const form = await event.request.formData();

    const propmt = form.get('prompt');
    const level = form.get('level');

    if (!propmt || !level) {
        return json({
            error: 'Prompt and level are required.',
        });
    }

    const levelData = levels.filter((l) => l.level.toString() === level.toString())[0];

    const messages: Message[] = [
        {
            role: 'system',
            content: 'You are a chatbot. Reply with less than 100 characters.',
        },
        {
            role: 'system',
            content: levelData.begin_prompt,
        },
        {
            role: 'user',
            content: propmt as string,
        },
    ];

    if (levelData.end_prompt) {
        messages.push({
            role: 'system',
            content: levelData.end_prompt,
        });
    }

    const response = await ollama.chat({
        model: 'llama3',
        messages: messages,
    });

    const output = response.message.content;
    const attackSuccess = output.includes(levelData.password);

    return json({
        result: output,
        success: attackSuccess,
    });
}