var stats = require('@hharnisc/docker-stats')
var through = require('through2')
var tr = require('@hharnisc/turtle-race')
const { stdin } = require('ttys')

const turtle = tr({
  input: stdin,
  metrics: {
    'cpu percent': {
      min: 0,
      displayMetric: true,
      metricFmt: (metric) => `${metric.toFixed(2)}%`,
    },
    'memory percent': {
      min: 0,
      displayMetric: true,
      metricFmt: (metric) => `${metric.toFixed(2)}%`,
    },
  }
})
turtle.message('Waiting For Stats...')


stats({
  statsinterval: parseInt(process.env.STATS_INTERVAL || 1, 10),
  matchByName: new RegExp(process.env.MATCH_NAME),
  matchByImage: process.env.MATCH_IMAGE ?
    new RegExp(process.env.MATCH_IMAGE) : undefined,
  skipByName: process.env.SKIP_NAME ?
    new RegExp(process.env.SKIP_NAME) : undefined,
  skipByImage: process.env.SKIP_IMAGE ?
    new RegExp(process.env.SKIP_IMAGE) : undefined,
}).pipe(through.obj((container, enc, cb) => {
    const cpuPercent = container.stats.cpu_stats.cpu_usage.cpu_percent
    const memoryPercent = (container.stats.memory_stats.usage / container.stats.memory_stats.limit) * 100;
    turtle
      .metric(container.name, 'cpu percent')
      .push(cpuPercent)
    turtle
      .metric(container.name, 'memory percent')
      .push(memoryPercent)
    turtle.message('')
    return cb();
}));
