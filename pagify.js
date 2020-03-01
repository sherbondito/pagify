class Paginator {

  constructor(options)
    {
    this.parentDom = options.parentDom;
    this.maxEventsPerPage = options.maxEventsPerPage;
    this.json = options.json;
    this.fieldsToIncludeFromJson = options.fieldsToIncludeFromJson;
    this.htmlForItemDom = options.htmlForItemDom;
    this.currentPage;
    this.itemList = [];
    this.itemsOnXPage = [];
    this.totalPages = 1;
    this.liHtml;
    this.first = {
      button: document.getElementById(options.buttons.first),
      event: 'first'
    };
    this.previous = {
      button: document.getElementById(options.buttons.previous),
      event: 'previous'
    };
    this.next = {
      button: document.getElementById(options.buttons.next),
      event: 'next'
    };
    this.last = {
      button: document.getElementById(options.buttons.last),
      event: 'last'
    };
    this.buttons = [this.first, this.previous, this.next, this.last];
  }


  test(){
    let sampleList = this.makeSampleList(200);
    this.json = sampleList;
    this.totalPages = this.calculateTotalPages(this.itemList, this.maxEventsPerPage);
    console.log(this);
    this.drawPage(this.itemList, this.parentDom);
  }

  drawItems(){
    this.totalPages = this.calculateTotalPages(this.json, this.maxEventsPerPage);
    this.drawPage(this.json, this.parentDom);
    console.log(this);
  }

  addEventListenersToButtons(buttons=this.buttons, parentDom=this.parentDom){
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].button.addEventListener('click', () => {
        this.nextPageState(`${buttons[i].event}`);
      })
    }
    parentDom.setAttribute("name", "pg_1");
  }

  makeSampleList(numEvents){
    for(let i=1;i<numEvents;i++){
      let itemInList = {
        title: `Item ${[i]}`,
        description: `Description of ${[i]}`
      };
      this.itemList.push(itemInList);
    }
    console.log(this.itemList)
    return this.itemList;
  }

  itemsOnThisPage(items, currentPageNumber, itemLimit){
    let itemResult = [];
    let pasItems;
    if (currentPageNumber == 1){
      pasItems = 0;
    }
    else{
      pasItems = (itemLimit * currentPageNumber) - itemLimit;
    }
    let count = 0;
    for (let i=pasItems; i < items.length; i++){
      if (count < itemLimit){
        itemResult.push(items[i]);
        count ++;
      }
    }
    this.itemsOnXPage = itemResult;
    return itemResult;
  }

  generateItemHtml(item, fieldsToInclude, listHtml){
    let htmlListStartTag = listHtml.htmlListStartTag;
    let htmlListCloseTag = listHtml.htmlListCloseTag;
    let htmlArr = [];
    let field, value, html, htmlCloseTag, generatedHtml;
    htmlArr.push(htmlListStartTag);
    for (let i = 0; i < fieldsToInclude.length; i++){
      field = fieldsToInclude[i].name;
      value = item[field]
      html = fieldsToInclude[i].html;
      htmlCloseTag = fieldsToInclude[i].htmlCloseTag;
      htmlArr.push(html + value + htmlCloseTag);
    }
    htmlArr.push(htmlListCloseTag);
    generatedHtml = htmlArr.join('\n');
    return generatedHtml;
}

  drawPage(items, parentDom){
  parentDom.innerHTML = "";
  for (let i=0; i< items.length; i++){
    if ([i] <= this.maxEventsPerPage-1){
      let html = this.generateItemHtml(items[i], this.fieldsToIncludeFromJson, this.htmlForItemDom);
      parentDom.innerHTML += html;
    }
  }
}

  calculateTotalPages(items,itemLimit){
  let numPages = 0;
  if (items.length == 0){
    numPages = 1;
  }
  else {
    numPages = Math.ceil(items.length/itemLimit);
  }
  console.log(items.length);
  console.log(numPages);
  return numPages;
}


// Your dom element needs to have a name equal to pg_1
// buttons should have event listners which trigger "this.nextPageState(eventType) on click"
  nextPageState(eventType){
  let re = /_(.*)/ig
  let initialPage = parseInt(re.exec(this.parentDom.getAttribute('name'))[1])
  this.currentPage = initialPage;
  switch(eventType) {
    case 'first':
      this.currentPage = 1;
      break;
    case 'previous':
      if (this.currentPage == 1){
        this.currentPage = 1;
      }
      else{
        this.currentPage -= 1;
      }
      break;
    case 'next':
      if (this.currentPage == this.totalPages){
        this.currentPage = this.totalPages;
      }
      else {
        this.currentPage += 1;
        console.log([this.currentPage, eventType]);
      }
      break;
    case 'last':
      this.currentPage = this.totalPages;
      break;
    default:
      break;
  }
  this.parentDom.setAttribute("name", `pg_${this.currentPage}`);
  this.itemsOnXPage = this.itemsOnThisPage(this.json, this.currentPage, this.maxEventsPerPage);
  this.drawPage(this.itemsOnXPage, this.parentDom);
  let result = {
    items: this.itemsOnXPage,
    newPageNumber: this.currentPage
  }
  return result;
  }

}
