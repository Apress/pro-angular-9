# Update for Angular 10

All the examples in Pro Angular 9 work with Angular 10. The two changes shown below install the Angular 10 tools and reflect a change in the way that Angular 10 progressive web applications are configured. 

This folder contains a complete set of projects created using Angular 10, equivilent to the "End of Chapter" projects in the main repository.

When you add new code files to a project, you may see this error displayed in your code editor:

    Error: Experimental support for decorators is a feature that is subject to change in a future release. 
    Set the 'experimentalDecorators' option in your 'tsconfig' or 'jsconfig' to remove this warning.

 There has been a TypeScript compiler configuration change that triggers this warning for files that use decorators but have not yet been added to the compilation context. Continue following the examples and this error will disappear once you update the Angular module that incorprates the new file into the application.

Adam Freeman, July 2020

---

**Chapter 2**

To install the package for creating Angular 10 projects, use this command instead of the one shown in Listing 2-3:

    npm install --global @angular/cli@10.0.0

***

**Chapter 10**

Use the following code for Listing 10-2:

    {
    "$schema": "./node_modules/@angular/service-worker/config/schema.json",
    "index": "/index.html",
    "assetGroups": [
        {
        "name": "app",
        "installMode": "prefetch",
        "resources": {
            "files": [
            "/favicon.ico",
            "/index.html",
            "/manifest.webmanifest",
            "/*.css",
            "/*.js"
            ]
        }
        }, {
        "name": "assets",
        "installMode": "lazy",
        "updateMode": "prefetch",
        "resources": {
            "files": [
            "/assets/**",
            "/*.(eot|svg|cur|jpg|png|webp|gif|otf|ttf|woff|woff2|ani)", 
            "/font/*"
            ]
        }
        }
    ], 
    "dataGroups": [
        {
            "name": "api-product",
            "urls": ["/api/products"],
            "cacheConfig" : {
                "maxSize": 100,
                "maxAge": "5d"
            }
        }],
        "navigationUrls": [
        "/**"
        ]
    }