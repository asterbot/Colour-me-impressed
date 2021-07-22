const slider=document.getElementById("slider");

const root=document.documentElement;

document.addEventListener('DOMContentLoaded',function(){
    document.getElementById('changebutton').addEventListener('click',change,false) 
    function change(){      
        let val=document.getElementById("textInput").value;
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {"val": val});
           });
        console.log(val);
        // chrome.storage.sync.set({'val':val}, function() {
        //     console.log('Settings saved');
        //     chrome.tabs.executeScript({
        //         file: "content.js"
        //     });
            
        //   });

        //changes value when the button is clicked
        if (val>=0 && val<=360){                                  //checks if value is in range 
            document.getElementById("demo").innerHTML="Value:"+val;
            document.getElementById("slider").value=val;
            root.style.setProperty("--hue_value",val+"deg")
        }
        else{
            window.alert("Enter value between 0 and 360")       //returns alert if value is not in range
            val=document.getElementById("slider").value;
            document.getElementById("textInput").value=val;    //resets value of text input to slider value
        }
    }
},false)


slider.addEventListener("input",(e)=>{    
	root.style.setProperty("--hue_value", e.target.value + "deg");//every time the slider value is changed, the image's hue value is updated
	document.getElementById("demo").innerHTML='Value:'+e.target.value; //values are shown in text field/inputs
	document.getElementById("textInput").value=e.target.value;
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"val": e.target.value});
       });
	});


var input = document.getElementById("textInput"); //Enter key
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("changebutton").click();
  }
});


