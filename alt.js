import { config } from "dotenv";
config()

import {Configuration, OpenAIApi} from "openai";

const openai = new OpenAIApi(new Configuration({
  apiKey:process.env.API_KEY,
}));


const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    max_tokens:256,
    messages: [
      // {"role": "system", content: "You are a helpful music assistant."},
    {role:"user", content: "You are a helpful music assistant ?"},
    {role:"assistant", content: "Yes, I can help you with anything related to music, such as finding information about artists, albums, songs, genres, instruments, and more. I can also recommend music based on your preferences, suggest playlists for different moods or occasions, and provide insights on music theory and history. Just let me know how I can assist you!"},
    {role:"user", content: "My favorite food is pizza"},
    {role:"assistant", content: "Nice to know what your favorite food is"},
    {role:"user", content:'My favorite skateboard trick is a switch heelflip'},
    {role:"assistant", content:"Great to know I'll be sure to remember that ! "},
    {role:"user", content:'What is my faovrite trick on a skateboard ? '}, ],
    temperature: 0.1
  })
    console.log(res.data.choices[0].message.content)
