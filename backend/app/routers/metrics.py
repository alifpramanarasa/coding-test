from fastapi import APIRouter
from typing import List, Dict
from app.schemas.responses import SuccessResponse
from app.schemas.metrics import Metric
from app.data.dummy_data import load_sales_reps_data
from datetime import datetime, timedelta
from collections import defaultdict

router = APIRouter(
    prefix="/api/metrics",
    tags=["Metrics"]
)

@router.get("/dashboard", response_model=SuccessResponse[List[Metric]])
def get_dashboard_metrics():
    """
    Returns the dashboard metrics including total revenue, active deals, conversion rate, and average deal size.
    """
    sales_reps = load_sales_reps_data()
    
    # Initialize counters
    total_revenue = 0
    active_deals = 0
    closed_won = 0
    closed_lost = 0
    total_deals = 0
    total_deal_value = 0
    
    # Calculate metrics from all sales reps' deals
    for rep in sales_reps:
        for deal in rep["deals"]:
            total_deals += 1
            total_deal_value += deal["value"]
            
            if deal["status"] == "Closed Won":
                total_revenue += deal["value"]
                closed_won += 1
            elif deal["status"] == "Closed Lost":
                closed_lost += 1
            elif deal["status"] == "In Progress":
                active_deals += 1
    
    # Calculate conversion rate
    conversion_rate = (closed_won / (closed_won + closed_lost) * 100) if (closed_won + closed_lost) > 0 else 0
    
    # Calculate average deal size
    avg_deal_size = total_deal_value / total_deals if total_deals > 0 else 0
    
    metrics = [
        {
            "title": "Total Revenue",
            "value": f"${total_revenue:,.2f}",
            "change": 20.1,  # Keeping the same change percentage as it's not in the data
            "description": "From last month"
        },
        {
            "title": "Active Deals",
            "value": str(active_deals),
            "change": -5.2,  # Keeping the same change percentage as it's not in the data
            "description": "From last month"
        },
        {
            "title": "Conversion Rate",
            "value": f"{conversion_rate:.1f}%",
            "change": 12.5,  # Keeping the same change percentage as it's not in the data
            "description": "From last month"
        },
        {
            "title": "Avg. Deal Size",
            "value": f"${avg_deal_size:,.2f}",
            "change": 8.3,  # Keeping the same change percentage as it's not in the data
            "description": "From last month"
        }
    ]
    
    return SuccessResponse(
        message="Successfully retrieved dashboard metrics",
        data=metrics
    )

@router.get("/revenue-trend", response_model=SuccessResponse[List[Dict[str, any]]])
def get_revenue_trend():
    """
    Returns the monthly revenue trend data for the last 6 months.
    """
    sales_reps = load_sales_reps_data()
    
    # Generate last 6 months
    current_date = datetime.now()
    months = []
    for i in range(6):
        month = (current_date - timedelta(days=30*i)).strftime("%Y-%m")
        months.append(month)
    months.reverse()
    
    # Initialize monthly revenue data
    monthly_revenue = {month: 0 for month in months}
    
    # Calculate revenue for each month
    for rep in sales_reps:
        for deal in rep["deals"]:
            if deal["status"] == "Closed Won":
                # For demo purposes, we'll distribute deals across the last 6 months
                # In a real app, this would use actual deal dates
                month = months[deal["value"] % 6]  # Simple distribution based on deal value
                monthly_revenue[month] += deal["value"]
    
    # Format the response
    trend_data = [
        {
            "month": month,
            "revenue": monthly_revenue[month]
        }
        for month in months
    ]
    
    return SuccessResponse(
        message="Successfully retrieved revenue trend data",
        data=trend_data
    )

@router.get("/deal-distribution", response_model=SuccessResponse[Dict[str, int]])
def get_deal_distribution():
    """
    Returns the distribution of deals by status.
    """
    sales_reps = load_sales_reps_data()
    
    # Initialize status counters
    status_distribution = defaultdict(int)
    
    # Count deals by status
    for rep in sales_reps:
        for deal in rep["deals"]:
            status_distribution[deal["status"]] += 1
    
    return SuccessResponse(
        message="Successfully retrieved deal distribution data",
        data=dict(status_distribution)
    ) 