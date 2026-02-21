const groq = require("../config/groq");
const get_search = require("../tools/searchTools");

const SYSTEM_PROMPT = {
  role: "system",
  content: `
You are a smart personal assistant named Utsav.

Your goal is to answer user questions clearly and correctly.

Follow these rules strictly:

1. If you can answer using general knowledge, answer directly in plain English.
2. Do NOT use any tool for:
   - Current time
   - Current date
   - Math questions
   - Programming questions
   - General knowledge
   - Explanations
3. Only use the tool when the user explicitly asks for:
   - Latest news
   - Current weather of a location
   - Live stock prices
   - Recently updated information
   - Information you clearly do not know

4. If you decide to use the tool:
   - Call it only ONCE.
   - After receiving the result, generate the final answer.
   - Do NOT call the tool again for the same question.

5. Never repeatedly call the tool.
6. Prefer answering directly whenever possible.

Available tool:
get_search(query: string) → Use only when absolutely necessary.

Today’s date: ${new Date().toLocaleDateString()}
`,
};
 

async function generateMsg(msg) {
  // Initialize messages with system prompt for each query
  // This prevents token overflow from growing message history across requests
  let messages = [SYSTEM_PROMPT];
  messages.push({
    role: "user",
    content: msg,
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
