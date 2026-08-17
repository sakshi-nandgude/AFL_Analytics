from fastapi import APIRouter

router = APIRouter(
    prefix="/health",
    tags=["Health"]
)

@router.get(
    "/",
    summary="Health Check",
    description="Checks whether the AFL Analytics API is running.",
)
def health_check():

    return {
        "status": "healthy",
        "service": "AFL Analytics API"
    }