# Review for Unit 4 - Web APIs 🤩

## The Window Object 
 - [W3Schools Reference](https://www.w3schools.com/jsref/obj_window.asp)
 - [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Window)
 - Global object that represents the browser window/tab, contains all of web APIs
 - Various properties/methods that are globally available to the JavaScript code, such as the document object, localStorage, setTimeout, confirm, etc. etc.
 - **All** of window's properties/methods can be accessed by **window.nameOfProperty**, or directly like localStorage, setTimeout, document, since they're also globally available.

## The Document Object
 - [W3Schools Reference](https://www.w3schools.com/jsref/dom_obj_document.asp)
 - [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/Document)
 - An object representation of the html page/document currently running in the browser. A property of the window object - window.document, but can be referenced directly because it's a global variable mentioned above.
 - Contains all of **DOM(Document Object Model)** APIs
 - All HTML elements on the page are represented children/descendants of the document object, forming a DOM Tree - [Example](https://miro.medium.com/max/950/0*Sk5AAj4ze_bDFPA0.png)
 - Useful properties and methods for accessing/manipulating any part of the DOM

Properties can be accessed directly and assigned new values by traversing the DOM tree like a normal object e.g. -
```
document.body.style.background = "purple";
```
^ this will change the css property 'background' of the body element inside our HTML document to "purple", and the browser will update/repaint the display accordingly.
 
### Selector Methods

#### [querySelector](https://www.w3schools.com/jsref/met_document_queryselector.asp)
```
document.querySelector("div") - Selects the first <div> element on the page
document.querySelector(".foo") - Selects the first element with the class name 'foo' on the page
document.querySelector("#bar") - Selects the first element with the id 'bar' on the page
```

#### [querySelectorAll](https://www.w3schools.com/jsref/met_document_queryselectorall.asp)
```
document.querySelectorAll("div") - Selects ALL <div> elements on the page, 
returns them in a node list (indexed/iterable like an array, but without array methods)

document.querySelectorAll(".foo") - Selects All elements with the class name 'foo' on the page, 
returns them in a node list also
```

#### [getElementById](https://www.w3schools.com/jsref/met_document_getelementbyid.asp)
```
document.getElementById("bar") - equivalent to document.querySelector("#bar"),
Selects the first element with the id 'bar' on the page
```

#### [getElementsByClassName](https://www.w3schools.com/jsref/met_document_getelementsbyclassname.asp)
```
document.getElementsByClassName("foo") - equivalent to document.querySelectorAll(".foo"),
Selects All elements with the class name 'foo' on the page, returns them in a node list also
```

#### A couple more that you can explore
- [getElementsByName](https://www.w3schools.com/jsref/met_doc_getelementsbyname.asp)
- [getElementsByTagName](https://www.w3schools.com/jsref/met_document_getelementsbytagname.asp)


### Creating Dynamic HTML Elements

- [createElement method](https://www.w3schools.com/jsref/met_document_createelement.asp)
- [append method](https://developer.mozilla.org/en-US/docs/Web/API/Element/append)
- [appendChild method](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)

```
document.createElement("div")
``` 
> will create an empty div element.

```
var myDiv = document.createElement("div");
myDiv.innerHTML = "What is love?";
document.body.append(myDiv);
^ can also use document.body.appendChild();
```
> we typically store the created element in a variable to be able to reference/modify it. The variable myDiv represents the newly created div element. We then assign a value 'What is love?' to its 'innerHTML' property. Lastly we need to append this new element to an existing element on the html page in order for it to show. The **append** or **appendChild** method is available to all HTML elements that can have children/child nodes inside of it, so this would exclude a few elements like input or img. After those lines of code, we will see a new div element with the text 'What is love?' added to the end of our 'body' element.

### Event Handling
To create interactive websites, we utilize event listeners to respond to different user actions on the html document, this includes keyboard input, scrolling, clicking on an element, submitting a form, etc.

Event listeners are attached to a specific DOM element that calls the 'addEventListener' method. It takes in 2 parameters - the type of event, and the callback/handler function when event is triggered. e.g.

```
document.addEventListener("click", function(){})
```
> This creates an event listener for the *click* action on the entire html document, since it's being invoked by the document object. When a user clicks on any part of the document, the callback function will be invoked. In this case running an empty code block, but it will be called nonetheless each time the *click* happens.

```
document.querySelector("h1").addEventListener("click", function(){
    console.log("You clicked the h1 element!")
})
```
> This example uses the querySelector to select the first *h1* element on the page, before calling the addEventListener method. Assuming that there is an h1 element on the page, the selected h1 element/object is the one that invokes the addEventListener() method. This means that the event is attached to the h1 element and NOTHING else. The callback function which outputs 'You clicked the h1 element!' to the console will only run when that particular h1 element is being clicked on.

#### Default Event Behaviors
**Certain events are also only available to specific types of html elements**

For example - 
```
<form action="./code.html">
    <input type="text" />
    <button type="submit">CLICK TO SUBMIT FORM</button>
</form>
```

> This button with the 'type' attribute = 'submit', can emit a 'submit' event on a parent form element when clicked on.

```
document.querySelector("form").addEventListener("submit", function(event){
    event.preventDefault();
})
```

> An 'event' object is passed as a parameter into every event callback function, regardless of the type of event listener. We use it to gain context of the details of an event - i.e. what key was pressed in a keyboard event, which element was clicked on in a click event, etc. We can also access methods like preventDefault() seen above to stop the default behavior of a particular element when an event is triggered.

> In this example, when a form element gets a submit event, its default behavior is to refresh the entire html page. If we want to stop this behavior when a form is submitted, we can invoke event.preventDefault().

#### Event Bubbling
**Certain events propagate up the DOM tree, such as the 'click' event.**

Consider this example (also provided in bubble.html) -
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <style>
    * {
      margin: 0;
      padding: 0;
      font-size: 50px;
      text-align: center;
    }
    .outer {
      padding: 100px;
      background: blue;
    }

    .middle {
      height: 500px;
      padding: 50px;
      background: red;
    }

    .inner {
      height: 200px;
      width: 200px;
      background: gold;
      margin:auto;
    }
  </style>
  <body>
    <div class="outer">
      OUTER
      <div class="middle">
        MIDDLE
        <div class="inner">INNER</div>
      </div>
    </div>
  </body>
  <script>
    function qs(tag) {
      return document.querySelector(tag);
    }

    //LISTENER 1
    qs(".outer").addEventListener("click", function (event) {
      event.target.style.background = "purple";
    });

    //LISTENER 2
    qs(".middle").addEventListener("click", function (event) {
      event.currentTarget.style.background = "pink";
    });

    //LISTENER 3
    qs(".inner").addEventListener("click", function (event) {
      event.currentTarget.style.background = "green";
    });

  </script>
</html>
```

> We've created a click event listener for each of .outer, .middle, and .inner elements. 

***CLICKING THE INNER ELEMENT***
> When we click the inner element, the click event LISTENER 3 will trigger, which then will run the callback function that modifies the background css property of the **currentTarget** of the event to 'green'. **event.currentTarget** is the element currently listening in on the event. **NOT NECESSARILY** the element that **TRIGGERED** the event. In this case the element listening on the event is the same as the element that triggered the 'click' event, so it will turn the .inner element's background color to green.

> NEXT, the click event will bubble up to the .middle element, because it's the next ancestor. It will trigger LISTENER 2, in which case sets the background of the currentTarget of the listener - the .middle element to 'pink'.

> LASTLY, the click event once again bubbles up from the .middle element to the .outer element, because it's the next ancestor. It will trigger LISTENER 3. In this function instead of using **event.currentTarget** we are using **event.target**. event.target refers to the original target that triggered the event, *NOT* the current element that the listener function is attached to. This refers back to the .inner element because that's where the 'click' event started. This will set the background property of the .inner element to 'purple' from 'green'.

> What we end up with is the following - outer:blue, middle:pink, inner:purple when we click on the .inner element.

**The event object also has a stopPropagation() method that can stop the event from bubbling up**

> Try clicking on other elements and modifying the code by invoking *event.stopPropagation()* in various places to see if you can predict the behavior of the elements changing colors


### setAttribute Method

- [W3Schools](https://www.w3schools.com/jsref/met_element_setattribute.asp)
- [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute)

A DOM element can use the setAttribute() method to create/update any properties/attributes it has.

```
var mySpan = document.querySelector("span");
mySpan.setAttribute("id", "foo");
```
> We select the first 'span' element on the page, and use the setAttribute method to create a new id attribute with the value of 'foo'. The setAttribute method takes in a name and value params, and creates or updates the attribute with that name on the element to the value param passed in. If the span element already has an id, it will be replaced with "foo", otherwise it will create an id attribute with the value "foo"

Consider this example -

```
var mySpan = document.querySelector("span");
mySpan.setAttribute("asdfw", "foo");
mySpan.setAttribute("style", "color: green; font-size: 50px");
```
> We can also create arbitrary attributes on an element using setAttribute(), as well as update the style attribute, or any other properties on a DOM element.

Data attributes -
```
var mySpan = document.querySelector("span");
mySpan.setAttribute("data-foo", "bar");
```
> When creating an attribute using the 'data-name' pattern, this will create a data attribute 'name', with the value passed in. In the example above, it creates a data attribute called "foo" and its value "bar". The significance of this is that all data attributes will get organized into a separate 'dataset' property on this DOM element. 

> The dataset property is an object that contains key-value pairs of all the data attributes on the element. For the example above, mySpan.dataset will be 
```
{
    foo: "bar"
}
```
> This object will store additional key-value pairs if there are other data attributes on the element.
```
{
    key: "val",
    key2: "val2",
    ...
}
```

[MDN Resource](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes)



## localStorage API
[W3Schools Resource](https://www.w3schools.com/jsref/prop_win_localstorage.asp)
[MDN Resource](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

localStorage is a tool in the Web API that allows JavaScript to store data on the user's machine, through the browser. This is particularly useful to save/restore information on the user's interactions across multiple visits of the website, and enhance the user experience. It stores data via key-value pairs.

### setItem()
localStorage.setItem() takes in 2 parameters - key and value, and creates an entry in the storage with those key-value pairs. e.g.
```
localStorage.setItem("myHump", "lovely little lumps");
```
> this will create an entry with the key 'myHump' which will be used to look up its value - 'lovely little lumps'.

### getItem()
localStorage.getItem() takes in 1 parameter - the key, and returns the value after looking it up in the storage API. It will return null if nothing with the key provided is found. e.g.
```
var myData = localStorage.getItem("myHump");
console.log(myData)
```
> localStorage.getItem("myHump") will return "lovely little lumps" provided we stored that key-value pair earlier by using setItem(), and is stored in variable myData. The console.log() should print "lovely little lumps"

### Storing complex objects(not primitives)
localStorage only stores values in the format of STRINGS. This presents an issue when we want to store an object like below - 
```
var myObjectToStore = {
    foo: "foo",
    bar: "bar",
    bing: "bong"
}
```
trying to store the object AS-IS by doing localStorage.setItem("myObj", myObjectToStore) will result in the value being stored as `[Object object]` because localStorage cannot interpret objects as strings.

This is where JSON (JavaScript Object Notation) comes in handy

[JSON W3Schools](https://www.w3schools.com/js/js_json_intro.asp)
[MDN Resource](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)

#### JSON.stringify()
JSON is a formatting standard that converts/serializes complex JS data structures - objects, arrays, etc. into a string format in order for data to travel from one place to another.

It is also reversible so once data is out of transit, its original context (object, array, array of objects, etc.) can be restored, and used in JavaScript

```
var myObjectToStore = {
    foo: "foo",
    bar: "bar",
    bing: "bong"
}

var myObjAsJSONString = JSON.stringify(myObjectToStore);
console.log(myObjAsJSONString)
```

> In code above, JSON.stringify() takes in myObjectToStore and converts it into a JSON string. it will look something like this when logged -

```
{
    "foo": "foo",
    "bar": "bar",
    "bing": "bong"
}
```
> This looks very similar to its JavaScript Object counterpart, but now can be serialized or treated as a string like so - "{"foo":"foo","bar":"bar","bing":"bong"}" we can now store this JSON string in localStorage by doing localStorage.setItem("myData", myObjAsJSONString)

#### JSON.parse()
When using JSON strings in JavaScript, their original context needs to be restored, otherwise JS will treat it like a regular string. To do this we use the JSON.parse() method. JSON.parse() takes in a JSON string as parameter and converts it back to its original shape in JavaScript. Consider the following example -

```
var myData = localStorage.getItem("myData");

console.log(myData);
At this point myData is still the JSON string we converted to when storing in localStorage - {"foo":"foo","bar":"bar","bing":"bong"}

var myDataParsed = JSON.parse(myData);
By doing JSON.parse(myData), it returns the original object that was stringified, and we will get something like this -

{
    foo: "foo",
    bar: "bar",
    bing: "bong"
}

restoring the original object that we created
```

## setTimeout & setInterval
These two functions in the web API allow us to queue functions to be executed at a later time, after a delay.

### setTimeout
[W3Schools](https://www.w3schools.com/jsref/met_win_settimeout.asp)
[MDN](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)

window.setTimeout() or setTimeout() takes in two parameters - a callback function to enqueue and a delay value in milliseconds. After the delay is done, the function will be executed ONE TIME.

```
setTimeout(function(){
    alert("Time flies when you are coding!")
}, 10000)
```
> 10000ms or 10 seconds after setTimeout is invoked, our callback function will run sending an alert "Time flies when you are coding!" to the window

### setInterval
[W3Schools](https://www.w3schools.com/jsref/met_win_setinterval.asp)
[MDN](https://developer.mozilla.org/en-US/docs/Web/API/setInterval)

setInterval() method takes in two parameters - a callback function to enqueue to be called *repeatedly* and an interval value in milliseconds. The function will be called EACH TIME the interval time passes.

```
setInterval(function(){
    console.log("This is a song that never ends, and it goes on and on my friend...")
}, 1000)
```

> code above creates an active repeating loop to call the function every 1000ms or 1 second. So we will see the console output "This is a song that never ends, and it goes on and on my friend..." every second until the interval is canceled


## Some Helpful Utility Functions

### document.querySelector
```
function qs(tag){
    return document.querySelector(tag)
};
```

with this function we can use qs("div") instead of document.querySelector("div")
to select the first div element in our HTML.

- qs(".classNameHere")
- qs("#someIdHere")
- ...

### document.createElement
```
function el(tag){
    return document.createElement(tag)
}
```

with this function we can use el("div") instead of document.createElement("div")
to create a div element when dynamically generating html elements.

- el("span")
- el("img")
- el("section")
- ...

### timer function to count down once per second
```
var currentTime = 60;
var timer = setInterval(countDown, 1000);

function countDown(){
    currentTime--;
    console.log("current time is --- " + currentTime);
}

// clearInterval(timer) will stop the timer from running
```

We set up an interval to call the 'countDown' function every 1 second. Each time the function is called, it will decrement currentTime by 1, and then log the current time. We can also call clearInterval(timer) and pass timer variable into it, which will stop the countDown function from running. 