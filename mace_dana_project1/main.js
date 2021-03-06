/* Dana Mace
VFW Term 1301
Project 2
January 16, 2013
main.js Page*/

// Main Function That Ensures All DOM Content is Loaded and Ready
window.addEventListener("DOMContentLoaded", function(){
        
    //getElementByID function
    function $(x){
    var theEl = document.getElementById(x)
    return theEl;
    };
    
    //Function to see local storage data
    function showGrat () {
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
        $('choices').style.display = "block";
        for(var i=0, len=localStorage.length; i<len;i++) {
            var makeLi = document.createElement('ol');
            makeLi.appendChild(makeLi);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
        
            //Local storage back to object
            var obj = JSON.parse(value);
            var makeAnotherLi = document.createElement('ul');
            makeLi.appendChild(makeAnotherLi);
            for(var n in obj) {
                var makeSubli = document.createElement('li');
                makeAnotherLi.appendChild(makeSubli);
                var optSubText = obj[n][0]+" "+obj[n][1];
                makeSubli.innerHTML = optSubText;
            }
        }
    };
    
    //Display Grat data on other page
    function toggleControls(n){
        switch(n){
            case "on":
                $('addGratForm').style.display = "none";
                $('clearGrat').style.display = "inline";
                $('displayGrat').style.display = "none";
                $('addAnotherGrat').style.display = "inline";
                break;
            case "off":
                $('addGratForm').style.display = "block";
                $('clearGrat').style.display = "inline";
                $('displayGrat').style.display = "inline";
                $('addNewGrat').style.display = "none";
                $('choices').style.display = "none";
                break;
            default:
                return false;
        }
    };
    
    //Store Grat in Local Storage
    function storeGrat(){
        var gratId = Math.floor(Math.random()*100000001)
        
        //Store form field values in an object
        //Object props - array with form labels and input values
        var choice = {};
        choice.date = ["Date:", $('date').value ];
        choice.time = ["Time:", $("time").value];
        choice.what = ["What I'm grateful for:", $("what").value];
        choice.why = ["I have an attitude of gratitude because:", $("why").value];
        choice.color = ["What color do you like best today?:", getFavValue()];
        
        //Get CheckBox Value
        function getFavValue(){
            if($('fav').checked){
                favValue = $('fav').value;
            } else {
                favValue = "No"
            }
        return favValue;
        };
        
        //Save data to local storage: conv object to a string
        localStorage.setChoice(gratId, JSON.stringify(choice));
        alert("Gratitude Added!");
    };
    
    //Function - erase grats in local
    function clearLibrary(){
        if(localStorage.length === 0){
            alert("There are no gratitudes to delete.")
        } else {
            localStorage.clear();
            alert("All gratitudes have been deleted.");
            window.location.reload();
            return false;
        }
    };
    
    //Set link and submit click events
    var displayGrat = $("displayGrat");
    displayGrat.addEventListener("click", showGrat);
    var clearGrat = $("clearGrat");
    clearGrat.addEventListener("click", clearLibrary);
    var saveGrat = $("saveGrat");
    saveGrat.addEventListener("click", storeData);
    
});