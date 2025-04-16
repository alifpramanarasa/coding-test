import os
import json
from typing import Optional, Dict, Any, List

DATA_FILE = os.path.join(os.path.dirname(__file__), "dummy_data.json")

def load_sales_reps_data():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data["salesReps"]

def filter_sales_data(
    rep_name: Optional[str] = None,
    region: Optional[str] = None,
    deal_status: Optional[str] = None
) -> Dict[str, Any]:
    """
    Just an example function to filter the 'salesReps' by name, region, or deal status.
    Return them in a dict with message + data
    """
    reps = load_sales_reps_data()
    if not rep_name and not region and not deal_status:
        return {"message": "All data", "data": reps}

    filtered = []
    for rep in reps:
        if rep_name and rep["name"].lower() != rep_name.lower():
            continue
        if region and rep["region"].lower() != region.lower():
            continue
        if deal_status:
            # Only keep reps if they have at least one deal of that status
            matches = [d for d in rep["deals"] if d["status"].lower() == deal_status.lower()]
            if not matches:
                continue
        filtered.append(rep)

    return {"message": "Filtered results", "data": filtered}
