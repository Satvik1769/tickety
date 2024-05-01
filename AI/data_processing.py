import pandas as pd
import numpy as np

# Define sample categories, urgency levels, and sentiments
categories = ['Technical Issue', 'Billing Inquiry', 'Feature Request']
urgency_levels = ['Low', 'Medium', 'High']
sentiments = ['Positive', 'Neutral', 'Negative']

# Define sample descriptions
descriptions = [
    "I'm experiencing issues with logging into my account.",
    "I have a question about my recent invoice.",
    "I would like to suggest adding a new feature to the platform.",
    "My subscription payment failed.",
    "The application crashes whenever I try to open it.",
    "I'm not receiving email notifications from the platform.",
    "The website is slow to load.",
    "I'm unable to reset my password.",
    "I'm encountering errors when trying to checkout.",
    "I'm satisfied with the service provided."
]

# Generate synthetic dataset
data = []
num_samples = 1000

for _ in range(num_samples):
    description = np.random.choice(descriptions)
    category = np.random.choice(categories)
    urgency = np.random.choice(urgency_levels)
    sentiment = np.random.choice(sentiments)
    data.append([description, category, urgency, sentiment])

# Create DataFrame
df = pd.DataFrame(data, columns=['Description', 'Category', 'Urgency', 'Sentiment'])

# Save dataset to CSV
df.to_csv('./ticket_dataset.csv', index=False)

# Display sample of the generated dataset
print(df.head())
