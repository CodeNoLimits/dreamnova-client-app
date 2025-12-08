import json
from datetime import datetime

# Load deployments
with open("team_deployments_v6.json", "r") as f:
    data = json.load(f)

deployments = data.get("deployments", [])

print(f"Total deployments found: {len(deployments)}")

# Filter for today (2025-12-08)
# Note: Timestamps are in milliseconds
today_start = datetime(2025, 12, 8).timestamp() * 1000
today_end = datetime(2025, 12, 9).timestamp() * 1000

print(f"Filtering for timestamps between {today_start} and {today_end}")

relevant_deployments = []
for d in deployments:
    if today_start <= d["created"] < today_end:
        relevant_deployments.append(d)

print(f"Found {len(relevant_deployments)} deployments from today:")
for d in relevant_deployments:
    print(f"- {d['name']} ({d['url']}) - {datetime.fromtimestamp(d['created']/1000)}")
