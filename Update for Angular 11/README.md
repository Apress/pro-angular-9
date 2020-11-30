# Update for Angular 11

All the examples in Pro Angular 9 work with Angular 11. The two changes shown below install the Angular 11 tools and reflect a change in the way that Angular 11 progressive web applications are configured. 

This folder contains a complete set of projects created using Angular 11, equivilent to the "End of Chapter" projects in the main repository.

When you create new projects, you will be asked whether stricter type checking should be enabled. Press return to accept the default, which is to disable the stricter checks.

When you add new code files to a project, you may see this error displayed in your code editor:

    Error: Experimental support for decorators is a feature that is subject to change in a future release. 
    Set the 'experimentalDecorators' option in your 'tsconfig' or 'jsconfig' to remove this warning.

 There has been a TypeScript compiler configuration change that triggers this warning for files that use decorators but have not yet been added to the compilation context. Continue following the examples and this error will disappear once you update the Angular module that incorprates the new file into the application.

Adam Freeman, November 2020

---

**Chapter 2**

To install the package for creating Angular 11 projects, use this command instead of the one shown in Listing 2-3:

    npm install --global @angular/cli@11.0.2

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

**Chapter 16**

Use the following instead of Listing 16-16:

    import {
        Directive, ViewContainerRef, TemplateRef,
        Input, SimpleChange, IterableDiffer, IterableDiffers, ChangeDetectorRef, IterableChangeRecord
    } from "@angular/core";

    @Directive({
        selector: "[paForOf]"
    })
    export class PaIteratorDirective {
        private differ: IterableDiffer<any>;

        constructor(private container: ViewContainerRef,
            private template: TemplateRef<Object>,
            private differs: IterableDiffers,
            private changeDetector: ChangeDetectorRef) {
        }

        @Input("paForOf")
        dataSource: any;

        ngOnInit() {
            this.differ =
                <IterableDiffer<any>>this.differs.find(this.dataSource).create();
        }

        ngDoCheck() {
            let changes = this.differ.diff(this.dataSource);
            if (changes != null) {
                console.log("ngDoCheck called, changes detected");
                let arr: IterableChangeRecord<any>[] = [];
                changes.forEachAddedItem(addition => arr.push(addition));
                arr.forEach(addition => {
                    this.container.createEmbeddedView(this.template,
                        new PaIteratorContext(addition.item, addition.currentIndex, arr.length));
                });
            }
        }
    }

    class PaIteratorContext {
        odd: boolean; even: boolean;
        first: boolean; last: boolean;

        constructor(public $implicit: any,
            public index: number, total: number) {

            this.odd = index % 2 == 1;
            this.even = !this.odd;
            this.first = index == 0;
            this.last = index == total - 1;
        }
    }

Use the following code for Listing 16-19:

    import {
        Directive, ViewContainerRef, TemplateRef,
        Input, SimpleChange, IterableDiffer, IterableDiffers,
        ChangeDetectorRef, ViewRef, IterableChangeRecord
    } from "@angular/core";

    @Directive({
        selector: "[paForOf]"
    })
    export class PaIteratorDirective {
        private differ: IterableDiffer<any>;
        private views: Map<any, PaIteratorContext> = new Map<any, PaIteratorContext>();

        constructor(private container: ViewContainerRef,
            private template: TemplateRef<Object>,
            private differs: IterableDiffers,
            private changeDetector: ChangeDetectorRef) {
        }

        @Input("paForOf")
        dataSource: any;

        ngOnInit() {
            this.differ =
                <IterableDiffer<any>>this.differs.find(this.dataSource).create();
        }

        ngDoCheck() {
            let changes = this.differ.diff(this.dataSource);
            if (changes != null) {

                let arr: IterableChangeRecord<any>[] = [];
                changes.forEachAddedItem(addition => arr.push(addition));
                arr.forEach(addition => {
                    let context = new PaIteratorContext(addition.item,
                        addition.currentIndex, arr.length);
                    context.view = this.container.createEmbeddedView(this.template,
                        context);
                    this.views.set(addition.trackById, context);
                });
                let removals = false;
                changes.forEachRemovedItem(removal => {
                    removals = true;
                    let context = this.views.get(removal.trackById);
                    if (context != null) {
                        this.container.remove(this.container.indexOf(context.view));
                        this.views.delete(removal.trackById);
                    }
                });
                if (removals) {
                    let index = 0;
                    this.views.forEach(context =>
                        context.setData(index++, this.views.size));
                }
            }
        }
    }

    class PaIteratorContext {
        index: number;
        odd: boolean; even: boolean;
        first: boolean; last: boolean;
        view: ViewRef;

        constructor(public $implicit: any,
                public position: number, total: number ) {
            this.setData(position, total);
        }

        setData(index: number, total: number) {
            this.index = index;
            this.odd = index % 2 == 1;
            this.even = !this.odd;
            this.first = index == 0;
            this.last = index == total - 1;
        }
    }
