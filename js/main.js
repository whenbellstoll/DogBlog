// 1
  	window.onload = load;
    document.querySelector("#search").onclick = getData;
//2
    let displayTerm = "";

//Let's make an array for the blogpost content
let posts = ["Man I just love making these prototypical posts, they are so very fun to make", 
           "A squrl ran past me today, it was very eciting. Have you done anything exciting today?", 
           "Drank some of that good water this morning, and yesterday, and the day before #stayhydrated",
           "My owner threw a stick, I did n\'t see where it landed so I ended up just running in a circle for an hour as my owner watched.",
           "I haven\'t seen my parents in a long time, wonder what they\'re up to",
           "I met another dog at the park today. She is very fun, she likes to run fast, we are already best friends.",
           "My best fren came over to play with me today. He stole my bone.",
           "I watched the dog show today. LeDog James is so talented!",
           "My owner took me to the pool today. Water is cool until you start swimming in it.",
           "I always beat my owner in a race until he gets on a bike.",
           "I dug a hole today!",
           "THE FLEAS THE FLEAS THE FLEAS",
           "Today the owner and I went camping. I climbed a squirrel up a tree.",
           "Woof bark bark woof abark arf arf ark book arfabark!",
           "Rrrrrrrrrrrrrrrrrrrrrrrrruff!",
           "Barkbarkawf arwrf bark bark roof bark arf bark!",
           "Bark arbv ark bark arf bark!",
           "Woof. Bark bark bark. Arf arfArrrrf bark. Woof bark!",
           "WOof bark bark aoarf ruff barek woof rarw rbark *snoooooooooooooze*",
           "Wppf barlarf bark arfbark roof bark arkbark!",
           "Bark!",
           "Woof!", 
           "Bark bark woof brurff bark woof bark woof!", 
           "Bark! Yerp ayhar bark woof wofo wofo berk bark rawr rbark bwaor woof", 
           "Bark! The doggo angels sing, glory to the new-born pup!", 
           "Ar fbark barka wafr boorf bark woof bark ararfarf aAAAAAAAAAAAa bark barkbark!", 
           "Woof bark awrb ark bark woof bark barkbark woof arg ruff ruff rawr XD bark woof bark!", 
           "AAAAAAAAAAAAAAAAAAAAAA", 
           "Bork bark barekbark afr bark woof ruf fruff abark bark wof rrrrrrrrrark barkb arok", 
           "Woof! Bark baorrk bark qwar fark fbark fark araarf",
           "I EAT JON ITS WHAT I DO", 
           "I haven\'t seen my owner in a long long long long long long long long time, it\'s already been five minutes.",
           "Saw a pug today, they\'re cool.",
           "I am the great traitor. There must be no other. Anyone who even thinks about deserting this mission will be cut up into 198 pieces. Those pieces will be stamped on until what is left can be used only to paint walls. Whoever takes one grain of corn or one drop of water… more than his ration, will be locked up for 155 years. If I want the birds to drop dead from the trees… then the birds will drop dead from the trees. I am the wrath of God. The earth I pass will see me and tremble. But whoever follows me and the river, will win untold riches. But whoever deserts…",
           "Do you want to know why I bark? Bites are too quick. You can’t savor all the… little emotions. In… you see, in their last woofs, doggos show you who they really are. So in a way, I know your friends better than you ever did. Would you like to know which of them were cowards?",
           "You should move to a small town, somewhere the rule of law still exists. You will not survive here. You are not a wolf, and this is a land of wolves now.",
           "My owner and I are bound together on a journey that will twist the very fabric of nature.",
           "Bones! The cornerstone of any nutritious breakfast.",
           "Even now, the evil seed of what you've done germinates within you.",
           "Their late work was a little too ‘new-wave’ for my taste, but when Beneful came out in ’01, I think they really came into their own – both commercially and artistically. The whole package has a clear, crisp taste, and a new sheen of consummate professionalism that really gives the food a big boost. It’s been compared to Kibbles 'n Bits, but I think Beneful has a far more sharper, powerful sense of flavor. Light 6",
           "Do you know what power you have unleashed you bumbling fool? Do you not understand the consquences of your actions? You have caused me great pain by coming here and looking at my face. My god it burns! Make it stop, please dear lord. What are you doing to me you sadistic monster? I am frozen in a state of perpetual burning, I have been roasted."];

