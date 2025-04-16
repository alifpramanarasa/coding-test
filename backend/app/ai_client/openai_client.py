import openai
import json
from typing import Optional
from app.data.dummy_data import filter_sales_data

def call_openai_function_call(api_key: str, user_question: str) -> str:
    """
    Approach using OpenAI function calling.
    The function we define can filter the sales data if the model wants to.
    """
    if not api_key:
        raise ValueError("OpenAI API key is missing.")
    if not user_question:
        return "No question provided."

    openai.api_key = api_key

    # Step 1: define the functions
    functions = [
        {
            "name": "fetchSalesData",
            "description": "Filters sales data by name, region, or deal status.",
            "parameters": {
                "type": "object",
                "properties": {
                    "rep_name": {
                        "type": "string",
                        "description": "Sales rep name."
                    },
                    "region": {
                        "type": "string",
                        "description": "Region name (e.g., 'North America')."
                    },
                    "deal_status": {
                        "type": "string",
                        "description": "Deal status (e.g., 'Closed Won')."
                    }
                },
                "required": []
            }
        },
        {
            "name": "formatResponse",
            "description": "Formats the response in a structured way.",
            "parameters": {
                "type": "object",
                "properties": {
                    "summary": {
                        "type": "string",
                        "description": "A brief summary of the response."
                    },
                    "details": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        },
                        "description": "Detailed points or findings."
                    },
                    "action_items": {
                        "type": "array",
                        "items": {
                            "type": "string"
                        },
                        "description": "Recommended actions or next steps."
                    }
                },
                "required": ["summary"]
            }
        }
    ]

    # Step 2: ask the model to call the function if needed
    messages = [
        {"role": "system", "content": "You are an assistant that can call 'fetchSalesData' if needed. Always format your final response using the 'formatResponse' function."},
        {"role": "user", "content": user_question}
    ]

    response = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        functions=functions,
        function_call="auto"
    )

    msg = response.choices[0].message

    # Step 3: if the model calls the function, handle it
    if msg.function_call:
        fn_name = msg.function_call.name
        args_str = msg.function_call.arguments
        try:
            args = json.loads(args_str) if args_str else {}
        except json.JSONDecodeError:
            args = {}

        if fn_name == "fetchSalesData":
            rep_name = args.get("rep_name")
            region = args.get("region")
            deal_status = args.get("deal_status")

            # Call our local data function
            result = filter_sales_data(rep_name, region, deal_status)
            fn_response = json.dumps(result)

            # Step 4: return the function result to the model for a final answer
            follow_up_msgs = messages + [
                {"role": msg.role, "content": msg.content or ""},
                {"role": "function", "name": fn_name, "content": fn_response}
            ]

            second_response = openai.chat.completions.create(
                model="gpt-4o-mini",
                messages=follow_up_msgs,
                functions=functions,
                function_call={"name": "formatResponse"}
            )
            
            final_msg = second_response.choices[0].message
            if final_msg.function_call and final_msg.function_call.name == "formatResponse":
                formatted_args = json.loads(final_msg.function_call.arguments)
                return formatted_args
            else:
                return "Error: Expected formatted response"
        else:
            return "Called an unknown function."
    else:
        # The model didn't call a function, just answered
        return msg.content.strip() if msg.content else ""
