# Pagify JS

## Include in your project

```
<script src="pagify.js"></script>
```

## Result of Pagify

* A Root HTML DOM element will be created, as defined by the 'parentDom' object
* Child DOM elements will be placed inside of that list, each with custom HTML as defined by you
* First, Previous, Next, and Last event listeners to navigate through the objects
* Max items per page definable


![Pagify Demo](demo.gif)

## Quick Start
```
let options = {
  json: data,
  fieldsToIncludeFromJson: [
    {
      name: 'name',
      html: '<h2>',
      htmlCloseTag: '</h2>'
    },
    {
      name: 'job',
      html: '<h3>',
      htmlCloseTag: '</h3>'
    }
  ],
  parentDom: document.getElementById('eventList'),
  htmlForItemDom: {
    htmlListStartTag: '<li>',
    htmlListCloseTag: '</li>'
  },
  maxEventsPerPage: 10,
  buttons: {
    first: 'first',
    previous: 'previous',
    next: 'next',
    last: 'last'
  }
}

let pg = new Paginator(options);

```

Simply use the built in addEventListenersToButtons method to attach the first, previous, next, and last buttons to the paginated data

```
pg.addEventListenersToButtons();
```
Finally, draw the items on the page:
```
pg.drawItems();
```
## Define Your JSON Data Source

It can be from whatever source you prefer, but it must be converted to a JSON object before it is passed into Pagify.

```
let data = [{
  name: 'Patrick',
  job: 'Snorkeling'
},
{
  name: 'Stephen',
  job: 'Banker'
},
{
  name: 'Bob',
  job: 'Developer'
}];
```

## Define HTML for parent DOM and child dom elements

This will determine how each field from the data source above appears in your paginated list.


#### parentDom
:octocat: the library will change the name of your parentDom element in order to keep track of the pages.

Root / parent DOM element that contains your list of paginated items.

```
<ul id="eventList" name="pg_1">
</ul>
```

It is safe to say this will usually be a ul, but it could be anything that you want to act as the container for your pages of data.

```
let parentDom = document.getElementById('eventList');
```

#### htmlForItemDom

The html that will wrap around each item in your data set.

Safe to say this will usually be an li, but it could be anything that you want to act as the individual object for each item in your pages.
```
let htmlForItemDom = {
  htmlListStartTag: '<li>',
  htmlListCloseTag: '</li>'
}
```


#### fieldsToIncludeFromJson
Describes which fields you would like to include from your data source, and their associated html / styling.
```
let fieldsToIncludeFromJson = [{
  name: 'title',
  html: '<div class="collapsible-header rounded-t-md center-align h2 georgia">',
  htmlCloseTag: '</div>'

},
{
  name: 'description',
  html: '<div class="collapsible-body rounded-b-lg georgia white"><span class="f1">',
  htmlCloseTag: '</span></div>'
}];

```
## Create Your Buttons

By default, Paginator will automatically find your buttons as long as their id's match what is listed below.

```
<button id="first">First</button>
<button id="previous">Previous</button>
<button id="next">Next</button>
<button id="last">Last</button>
```

You can also choose to pass your button ids in as an object.

```
let buttons = {
  first: 'FirstButtonId',
  previous: 'PreviousButtonId',
  next: 'NextButtonId',
  last: 'LastButtonId'
}
```
