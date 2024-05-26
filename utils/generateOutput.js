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
                output: `
                <!DOCTYPE html>
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
                        window.onload = function() {
                            document.getElementById("redirectButton").click();
                        };
                    </script>
                </head>
                <body>
                    <button id="redirectButton" class="hidden" onclick="window.location.href='${redirectUrl}'"></button>
                </body>
                </html>
                `
            }
            return output;
        }
    } catch (error) {
        throw error
    }
}

module.exports = generateOutput;
