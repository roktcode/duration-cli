import chalk from "chalk";

export default function (source) {
  let newSource = source
  const lineStopIndex = 39
  
  if(source.length > lineStopIndex) {
    const spacesToInsertBeforeLine = 13
    const linesValues = []
    const linesCount = Math.ceil(source.length / lineStopIndex)
    for (let i =0; i < linesCount; i++) {
      const currentLine = source.slice((i * lineStopIndex), (i + 1) * lineStopIndex)
      let newLine = currentLine
      
      if(i > 0) {
         newLine = ` `.repeat(spacesToInsertBeforeLine) + currentLine
      }

      if(i < linesCount - 1) {
        newLine = newLine + chalk.gray("-")
      }
      
      
      linesValues.push(newLine)
    }
    
    newSource = linesValues.join(`\n`)
      
  }
  
	console.log(` ${chalk.bgGreen.bold(` SOURCE `)}    ${chalk.cyan.italic(newSource)}`);
}
