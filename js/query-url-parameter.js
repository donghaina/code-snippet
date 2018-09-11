function queryURLParameter(url){
	var index = url.indexOf('?');
	var query = url.slice(index+1);
	var query_array = query.split('&');
	var query_obj = {};
	query_array.forEach(item=>{
		item_index = item.indexOf('=');
		query_obj[item.slice(0,item_index)] = item.slice(item_index+1);
	})
	return query_obj;
}

var url = 'https://www.google.com/search?q=hello+world&oq=hello+world&aqs=chrome..69i57.3433j0j1&sourceid=chrome&ie=UTF-8';
var query_args = queryURLParameter(url);
console.log(query_args);
