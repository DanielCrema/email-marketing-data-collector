function generateOutput(validatedSource, redirectUrl, event) {
    try {
        if (validatedSource === false || redirectUrl === "" || event == "") {
            const output = {
                redirect: false,
                output: "404 page not found",
            }
            return output;
        } else {
            const output = {
                redirect: true,
                output: `    <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>about:blank</title>
                    <style>
                    .hidden {
                        display: none;
                    }
                    </style>
                    <script>
                        function createButton() {
                            const button = document.createElement("button");
                            button.classList.add("hidden");
                            document.body.appendChild(button);
                            button.addEventListener("click", function() {
                                window.location.href = "${redirectUrl}";
                            });
                            setTimeout(function() {
                                button.click();
                            }, 100);
                        }
                        window.onload = createButton;
                    </script>
                </head>
                <body>
                </body>
                </html>`
            }
            return output;
        }
    } catch (error) {
        throw error
    }
}

module.exports = generateOutput;
