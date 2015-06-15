var fs = require('fs');
var images = require('images');

fs.readdir('.', function(err, files) {
  var fileMap = {};
  var longestAnimation = 0;

  files = files.filter(function(file) {
    return file.indexOf('.png') !== -1 && file.indexOf('output') === -1 && file.indexOf('orig') === -1;
  });

  var spriteSize = {
    width: images(files[0]).width(),
    height: images(files[0]).height()
  };

  files.forEach(function(file){
    var key = file.split(' ')[0];
    if (!fileMap[key]) {
      fileMap[key] = [];
    }
    fileMap[key].push(file);
    if (fileMap[key].length > longestAnimation) {
      longestAnimation = fileMap[key].length;
    }
  });

  console.log(fileMap, longestAnimation);
  var targetWidth = spriteSize.width * longestAnimation;
  var targetHeight =  spriteSize.height * Object.keys(fileMap).length;
  console.log(targetWidth, targetHeight);
  var output = images(__dirname + '/orig.png').resize(targetWidth, targetHeight);
  var y = 0;
  for (var key in fileMap) {
    if (fileMap.hasOwnProperty(key)) {
      fileMap[key].forEach(function(file, index) {
        output.draw(images(file), index * spriteSize.width, y * spriteSize.height);
      });
      y++;
    }
  }

  output.save('output.png', {
    operation: 50
  });
});
