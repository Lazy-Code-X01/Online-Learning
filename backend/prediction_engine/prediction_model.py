import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load data from MongoDB and preprocess
data = pd.read_csv('../datas/model.csv')
X = data.drop('performance_label', axis=1)  # Features
y = data['performance_label']  # Target

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a Random Forest classifier
rf_model = RandomForestClassifier()
rf_model.fit(X_train, y_train)

# Make predictions on the test set
y_pred = rf_model.predict(X_test)

# Evaluate model performance
accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)

# New data from user interaction
new_data = pd.DataFrame(...)  # Create a DataFrame with the user's interaction data

# Preprocess the new data
new_data_processed = preprocess(screen_time)

# Predict performance
prediction = rf_model.predict(new_data_processed)
