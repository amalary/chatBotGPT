import { config } from "dotenv";
config()

import {Configuration, OpenAIApi} from "openai";
import readline from 'readline';

const openai = new OpenAIApi(new Configuration({
  apiKey:process.env.API_KEY,
}));

const userInteface = readline.createInterface({
  input: process.stdin,
  output:process.stdout,
});

userInteface.prompt();
userInteface.on('line',async input =>{

  let context = [];

  const getNextMessage = async (input) => {

const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    max_tokens:1024,
    prompt:context.concat(input).join("\n"),
    temperature: 0.8,
    messages: [
      // {"role": "system", content: "You are a helpful music assistant."},
    {role:"user", content: "You are a helpful music assistant ?"},
    {role:"assistant", content: "Yes, I can help you with anything related to music, such as finding information about artists, albums, songs, genres, instruments, and more. I can also recommend music based on your preferences, suggest playlists for different moods or occasions, and provide insights on music theory and history. Just let me know how I can assist you!"},
    {role:"user", content: "Yes I am from Boston MA ?"},
    {role:"assistant", content: "The last show you did you sold out Madison square garden Anthony"},
    {role:"user", content: input}, ],
  });
  const { text, choices } = res.data;
    context = context.concat(input, text);
  
    return choices[0].text.trim();
    // console.log(res.data.choices[0].message.content)
    userInteface.prompt()
    userInteface.on('line',async(input)=>{
      const response = await getNextMessage(input);
      console.log(response,context)
    })

}});

// What more do you want to put into prompts 
// Experiment how to get out predictable prompts
// Do research on temperature setting 
// See if you can give the model a precontext. 
// seee if model can write in style of a specific artist 
// How to store chat memory for API
// Lastly tackle the tokenizer.