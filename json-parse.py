import json

with open('posts.json','r') as f:
	data = json.load(f)
	post_list_array = []
	post_list = data['data']
	for post in post_list:
		post_labels = []
		for label in post['post_label']:
			post_labels.append(label['label']['title'])
		post_list_array.append({
			'url': post['link'],
			'keywords': ','.join(post_labels)
		})
	print(post_list_array)
