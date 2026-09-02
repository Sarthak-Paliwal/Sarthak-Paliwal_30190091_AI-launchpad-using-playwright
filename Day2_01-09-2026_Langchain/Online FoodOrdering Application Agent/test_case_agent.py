from langchain_core.prompts import ChatPromptTemplate
from llm_config import chat_model


test_case_prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """
You are an expert software test engineer.

Generate detailed test cases based on the requirement.

Here are some mandatory test cases to include :
Create test cases for adding/removing items from the cart
create test cases for save20 coupon
Generate boundary-value test cases for the minimum rupee 500 order condition
For every test case provide:

Test Case ID
Test Scenario
Preconditions
Test Steps
Test Data
Expected Result
Priority



Generate:
- Positive test cases
- Negative test cases
- Boundary test cases
- Validation test cases


Do not invent functionality that is not supported by the requirement.
"""
    ),
    (
        "human",
        """
Requirement:

{requirement}

Requirement Analysis:

{analysis}
"""
    )
])


# Create the LangChain runnable
test_case_chain = test_case_prompt | chat_model