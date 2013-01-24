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
            makeSelect = document.createElement('select');
            makeSelect.setAttribute("id", "happyColorGroups");
        for(var i=0, j=happyColorGroups.length; i<j; i++) {
            var doOpt = document.createElement('option');
            var doText = happyColorGroups[i];
            doOpt.setAttribute("value", doText);
            doOpt.innerHTML = doText;
            makeSelect.appendChild(doOpt);
        }
        pickAList.appendChild(makeSelect);
        
    }
    
    //Get Checkbox Value
    function getCheckboxValue(){
        var myCheckboxes = whatever("gratitudeForm").items;
        savedChecks = [ ];
        for(i=0; i<myCheckboxes.length; i++){
            if(myCheckboxes[i].checked){
                whatGotChecked = myCheckboxes[i].value;
                savedChecks.push(whatGotChecked);
            }
        }
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
                whatever('clearGrat').style.display = "inline";
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
        var gratId = Math.floor(Math.random()*123456789);
        getCheckboxValue();
        //Store form field values in an object
        //Objects props - array with form labels and input values
        var choice = {};
            choice.date = ["Date:", whatever('date').value];
            choice.time = ["Time:", whatever('time').value];
            
            choice.what = ["What I'm grateful for:", whatever('gratitude').value];
            
            choice.why = ["I have an attitude of gratitude because:", whatever('gratStory').value];
            
            choice.color = ["What color do you like best today?:",  whatever('happyColorGroups').value];
            
            choice.items = ["Which items make you happy?", savedChecks];
            
            choice.scale = ["Rate your Attitude of Gratitude:", whatever('scaleIt').value];
            
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
        makeConversion.setAttribute("id", "choices");
        var makeLi = document.createElement('ul');
        makeConversion.appendChild(makeLi);
        document.body.appendChild(makeConversion);
        whatever('choices').style.display = "display";
        for(var i=0, len=localStorage.length; i<len;i++) {
            var doList = document.createElement('li');
            var linksLi = document.createElement('li');
            makeLi.appendChild(doList);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            
            //Local storage back to object
            var obj = JSON.parse(value);
            var makeSubList = document.createElement('ul');
            doList.appendChild(makeSubList);
            for(var n in obj) {
                var makeSubli = document.createElement('li');
                makeSubList.appendChild(makeSubli);
                var optSubText = obj[n][0] + " " + obj[n][1];
                makeSubli.innerHTML = optSubText;
                makeSubList.appendChild(linksLi);
            }
            makeItemLinks(localStorage.key(i), linksLi); //Create our edit and delete buttons/link for each item in local storage
        }
    }
    
    //Make Item Links
    //Creat the edit and delete links for each stored item when displayed
    function makeItemLinks(key, linksLi){
        //add edit single item link
        var editLink = document.createElement('a');
        editLink.href = "#";
        editLink.key = key;
        var editText = "Edit Journal";
        editLink.addEventListener("click", editItem);
        editLink.innerHTML = editText;
        linksLi.appendChild(editLink);
        
        //add line break
        var breakTag = document.createElement('br');
        linksLi.appendChild(breakTag);
        
        //add delete single item link
        var deleteLink = document.createElement('a');
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Delete Gratitude";
        //deleteLink.addEventListener("click", deleteItem);
        deleteLink.innerHTML = deleteText;
        linksLi.appendChild(deleteLink);
    }
    
    function editItem(){
        //Grab the data from our item from Local Storage.
        var value = localStorage.getItem(this.key);
        var choice = JSON.parse(value);
        
        //show the form
        toggleControls("off");
        
        //populate the form fields with the current local storage values
        whatever('date').value = choice.date[1];
        whatever('time').value = choice.time[1];
        whatever('gratitude').value = choice.what[1];
        whatever('gratStory').value = choice.why[1];
        whatever('happyColorGroups').value = choice.color[1];
        var myCheckboxes = whatever("gratitudeForm").items;
        savedChecks = [ ];
        for(i=0; i<myCheckboxes.length; i++){
            if(myCheckboxes[i].checked){
                whatGotChecked = myCheckboxes[i].value;
                savedChecks.push(whatGotChecked);
                myCheckboxes[i].setAttribute("checked", "checked");
            }
        whatever('scaleIt').value = choice.scale[1];
        }
       
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
        whatGotChecked,
        savedChecks
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