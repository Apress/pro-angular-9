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

***

**Chapter 26**

Listing 26-1 doesn't handle the length of the data array correctly, such that the last item is never selected. The code should be as follows:

        import { Injectable } from "@angular/core";
        import { Product } from "./product.model";
        import { Observable } from "rxjs";
        import { RestDataSource } from "./rest.datasource";

        @Injectable()
        export class Model {
            private products: Product[] = new Array<Product>();
            private locator = (p: Product, id: number) => p.id == id;

            constructor(private dataSource: RestDataSource) {
                this.dataSource.getData().subscribe(data => this.products = data);
            }

            getProducts(): Product[] {
                return this.products;
            }

            getProduct(id: number): Product {
                return this.products.find(p => this.locator(p, id));
            }

            getNextProductId(id: number): number {
                let index = this.products.findIndex(p => this.locator(p, id));
                if (index > -1) {
                    return this.products[this.products.length > index + 1
                        ? index + 1 : 0].id;
                } else {
                    return id || 0;
                }
            }

            getPreviousProductid(id: number): number {
                let index = this.products.findIndex(p => this.locator(p, id));
                if (index > -1) {
                    return this.products[index > 0
                        ? index - 1 : this.products.length - 1].id;
                } else {
                    return id || 0;
                }
            }

            saveProduct(product: Product) {
                if (product.id == 0 || product.id == null) {
                    this.dataSource.saveProduct(product)
                        .subscribe(p => this.products.push(p));
                } else {
                    this.dataSource.updateProduct(product).subscribe(p => {
                        let index = this.products
                            .findIndex(item => this.locator(item, p.id));
                                        this.products.splice(index, 1, p);
                    });
                }
            }

            deleteProduct(id: number) {
                this.dataSource.deleteProduct(id).subscribe(() => {
                    let index = this.products.findIndex(p => this.locator(p, id));
                    if (index > -1) {
                        this.products.splice(index, 1);
                    }
                });
            }
        }

(Thanks to Edwin van Ree for reporting this problem)