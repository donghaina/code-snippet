function queryURLParameter(url){
	var query_obj = {};
	var regx = /([^&=?]+)=([^&=?]+)/g;
	url.replace(regx,function(){
		query_obj[arguments[1]] = arguments[2];
	})
	return query_obj;
}

var url = 'https://www.google.com/search?q=%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95%E8%A7%86%E9%A2%91&oq=%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95%E8%A7%86%E9%A2%91&aqs=chrome..69i57.9990j0j4&sourceid=chrome&ie=UTF-8';
// queryURLParameter(url);
var query_args = queryURLParameter(url);
console.log(query_args);
