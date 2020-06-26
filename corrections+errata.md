# Errata for *Pro Angular 9*

**Chapter 2**

On page 15, Listing 2-7 does not show the concise constructor described in the text. The code should be as follows:

    export class TodoItem {

        constructor(task: string, complete: boolean = false) {
    }

(Thanks to Siavash Fallahdoust for reporting this problem)
***