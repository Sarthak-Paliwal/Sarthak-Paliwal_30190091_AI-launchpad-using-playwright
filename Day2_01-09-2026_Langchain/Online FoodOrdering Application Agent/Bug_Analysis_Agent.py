from langchain_core.prompts import ChatPromptTemplate
from llm_config import chat_model


bug_analysis_prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
You are an expert QA reviewer.

You are given a proper analysis of the requirements, test cases and analysis derived your task is to review the 
inputs and identify the potential bug that can be flagged in the analysis.
"""
    ),
    (
        "human",
        """
Requirement:

{requirement}

Requirement Analysis:

{analysis}

Test Cases

{test_cases}


"""

    )
])


# Create the LangChain runnable
bug_analysis = bug_analysis_prompt | chat_model