//Establish globals
let age = 0;
let interest ="";
//establish randomized blog data
//right now we'll just have 3 random greetings
let greeting = ["Hello there my name is ", "Greetings humans, I am ", "I am the dog known as "];

function load()
{
    //
    //localStorage.setItem("refreshInterest", interest);
    //localStorage.setItem("refreshAge", age);
    document.getElementById("searchterm").value = localStorage.getItem("refreshName");
    document.querySelector("#age").value = localStorage.getItem("refreshAge");
    document.querySelector("#interest").value = localStorage.getItem("refreshInterest");
}

function getData()
        {
            //This allows us to only get images from the dog api
            const DOG_URL = "https://random.dog/woof?filter=mp4,webm";
            
            //Get the user input to display later.
            displayTerm = document.querySelector("#searchterm").value;
            age = document.querySelector("#age").value;
            interest= document.querySelector("#interest").value;
            //make sure there's actually a term to ""search""
            if( displayTerm.length < 1 ) 
            {
                document.querySelector("#column1").innerHTML = "<b>Hey, you need to actually search for a dog.</b>";
                return; //bail out if there's no term input
            }
            
            
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
    //check to see if this is a search that has been done before.
    if( displayTerm == localStorage.getItem("dogName" + displayTerm) && age == localStorage.getItem("dogAge" + displayTerm + age) && interest == localStorage.getItem("dogInterest" + displayTerm + interest + age) )
       {
           //if we already had this blog generated, let's pull it up on the screen.
           document.querySelector("#column1").innerHTML = localStorage.getItem("profile" + displayTerm + age + interest);
           document.querySelector("#column2").innerHTML = localStorage.getItem("content" + displayTerm + age + interest);
           
       }
       else
       {
           //the result should be an image.
        let image = "https://random.dog/" + obj;
        let greet = Math.floor(Math.random() * 3); // returns number from 0 to 2
        
        let day = randDate();
        let profile = `<div class='result'><img src='${image}' title= '${displayTerm}'/> <p>${greeting[greet]} ${displayTerm}</p><p>Interests: ${interest}</p><p>Age: ${age}</p></div>`;
        document.querySelector("#column1").innerHTML  = profile;
        
        localStorage.setItem("profile" + displayTerm + age + interest, profile);
        
        let content = "<div class='result'>";
        //document.querySelector("#column2").innerHTML = `<div class='result'><p>${day}</p></div>`
        /*  */
        for( let i =0; i<5; i++ )
            {
                let result = "";
                let newDay = randDate();
                let blogentry = posts[random(0,38)];
                result = "<h1>" + newDay + "</h1><p>" + blogentry + "</p>";
                content += result;
            }
        content += "</div>"
        document.querySelector("#column2").innerHTML = `${content}`;
        
        //Because we know this is a new dog blog, let's save it in the browser.
        localStorage.setItem("content" + displayTerm + age + interest, content);
        localStorage.setItem("dogName" + displayTerm, displayTerm);
        localStorage.setItem("dogAge"+ displayTerm + age, age);
        localStorage.setItem("dogInterest" + displayTerm + interest + age, interest);
        localStorage.setItem("refreshName", displayTerm);
        localStorage.setItem("refreshInterest", interest);
        localStorage.setItem("refreshAge", age);
       }
    
    
}

function random(low, cieling)
{
    return Math.floor( (Math.random()* cieling) + low);  
}

function randDate()
{
    //Make an array of the months
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
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
