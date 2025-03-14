from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import LoginView, RegisterView, IsAuthenticatedView, LogoutView, ScoreCompanyView, SectorListView, CompanyNameListView, ScoredCompanyListView

urlpatterns = [
    path('token/', LoginView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('is_authenticated/', IsAuthenticatedView.as_view(), name='is_authenticated'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('score-company/', ScoreCompanyView.as_view(), name='score_company'),
    path('sectors/', SectorListView.as_view(), name='sectors'),
    path('view-scored-companies/', ScoredCompanyListView.as_view(), name='view_scored_companies'),
    path('company-names/', CompanyNameListView.as_view(), name='company_names'),
]
