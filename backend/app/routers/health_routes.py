from fastapi import APIRouter

router = APIRouter(
    prefix="/health",
    tags=["Health"]
)

@router.get(
    "/",
    summary="Health Check",
    description="Returns the current status of the API."
)
def health_check():
    return {
        "status": "healthy",
        "service": "AFL Analytics API"
    }