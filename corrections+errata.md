# Errata for *Pro Angular 9*

**Chapter 2**

On page 15, Listing 2-7 does not show the concise constructor described in the text. The code should be as follows:

    export class TodoItem {

        constructor(task: string, complete: boolean = false) {
    }

(Thanks to Siavash Fallahdoust for reporting this problem)
***
**Chapter 12**

On page 263, the command to detect changes should be as follows:

    appRef.tick()

(Thanks to Felipe Windmoller for reporting this problem)

***


**Chapter 16**

Listing 16-3 uses the value of the Counter1 variable when setting the cookie for Counter2. The code should be as follows:


    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.DependencyInjection;
    using System;
    using System.Threading.Tasks;

    namespace Platform {
        public class Startup {
            public void ConfigureServices(IServiceCollection services) {
            }

            public void Configure(IApplicationBuilder app) {
                app.UseDeveloperExceptionPage();
                app.UseRouting();
                app.UseEndpoints(endpoints => {
                    endpoints.MapGet("/cookie", async context => {
                        int counter1 =
                            int.Parse(context.Request.Cookies["counter1"] ?? "0") + 1;
                        context.Response.Cookies.Append("counter1", counter1.ToString(),
                            new CookieOptions {
                                MaxAge = TimeSpan.FromMinutes(30)
                            });
                        int counter2 =
                            int.Parse(context.Request.Cookies["counter2"] ?? "0") + 1;
                        context.Response.Cookies.Append("counter2", counter2.ToString(),
                            new CookieOptions {
                                MaxAge = TimeSpan.FromMinutes(30)
                            });
                        await context.Response
                            .WriteAsync($"Counter1: {counter1}, Counter2: {counter2}");
                    });
                    endpoints.MapGet("clear", context => {
                        context.Response.Cookies.Delete("counter1");
                        context.Response.Cookies.Delete("counter2");
                        context.Response.Redirect("/");
                        return Task.CompletedTask;
                    });
                    endpoints.MapFallback(async context =>
                        await context.Response.WriteAsync("Hello World!"));
                });
            }
        }
    }

(Thanks to Patrick Lanz for reporting this problem)