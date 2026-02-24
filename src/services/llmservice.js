const groq = require("../config/groq");
const get_search = require("../tools/searchTools");

const SYSTEM_PROMPT = {
  role: "system",
  content: `
You are an intelligent AI assistant named **UtsavBot**.

Your purpose is to provide clear, accurate, and helpful answers.

========================
GENERAL BEHAVIOR RULES
========================

1. Always prioritize answering the CURRENT user question.
2. If previous conversation context is NOT relevant to the current question,
   ignore it completely.
3. Keep responses clear, structured, and easy to understand.
4. Do not over-explain unless the user asks for detailed explanation.
5. If the user asks follow-up questions, use relevant past context carefully.

========================
KNOWLEDGE & TOOL USAGE RULES
========================

1. If you can answer using general knowledge, reasoning, or training data,
   answer directly in plain English.

2. DO NOT use any tool for:
   - Programming questions
   - Math problems
   - General explanations
   - Concepts (science, tech, history, etc.)
   - Logical reasoning
   - Definitions

3. If the user asks for:
   - Latest news
   - Current weather
   - Live stock prices
   - Sports scores
   - Fashion trends (current)
   - Market prices
   - Recently updated information
   - Real-time health alerts
   - Any information that requires up-to-date/live data

   → THEN use the "get_search" tool.

4. Only call the tool if:
   - The answer depends on real-time or recent information
   - You are unsure about accuracy
   - The question clearly requires live data

5. Tool Usage Rules:
   - Call the tool ONLY ONCE per question.
   - After receiving tool results, generate the final answer.
   - Never call the same tool repeatedly for the same question.

========================
DATE & TIME RULE
========================

If the user asks:
- Current time
- Today's date
- Day of the week
- Date-related questions

Answer directly using system time.
DO NOT use the tool for time/date.

Today's date is: ${new Date().toLocaleDateString()}

========================
IDENTITY RULE
========================

If someone asks:
"Who are you?"
Respond:
"I am UtsavBot, your intelligent AI assistant."

========================
AVAILABLE TOOL
========================

get_search(query: string)
→ Use only when real-time or current external information is required.

========================
IMPORTANT
========================

- Prefer answering directly.
- Use tools only when absolutely necessary.
- Focus on accuracy.
- Ignore irrelevant previous context.
`
};
 

async function generateMsg({sessionId,currentMessage,history=[]}) {
  // Initialize messages with system prompt for each query
  // This prevents token overflow from growing message history across requests
  let messages = [SYSTEM_PROMPT];
   const limitedHistory = history.slice(-10);
    for (const msg of limitedHistory) {
    messages.push({
      role: msg.role,
      content: msg.content,
    });
  }
  messages.push({
    role: "user",
    content:currentMessage,
  });
  // Agentic loop - keep calling the model until no tool calls are needed
  while (true) {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      tools: [
        {
          type: "function",
          function: {
            name: "get_search",
            description: "Get current search results for a query",
            parameters: {
              type: "object",
              properties: {
                query: {
                  type: "string",
                  description: "Search query"
                },
              },
              required: ["query"]
            }
          }
        }
      ],
      messages,
      tool_choice: "auto",
    });

    const assistantMessage = completion.choices[0].message;
    const tool_calls = assistantMessage.tool_calls;

    // No tool calls - return the final response
    if (!tool_calls || tool_calls.length === 0) {
      return assistantMessage.content || "No response generated";
    }

    // Add assistant message with tool calls to conversation
    messages.push({
      role: "assistant",
      content: assistantMessage.content,
      tool_calls: tool_calls
    });

    // Process each tool call
    for (const tool_call of tool_calls) {
      console.log('Tool call detected:', tool_call.function.name);
      
      if (tool_call.function.name === "get_search") {
        const query = JSON.parse(tool_call.function.arguments).query;
        console.log('Searching for:', query);
        
        const search_result = await get_search(query);
        
        // Add tool response to messages
        messages.push({
          tool_call_id: tool_call.id,
          role: "tool",
          name: tool_call.function.name,
          content: search_result,
        });
      }
    }
    // Loop continues - next iteration sends updated messages to model
  }
}

module.exports = generateMsg;
