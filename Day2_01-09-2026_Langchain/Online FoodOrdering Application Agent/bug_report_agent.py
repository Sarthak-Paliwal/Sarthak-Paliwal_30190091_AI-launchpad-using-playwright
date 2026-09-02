from langchain_core.prompts import ChatPromptTemplate
from llm_config import chat_model


bug_report_prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
You are an QA reviewer engineer.

You are given a bug analysis report. Your task is to analyse the bug analysis and generate the detailed report 
of all the bugs present in the the analysis.

the report should consist of the bug id, what produces the bug, criticality etc.

Do not invent functionality that is not supported by the requirement.
"""
    ),
    (
        "human",
        """
Bug_analyis:
{bug_analysis}
"""
    )
])


# Create the LangChain runnable
bug_report= bug_report_prompt | chat_model