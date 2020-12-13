using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using API.Errors;
using System.Text.Json;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        //delegate is for whats next in mdidleware pipeline, logger is for logging exceptions into terminals so we can display it,
        //IHostEnvironment is for checking the environments, is it productions or development?
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger,
             IHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;

        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch(Exception ex){
                _logger.LogError(ex, ex.Message);   //we're doing this so the exception is not silenced int he terminal, this way we can still log it and see it
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;

                var response = _env.IsDevelopment()
                    ? new ApiException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                                                                                    //the question mark is to check if it's null
                    : new ApiException(context.Response.StatusCode, "Internal Server Error");


                var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
                                                            //this is going to ensure that our response goes back as normal json in camel case

                var json = JsonSerializer.Serialize(response, options); //this is the response and option is camel case

                await context.Response.WriteAsync(json);    //writes the argument in the response body

                                               
            }
        }
    }
}