from django.test import TestCase
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model

User = get_user_model()

class TestUserViewTests(TestCase):
    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(
            username="testuser",
            password="testpassword",
            first_name="Test",
            last_name="User",
        )
        # Initialize the test client
        self.client = APIClient()

    def test_authenticated_user(self):
        # Log in the user and get a token (if using JWT, modify accordingly)
        self.client.login(username="testuser", password="testpassword")
        
        # Make a GET request to the TestUserView endpoint
        response = self.client.get("/test-user/")  # Replace with your actual endpoint path

        # Assert the response status code
        self.assertEqual(response.status_code, 200)

        # Assert the response data contains the correct user information
        expected_data = {
            "username": "testuser",
            "first_name": "Test",
            "last_name": "User",
            "is_authenticated": True,
        }
        self.assertEqual(response.json(), expected_data)

    def test_unauthenticated_user(self):
        # Make a GET request without logging in
        response = self.client.get("/test-user/")  # Replace with your actual endpoint path

        # Assert the response status code is 401 (unauthorized)
        self.assertEqual(response.status_code, 401)
