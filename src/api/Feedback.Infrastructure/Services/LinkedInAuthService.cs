using System.Net.Http.Headers;
using Feedback.Application.Contracts.DTOs.Authentication;
using Feedback.Application.Contracts.Interfaces;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace Feedback.Infrastructure.Services;

internal class LinkedInAuthService(HttpClient httpClient, IConfiguration configuration) : ILinkedInAuthService
{
    public async Task<LinkedInAuthPayloadDto> AuthenticateAsync(string code)
    {
        var redirectUri = configuration["LinkedIn:RedirectUri"];
        var clientId = configuration["LinkedIn:ClientId"];
        var clientSecret = configuration["LinkedIn:ClientSecret"];

        // Prepare the request to exchange the authorization code for an access token
        var tokenRequest = new HttpRequestMessage(HttpMethod.Post, "https://www.linkedin.com/oauth/v2/accessToken");
        tokenRequest.Content = new FormUrlEncodedContent([
            new KeyValuePair<string, string>("grant_type", "authorization_code"),
            new KeyValuePair<string, string>("code", code),
            new KeyValuePair<string, string>("redirect_uri", redirectUri),
            new KeyValuePair<string, string>("client_id", clientId),
            new KeyValuePair<string, string>("client_secret", clientSecret)
        ]);

        HttpResponseMessage tokenResponse = await httpClient.SendAsync(tokenRequest);
        var tokenContent = await tokenResponse.Content.ReadAsStringAsync();

        if (!tokenResponse.IsSuccessStatusCode) throw new Exception(tokenContent);
        var tokenData = JsonConvert.DeserializeObject<dynamic>(tokenContent);
        string accessToken = tokenData.access_token;

        var userRequest = new HttpRequestMessage(HttpMethod.Get, "https://api.linkedin.com/v2/userinfo");
        userRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

        HttpResponseMessage userResponse = await httpClient.SendAsync(userRequest);
        var userContent = await userResponse.Content.ReadAsStringAsync();

        if (!userResponse.IsSuccessStatusCode) throw new Exception(userContent);

        var userData = JsonConvert.DeserializeObject<dynamic>(userContent);

        if (userData == null) throw new Exception("Failed to parse user data");

        return new LinkedInAuthPayloadDto
        {
            Email = userData.email,
            Name = userData.name,
            Picture = userData.picture
        };
    }
}