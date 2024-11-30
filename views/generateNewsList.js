const generateNewsList = (list) => {
  const items = list.map((item) => {
    return '<li><a href="' + item.url + '">' + item.title + '</a></li>';
  }).join('');

  return '<ul>' + items + '</ul>';
}

module.exports = {
  generateNewsList,
}