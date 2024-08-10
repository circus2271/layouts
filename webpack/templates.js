const path = require('path')

const templates = [
  {
    template: path.resolve(__dirname, '../src/templates/hbs/pages/index.hbs'),
    filename: 'index.html',
    chunks: ['index']
  },
  {
    template: path.resolve(__dirname, '../src/templates/html/synth/synth.html'),
    filename: 'synth/index.html',
    // inject: false,
    // chunks: 'dd'
    // chunks: ['synth']
    chunks: []
  }
]

templates.forEach(template => {
  // set script attribute to 'defer'
  // that means: load scripts in a non-blocking manner
  // and execute them after DOM is ready
  template.scriptLoading = 'defer'
  // inject scripts before closing body tag
  // template.inject = 'body'
})

module.exports = templates