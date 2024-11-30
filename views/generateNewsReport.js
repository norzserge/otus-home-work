const generateNewsReport = (news) =>
  '<!DOCTYPE html>' +
  '<html lang="ru">' +
    '<head>' +
      '<meta charset="utf-8">' +
      '<title>News report</title>' +
    '</head>' +
    '<body>' +
      news +
    '</body>' +
  '</html>'
;

module.exports = {
  generateNewsReport,
};