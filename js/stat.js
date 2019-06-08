'use strict';

var Cloud = {
  X: 100,
  Y: 10,
  WIDTH: 420,
  HEIGHT: 270,
  COLOR: 'rgb(255, 255, 255)',
  SHADOW_OFFSET: 10,
  SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)',
  SHADOW_RESET: 'rgba(0, 0, 0, 0)'
};

var Text = {
  PADDING: 10,
  LINE_HEIGHT: 20,
  COLOR: 'rgb(0, 0, 0)',
  FONT: 'normal 16px PT Mono',
  BASELINE: 'hanging'
};

var CloudTitle = {
  X: 125,
  Y: 30,
  content: 'Ура вы победили!\nСписок результатов:'
};

var Bar = {
  X: 150,
  Y: 75,
  GAP: 50,
  MAX_HEIGHT: 150,
  WIDTH: 40,
  COLOR_FOR_YOU: 'rgb(255, 0, 0)'
};

var renderCloud = function (ctx) {
  ctx.shadowColor = Cloud.SHADOW_COLOR;
  ctx.shadowOffsetX = Cloud.SHADOW_OFFSET;
  ctx.shadowOffsetY = Cloud.SHADOW_OFFSET;
  ctx.shadowBlur = 0;
  ctx.fillStyle = Cloud.COLOR;
  ctx.fillRect(Cloud.X, Cloud.Y, Cloud.WIDTH, Cloud.HEIGHT);
  ctx.shadowColor = Cloud.SHADOW_RESET; // shadow off (!)
};

var renderCloudTitle = function (ctx) {
  ctx.fillStyle = Text.COLOR;
  ctx.font = Text.FONT;
  ctx.textBaseline = Text.BASELINE;

  var lines = CloudTitle.content.split('\n');

  for (var i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], CloudTitle.X, CloudTitle.Y + Text.LINE_HEIGHT * i);
  }
};

var renderBarText = function (ctx, text, index, padding) {
  ctx.fillStyle = Text.COLOR;
  ctx.font = Text.FONT;
  ctx.textBaseline = Text.BASELINE;
  ctx.fillText(text, Bar.X + (Bar.GAP + Bar.WIDTH) * index, Bar.Y + padding);
};

var renderBar = function (ctx, index, padding, height) {
  ctx.fillRect(Bar.X + (Bar.GAP + Bar.WIDTH) * index, Bar.Y + padding + Text.LINE_HEIGHT, Bar.WIDTH, height);

};

var renderBarChart = function (ctx, names, times) {
  var maxTime = Math.max.apply(null, times);

  for (var i = 0; i < names.length; i++) {
    var time = Math.floor(times[i]);
    var name = names[i];
    var barHeight = Math.floor((Bar.MAX_HEIGHT * time) / maxTime);
    var barTopPadding = Bar.MAX_HEIGHT - barHeight;
    var colorForOther = 'hsl(240, ' + Math.floor(Math.random() * 100) + '%, 50%)';

    renderBarText(ctx, time, i, barTopPadding);
    ctx.fillStyle = name === 'Вы' ? Bar.COLOR_FOR_YOU : colorForOther;
    renderBar(ctx, i, barTopPadding, barHeight);
    renderBarText(ctx, name, i, Bar.MAX_HEIGHT + Text.LINE_HEIGHT + Text.PADDING);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx);
  renderCloudTitle(ctx);
  renderBarChart(ctx, names, times);
};