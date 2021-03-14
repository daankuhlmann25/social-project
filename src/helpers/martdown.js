function para(text, line) {
  let trimmed = line.trim();
  if (/^<\/?(ul|ol|li|h|p|bl)/i.test(trimmed)) {
      return `\n${line}`
  }
  return `\n<p>${trimmed}</p>`
}

function ulList(text, item) {
    return `\n<ul>\n\t<li>${item.trim()}</li>\n</ul>`
}

function olList(text, item) {
    return `\n<ol>\n\t<li>${item.trim()}</li>\n</ol>`
}

// function blockquote(text, tmp, item) {
//     return `\n<blockquote>${item.trim()}</blockquote>`
// }

// function header(text, chars, content) {
//     const level = chars.length
//     return `<h${level}>${content.trim()}</h${level}>`
// }

export const parseMartDown = (md) => {
  
  let rules = [
    // {regex: /(#+)(.*)/g, replacement: header},                                         // headers
    // {regex: /!\[([^[]+)\]\(([^)]+)\)/g, replacement: '<img src=\'$2\' alt=\'$1\'>'},   // image
    // {regex: /\[([^[]+)\]\(([^)]+)\)/g, replacement: '<a href=\'$2\'>$1</a>'},          // hyperlink
    {regex: /(\*)([^\s].*?)\1/g, replacement: '<strong>$2</strong>'},                       // bold
    {regex: /(_)(.*?)\1/g, replacement: '<em>$2</em>'},                                // emphasis
    {regex: /(-)([^\s].*?)\1/g, replacement: '<del>$2</del>'},                         // del
    // {regex: /:"(.*?)":/g, replacement: '<q>$1</q>'},                                   // quote
    // {regex: /`(.*?)`/g, replacement: '<code>$1</code>\n'},                             // inline code
    {regex: /\n[*|-]\s(.*)/g, replacement: ulList},                                    // ul lists
    {regex: /\n#\s(.*)/g, replacement: olList},                                   // ol lists
    // {regex: /\n(&gt;|>)(.*)/g, replacement: blockquote},                               // blockquotes
    {regex: /\n[-|\u2013|\u2014|\u2014|\u2E3A|\u2E3B]{2,}/g, replacement: '\n<hr />\n'},  // horizontal rule
    {regex: /\n(.+)/g, replacement: para},                                             // add paragraphs
    {regex: /<\/ul>\s?<ul>/g, replacement: ''},                                        // fix extra ul
    {regex: /<\/ol>\s?<ol>/g, replacement: ''},                                        // fix extra ol
    {regex: /<\/blockquote><blockquote>/g, replacement: '\n'}                          // fix extra blockquote
  ]

  md = `\n${md}\n`
  rules.forEach( (rule) => {
      md = md.replace(rule.regex, rule.replacement)
  })

  return md.trim()
  
}


export const parseNewLines = (md) => {
  return md.trim().replace(/\n/g, "<br>")
}