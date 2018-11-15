// 1
  	window.onload = (e) => {document.querySelector("#search").onclick = getData};
	
//2
    let displayTerm = "";
	
//establish randomized blog data
//right now we'll just have 3 random greetings
let greeting = ["Hello there my name is ", "Greetings humans, I am ", "I am the dog known as "];


function getData()
        {
            //This allows us to only get images from the dog api
            const DOG_URL = "https://random.dog/woof?filter=mp4,webm";
            
            //Get the user input to display later.
            displayTerm = document.querySelector("#searchterm").value;
            
            //make sure there's actually a term to ""search""
            if( displayTerm.length < 1 ) return; //bail out if there's no term input
            
            //update the UI
            document.querySelector("#content").innerHTML = "<b>Searching for " + displayTerm + " the dog</b>";
            
            let url = DOG_URL;
            
            
            
            $.ajax(
            {
                dataType: "html",
                url: url,
                data: null,
                success: jsonLoaded 
            });
        }

function jsonLoaded(obj)
{
    
    if( obj.length == 0 ) //we should never hit this code, but it's always good to have a backup
    {
            document.querySelector("#content").innerHTML = `<p><i>No dogs named '${displayTerm}' apparently</i></p>`;
            $("#content").fadeIn(500);
            return; 
    }
    //the result should be an image.
    let image = "https://random.dog/" + obj;
    let greet = Math.floor(Math.random() * 3); // returns number from 0 to 2
    
    document.querySelector("#content").innerHTML = `<div class='result'><img src='${image}' title= '${displayTerm}'/> <p>${greeting[greet]} ${displayTerm} </p></div>`
    
}
