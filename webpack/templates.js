const path = require('path')

const templates = [
  {
    template: path.resolve(__dirname, '../src/hbs/pages/index.hbs'),
    filename: 'index.html',
  }
]

templates.forEach(template => {
  // set script attribute to 'defer'
  // that means: load scripts in a non-blocking manner
  // and execute them after DOM is ready
  template.scriptLoading = 'defer'
  // inject scripts before closing body tag
  template.inject = 'body'
})

module.exports = templates