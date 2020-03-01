class Paginator {

  constructor(options)
    {
    this.parent_dom = options.parent_dom;
    this.max_events_per_page = options.max_events_per_page;
    this.json = options.json;
    this.fields_to_include_from_json = options.fields_to_include_from_json;
    this.html_for_item_dom = options.html_for_item_dom;
    this.current_page;
    this.item_list = [];
    this.items_on_x_page = [];
    this.total_pages = 1;
    this.li_html;
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
    let sample_list = this.make_sample_list(200);
    this.json = sample_list;
    this.total_pages = this.calculate_total_pages(this.item_list, this.max_events_per_page);
    console.log(this);
    this.draw_page(this.item_list, this.parent_dom);
  }

  draw_items(){
    this.total_pages = this.calculate_total_pages(this.json, this.max_events_per_page);
    this.draw_page(this.json, this.parent_dom);
    console.log(this);
  }

  add_event_listeners_to_buttons(buttons=this.buttons){
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].button.addEventListener('click', () => {
        this.next_page_state(`${buttons[i].event}`);
      })
    }
  }

  make_sample_list(num_events){
    for(let i=1;i<num_events;i++){
      let item_in_list = {
        title: `Item ${[i]}`,
        description: `Description of ${[i]}`
      };
      this.item_list.push(item_in_list);
    }
    console.log(this.item_list)
    return this.item_list;
  }

  items_on_this_page(items, current_page_number, item_limit){
    let item_result = [];
    let past_items;
    if (current_page_number == 1){
      past_items = 0;
    }
    else{
      past_items = (item_limit * current_page_number) - item_limit;
    }
    let count = 0;
    for (let i=past_items; i < items.length; i++){
      if (count < item_limit){
        item_result.push(items[i]);
        count ++;
      }
    }
    this.items_on_x_page = item_result;
    return item_result;
  }

  generate_item_html(item, fields_to_include, list_html){
    let html_list_start_tag = list_html.html_list_start_tag;
    let html_list_close_tag = list_html.html_list_close_tag;
    let html_arr = [];
    let field, value, html, html_close_tag, generated_html;
    html_arr.push(html_list_start_tag);
    for (let i = 0; i < fields_to_include.length; i++){
      field = fields_to_include[i].name;
      value = item[field]
      html = fields_to_include[i].html;
      html_close_tag = fields_to_include[i].html_close_tag;
      html_arr.push(html + value + html_close_tag);
    }
    html_arr.push(html_list_close_tag);
    generated_html = html_arr.join('\n');
    return generated_html;
}

  draw_page(items, parent_dom){
  parent_dom.innerHTML = "";
  for (let i=0; i< items.length; i++){
    if ([i] <= this.max_events_per_page-1){
      let html = this.generate_item_html(items[i], this.fields_to_include_from_json, this.html_for_item_dom);
      parent_dom.innerHTML += html;
    }
  }
}

  calculate_total_pages(items,item_limit){
  let num_pages = 0;
  if (items.length == 0){
    num_pages = 1;
  }
  else {
    num_pages = Math.ceil(items.length/item_limit);
  }
  console.log(items.length);
  console.log(num_pages);
  return num_pages;
}


// Your dom element needs to have a name equal to pg_1
// buttons should have event listners which trigger "this.next_page_state(event_type) on click"
  next_page_state(event_type){
  let re = /_(.*)/ig
  let initial_page = parseInt(re.exec(this.parent_dom.getAttribute('name'))[1])
  this.current_page = initial_page;
  switch(event_type) {
    case 'first':
      this.current_page = 1;
      break;
    case 'previous':
      if (this.current_page == 1){
        this.current_page = 1;
      }
      else{
        this.current_page -= 1;
      }
      break;
    case 'next':
      if (this.current_page == this.total_pages){
        this.current_page = this.total_pages;
      }
      else {
        this.current_page += 1;
        console.log([this.current_page, event_type]);
      }
      break;
    case 'last':
      this.current_page = this.total_pages;
      break;
    default:
      break;
  }
  this.parent_dom.setAttribute("name", `pg_${this.current_page}`);
  this.items_on_x_page = this.items_on_this_page(this.json, this.current_page, this.max_events_per_page);
  this.draw_page(this.items_on_x_page, this.parent_dom);
  let result = {
    items: this.items_on_x_page,
    new_page_number: this.current_page
  }
  return result;
  }

}
