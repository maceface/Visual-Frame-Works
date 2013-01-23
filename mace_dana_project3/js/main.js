/* Dana Mace
VFW TERM 1301
Project 2
January 16, 2013
main.js page*/

// Main Function Ensures DOM content is loaded and ready
window.addEventListener("DOMContentLoaded", function(){
    
    //getElementByID function
    function whatever(x){
        var beHappy = document.getElementById(x);
        return beHappy;
    }
    
    function doGroup(){
        var doTag = document.getElementsByTagName("form");
            pickAList = whatever('colors');
            justPickSomething = document.createElement('select');
            justPickSomething.setAttribute("id", "happyColorGroups");
        for(var i=0, j=happyColorGroups.length; i<j; i++) {
            var doOpt = document.createElement('option');
            var doText = happyColorGroups[i];
            doOpt.setAttribute("value", doText);
            doOpt.innerHTML = doText;
            justPickSomething.appendChild(doOpt);
        }
        pickAList.appendChild(justPickSomething);
        
    }
    
    //Get Checkbox Value
    function getCheckboxValue(){
        if(whatever('flowers').checked){
            flowersCheck = whatever('flowers').value;
        }else{
            flowersCheck = "No"
        };
        if(whatever('sunshine').checked){
            sunshineCheck = whatever('sunshine').vaulue;
        }else{
            sunshineCheck = "No"
        };
        if(whatever('stars').checked){
            sunshineCheck = whatever('stars').vaulue;
        }else{
            sunshineCheck = "No"
            if(whatever('moon').checked){
            sunshineCheck = whatever('moon').vaulue;
        }else{
            sunshineCheck = "No"
        if(whatever('grass').checked){
            sunshineCheck = whatever('grass').vaulue;
        }else{
            sunshineCheck = "No"
        if(whatever('birds').checked){
            sunshineCheck = whatever('birds').vaulue;
        }else{
            sunshineCheck = "No"
        };
    }
    
        //Display Grat data on other page
    function toggleControls(n){
        switch(n){
            case "on":
                whatever('gratitudeForm').style.display = "none";
                whatever('clearGrat').style.display = "inline";
                whatever('displayGrat').style.display = "none";
                whatever('addNewGrat').style.display = "inline";
                break;
            case "off":
                whatever('gratitudeForm').style.display = "block";
                whatever('clearGratForm').style.display = "inline";
                whatever('displayGrat').style.display = "inline";
                whatever('addNewGrat').style.display = "none";
                whatever('choices').style.display = "none";
                break;
            default:
                return false;
        }
    }
     
    //Store Grat in Local Storage
    function storeLocally(){
        var gratId = Math.floor(Math.random()*123400001);
        getCheckboxValue();
        //Store form field values in an object
        //Objects props - array with form labels and input values
        var choice = {};
            choice.date = ["Date:", whatever('date').value];
            choice.time = ["Time:", whatever('time').value];
            
            choice.what = ["What I'm grateful for:", whatever('gratitude').value];
            
            choice.why = ["I have an attitude of gratitude because:", whatever('gratStory').value];
            
            choice.color = ["What color do you like best today?:",  whatever('happyColorGroups').value];
            
            choice.flowersCheck = ["Flowers", flowersCheck];
            choice.sunshineCheck = ["Sunshine", sunshineCheck];
            choice.starsCheck = ["Stars", starsCheck];
            choice.moonCheck = ["Moon", moonCheck];
            choice.grassCheck = ["Grass", grassCheck];
            choice.birdsCheck = ["Birds", birdscheck];
            
    //Save data to local storage: conv obj to a string
        localStorage.setItem(gratId, JSON.stringify(choice));
        alert("Gratitude Added!");
    }
        
    //Function to see local storage data
    function showMeWutchaGot (){
        toggleControls("on");
        if(localStorage.length === 0) {
            alert("There are no Gratitudes in your library.");
        }
        
        //From local to browser
        var makeConversion = document.createElement('div');
        makeConversion.setAttribute("id", "choice");
        var makeLi = document.createElement('ul');
        makeConversion.appendChild(makeLi);
        document.body.appendChild(makeConversion);
        whatever('choice').style.display = "block";
        for(var i=0, len=localStorage.length; i<len;i++) {
            var doList = document.createElement('li');
            var linksLi = document.createElement('li');
            makeLi.appendChild(doList);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            
            //Local storage back to object
            var obj = JSON.parse(value);
            var makeAnotherLi = document.createElement('ul');
            doList.appendChild(makeAnotherLi);
            for(var n in obj) {
                var makeSubli = document.createElement('li');
                makeAnotherLi.appendChild(makeSubli);
                var optSubText = obj[n][0] + " " + obj[n][1];
                makeSubli.innerHTML = optSubText;
                makeAnotherLi.appendChild(linksLi);
            }
        }
        doGroup(localStorage.key(i), linksLi);
    }    
    
    //Function - erase grats in local
    function getOffMyDevice(){
        if(localStorage.length === 0){
            alert("There are no gratitudes to delete.");
        }else{
            localStorage.clear();
            alert("All gratitudes have been deleted!");
            window.location.reload();
            return false;
        }
    }
    
    //Variable defaults
    var happyColorGroups = ["--Colors--", "yellow", "pink", "blue", "green", "red"],
        whatGotChecked
    ;
    doGroup();
       
    //Set link and submit click events
    var displayGrat = whatever("displayGrat");
    displayGrat.addEventListener("click", showMeWutchaGot);
    var clearGrat = whatever("clearGrat");
    clearGrat.addEventListener("click", getOffMyDevice);
    var saveGrat = whatever("saveGrat");
    saveGrat.addEventListener("click", storeLocally);
});