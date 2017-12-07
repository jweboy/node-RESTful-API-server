const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, printf } = format

const formatter = printf(info => `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`)

exports.logger = createLogger({ //! 有需求再加logger file
  format: combine(
    label({ label: 'logger' }),
    timestamp(),
    formatter
  ),
  transports: [
    new transports.Console()
  //   new transports.File({
  //     filename: 'combined.log',
  //     level: 'info'
  //   })
  ]
})
