const path = require('path')
const { sqip } = require('sqip')
const { encode } = require('js-base64')

class SqipWebpackPlugin {
  constructor(options) {
    // this.projectRoot = options.projectRoot
    this.mediaRoot = options.mediaRoot
    this.name = 'SqipWebpackPlugin'
    this.htmlAttributeRegexp = /sqip-webpack-plugin-src=["'](.+?)\.(jpg|webp|jpeg|png|svg)['"]/gi
    this.imageUrlRegexp = /(?<=sqip-webpack-plugin-src=["'])(.+?)\.(jpg|webp|jpeg|png|svg)/gi
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(
      this.name,
      (compilation) => {
        const [HtmlWebpackPlugin] = compiler.options.plugins.filter(
          (plugin) => plugin.constructor.name === 'HtmlWebpackPlugin')
        const hook = HtmlWebpackPlugin.constructor.getHooks(compilation).beforeEmit

        hook.tapPromise(
          this.name,
          async (htmlPluginData) => {
            let { html } = htmlPluginData
            const attributes = this.getAttributes(html)
            if (Array.isArray(attributes)) {
              const promises = await attributes.map(async attribute => {
                const { mode } = compiler.options
                if (mode !== 'production') {
                  const placeholder = this.createDefaultPlaceholder()
                  return placeholder
                }

                const imagePath = this.getImagePath(attribute)
                console.log(`Making sqip placeholder:\n${imagePath}`)
                return sqip({
                  input: imagePath,
                  plugins: [
                    { name: 'primitive', options: { numberOfPrimitives: 50, mode: 1 } },
                    'svgo',
                    'data-uri'
                  ]
                }).then(result => result.metadata.dataURIBase64)
              })

              const convertedImages = await Promise.all(promises)
              convertedImages.forEach((converted, i) => {
                const currentAttribute = attributes[i]
                const newAttribute = this.createSrcAttribute(converted)
                html = html.replace(currentAttribute, newAttribute)
              })
            }

            htmlPluginData.html = html
            return htmlPluginData
          }
        )
      }
    )
  }

  getAttributes(html) {
    return html.match(this.htmlAttributeRegexp)
  }

  createDefaultPlaceholder() {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200">
        <rect fill="#eee" width="300" height="200"/>
        <text fill="rgba(0,0,0,0.67)" font-family="sans-serif" font-size="30" dy="10.5" font-weight="normal" x="50%" y="50%" text-anchor="middle">
          Placeholder
        </text>
      </svg>`

    const encodedPlaceholder = encode(svg);
    const dataURI = `data:image/svg+xml;base64,${encodedPlaceholder}`

    return dataURI
  }

  getImagePath(attribute) {
    const [parsedPath] = attribute.match(this.imageUrlRegexp)
    return path.join(this.mediaRoot, parsedPath)
  }

  createSrcAttribute(dataURI) {
    return `src='${dataURI}'`
  }
}

module.exports = SqipWebpackPlugin