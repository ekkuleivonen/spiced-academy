$.ajax({
    url: "/tweets.json",
    method: "GET",
    success: function (data) {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            //create HTML elements tweet result
            const resultDiv = document.createElement("div");
            const resultText = document.createElement("p");
            const resultLink = document.createElement("a");
            //set classes for the elements
            resultDiv.classList.add("result");
            resultText.classList.add("content");
            resultLink.classList.add("link");
            //place data in the elements
            resultText.innerText = data[i].text;
            resultLink.innerText = data[i].url;
            resultLink.href = data[i].url;
            //append elements
            document.body.append(resultDiv);
            resultDiv.append(resultText);
            resultDiv.append(resultLink);
        }
    },
});
