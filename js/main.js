// 1
  	window.onload = (e) => {document.querySelector("#search").onclick = getData};
	
//2
    let displayTerm = "";

//Let's make an array for the blogpost content
let posts = ["Man I just love making these prototypical posts, they are so very fun to make", 
           "A squrl ran past me today, it was very eciting. Have you done anything exciting today?", 
           "Drank some of that good water this morning, and yesterday, and the day before #stayhydrated",
           "My owner threw a stick, I did n\'t see where it landed so I ended up just running in a circle for an hour as my owner watched.",
           "I haven\'t seen my parents in a long time, wonder what they\'re up to",
           "I met another dog at the park today. She is very fun, she likes to run fast, we are already best friends.",
           "How many more of these do I have to ride Drake? How many before you\'re satisfied with my work? ", 
           "I haven\'t seen my owner in a long long long long long long long long time, it\'s already been five minutes.",
           "Saw a pug today, they\'re cool.",
           "Wow I can\'t believe I wrote all that, I must be some literary genius."];

//Establish globals
let age = 0;
let interest ="";
//establish randomized blog data
//right now we'll just have 3 random greetings
let greeting = ["Hello there my name is ", "Greetings humans, I am ", "I am the dog known as "];


function getData()
        {
            //This allows us to only get images from the dog api
            const DOG_URL = "https://random.dog/woof?filter=mp4,webm";
            
            //Get the user input to display later.
            displayTerm = document.querySelector("#searchterm").value;
            age = document.querySelector("#age").value;
            interest= document.querySelector("#interest").value;
            //make sure there's actually a term to ""search""
            if( displayTerm.length < 1 ) return; //bail out if there's no term input
            
            //update the UI
            document.querySelector("#column1").innerHTML = "<b>Searching for " + displayTerm + " the dog</b>";
            
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
    
    let day = randDate();
    document.querySelector("#column1").innerHTML = `<div class='result'><img src='${image}' title= '${displayTerm}'/> <p>${greeting[greet]} ${displayTerm}</p><p>Interests: ${interest}</p><p>Age: ${age}</p></div>`
    let content = "<div class='result'>";
    //document.querySelector("#column2").innerHTML = `<div class='result'><p>${day}</p></div>`
    /*  */
    for( let i =0; i<5; i++ )
        {
            let result = "";
            let newDay = randDate();
            let blogentry = posts[random(0,9)];
            result = "<h1>" + newDay + "</h1><p>" + blogentry + "</p>";
            content += result;
        }
    content += "</div>"
    document.querySelector("#column2").innerHTML = `${content}`;
    
}

function random(low, cieling)
{
    return Math.floor( (Math.random()* cieling) + low);  
}

function randDate()
{
    //Make an array of the months
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    //days and years are just random 
    let monthNum = random(0, 11);
    let day;
    if( monthNum == 1 )//Feburary
    {
        day = random(1,28);
    }
    else
    {
        day = random(1,30);
    }
    let year = random( 2018 - age, age);
    let fullDate = months[monthNum] + " " + day.toString() + ", " + year.toString();
    return fullDate;
    
}
