import test_case_agent
from requirement_agent import requirement_agent
from test_case_agent import test_case_chain
from test_data_agent import test_data_agent
from test_review_agent import test_review_agent


requirement="""you are creating a test suite for a online food ordering application
in which a customer should be able to login, search for restraunts add food items to the cart, apply a
coupon, select a delivery address, make payments and place the order.

the application supports UPI, credit/debit cards and cash on Delivery. Acoupon SAVE20 gives 20 percent off on orders above 500
with maximum discount of 150 rupee

If payment fails the order should not be created. If payments succeeds the customer should recieve an order confirmation
with an order ID."""


# ==========================================
# AGENT 1 - REQUIREMENT ANALYSIS
# ==========================================

print("\n" + "=" * 70)
print("AGENT 1 - REQUIREMENT ANALYSIS")
print("=" * 70)

analysis_response = requirement_agent.invoke({
    "requirement": requirement
})

analysis = analysis_response.content

print(analysis)


# ==========================================
# AGENT 2 - TEST CASE GENERATION
# ==========================================

print("\n" + "=" * 70)
print("AGENT 2 - TEST CASE GENERATION")
print("=" * 70)

test_case_response = test_case_chain.invoke({
    "requirement": requirement,
    "analysis": analysis
})

test_cases = test_case_response.content

print(test_cases)

print("\nFULL RESPONSE:")
print(test_case_response)

print("\nCONTENT:")
print(test_case_response.content)





# ==========================================
# AGENT 3- Bug analysis
# ==========================================

print("\n" + "=" * 70)
print("AGENT 4 - Bug Analysis")
print("=" * 70)

bugs = bug_analysis.invoke({
    "requirement": requirement,
    "analysis": analysis,
    "test_cases": test_cases,
})

review = bugs.content

print(review)

print("\nFULL RESPONSE:")
print(bugs)

print("\nCONTENT:")
print(bugs.content)

# ==========================================
# AGENT 3- Bug Report
# ==========================================

print("\n" + "=" * 70)
print("AGENT 4 - Bug Report")
print("=" * 70)

bugs_report = bug_report.invoke({
    "Bug_analyis":review
})

report = bugs_report.content

print(report)

print("\nFULL RESPONSE:")
print(bugs_report)

print("\nCONTENT:")
print(bugs_report.content)