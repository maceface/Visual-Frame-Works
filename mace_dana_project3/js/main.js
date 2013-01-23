/* Dana Mace
VFW TERM 1301
Project 2
January 16, 2013
main.js page*/

// Main Function Ensures DOM content is loaded and ready
window.addEventListener("DOMContentLoaded", function(){
    
    //getElementByID function
    function $(x){
        var theEl = document.getElementById(x);
        return theEl;
    }
    
    function doGroup(){
        var doTag = document.getElementsByTagName("form");
            selectLi = $('colors');
            makeSelect = document.createElement('select');
            makeSelect.setAttribute("id", "colorsGroups");
        for(var i=0, j=colorsGroups.length; i<j; i++) {
            var doOpt = document.createElement('option');
            var doText = colorsGroups[i];
            doOpt.setAttribute("value", doText);
            doOpt.innerHTML = doText;
            makeSelect.appendChild(doOpt);
        }
        selectLi.appendChild(makeSelect);
    }
    
    //Get Checkbox Value
    function getCheckboxValue(){
        if($('items').checked){
            checkedValue = $('items').value;
        }
    }
    
        //Display Grat data on other page
    function toggleControls(n){
        switch(n){
            case "on":
                $('gratitudeForm').style.display = "none";
                $('clearGrat').style.display = "inline";
                $('displayGrat').style.display = "none";
                $('addNewGrat').style.display = "inline";
                break;
            case "off":
                $('gratitudeForm').style.display = "block";
                $('clearGratForm').style.display = "inline";
                $('displayGrat').style.display = "inline";
                $('addNewGrat').style.display = "none";
                $('choices').style.display = "none";
                break;
            default:
                return false;
        }
    }
     
    //Store Grat in Local Storage
    function storeData(){
        var gratId = Math.floor(Math.random()*100000001);
        getCheckboxValue();
        //Store form field values in an object
        //Objects props - array with form labels and input values
        var choice = {};
            choice.date = ["Date:", $('date').value];
            choice.time = ["Time:", $('time').value];
            
            choice.what = ["What I'm grateful for:", $('gratitude').value];
            
            choice.why = ["I have an attitude of gratitude because:", $('gratStory').value];
            
            choice.color = ["What color do you like best today?:",  $('colorsGroups').value];
            
            choice.items = ["Which items make you happy?", checkedValue];
    //Save data to local storage: conv obj to a string
        localStorage.setItem(gratId, JSON.stringify(choice));
        alert("Gratitude Added!");
    }
        
    //Function to see local storage data
    function showGrat (){
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
        $('choices').style.display = "display";
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
            }
        }
    }    
    
    //Function - erase grats in local
    function clearLibrary(){
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
    var colorsGroups = ["--Colors--", "yellow", "pink", "blue", "green", "red"],
        colors
    ;
    doGroup();
       
    //Set link and submit click events
    var displayGrat = $("displayGrat");
    displayGrat.addEventListener("click", showGrat);
    var clearGrat = $("clearGrat");
    clearGrat.addEventListener("click", clearLibrary);
    var saveGrat = $("saveGrat");
    saveGrat.addEventListener("click", storeData);
});