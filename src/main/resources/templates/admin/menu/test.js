const button = document.getElementById("myButton");
            const div = document.getElementById("myDiv");

            button.addEventListener("click", function () {
                //  div.style.display = ""; 
                // display 속성을 ""로 변경하여 보여줌

                if (div.style.display === "none") {
                    div.style.display = "block";
                } else {
                    div.style.display = "none";
                }
            });