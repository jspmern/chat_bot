const tavilyClient = require("../config/tavily")



async function get_search(query){
 const searchResult=await  tavilyClient.search(query, {
    searchDepth: "advanced"
})
  const contentArray = searchResult.results.map((result)=>result.content).join("\n \n");
   return  contentArray ? contentArray : "No relevant information found."
}
module.exports=get_search