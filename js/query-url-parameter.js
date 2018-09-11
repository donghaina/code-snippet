function queryURLParameter(url){
	var query_obj = {};
	var index = url.indexOf('?');
	if(index===-1){
		return query_obj;
	}
	var query = url.slice(index+1);
	var query_array = query.split('&');
	
	query_array.forEach(item=>{
		item_index = item.indexOf('=');
		query_obj[item.slice(0,item_index)] = item.slice(item_index+1);
	})
	return query_obj;
}

var url = 'https://www.google.com/search';
var query_args = queryURLParameter(url);
console.log(query_args);
