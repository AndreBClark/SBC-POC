import orderBy from 'lodash.orderby';

export const extract = {
    uniqueColors: (pixels) => {
        let newColors = {};
        for (var i = 0; i < pixels.length; i += 4) {
            var color = `${pixels[i]}-${pixels[i + 1]}-${pixels[i + 2]}`;
            if (newColors[color]) {
                newColors[color].value++
            } else {
                newColors[color] = {
                    value: 1,
                    rgb: `${pixels[i]}, ${pixels[i + 1]}, ${pixels[i + 2]}`,
                    key: color,
                    red: pixels[i],
                    green: pixels[i+1],
                    blue: pixels[i+2]
                }
            }
        }
        let newColorArray = [];
        for ( var newColor in newColors){
          newColorArray.push({
            ...newColors[newColor]
          })
        }
        return newColorArray;
    },
    sortedColors: (colors) => {
        return orderBy(colors, 'value', 'desc');
    },
    clusterMatches: (tolerance, index, clusteredAverages, element) => {
        let redDiff = Math.abs(clusteredAverages[index].red - element.red)
        let greenDiff = Math.abs(clusteredAverages[index].green - element.green)
        let blueDiff = Math.abs(clusteredAverages[index].blue - element.blue)

        return redDiff < tolerance && greenDiff < tolerance && blueDiff < tolerance ? true : false;
    },
    findClusterAverages(clusteredColors){
        let clusteredAverages = [];
        clusteredColors.forEach((array, index) => {
          let redSum = 0;
          let greenSum = 0;
          let blueSum = 0;
  
          for( var item in array ) {
              redSum += array[item].red;
              greenSum += array[item].green;
              blueSum += array[item].blue;
          }
          
          let count = array.length;
          
          let redAvg = redSum / count;
          let greenAvg = greenSum / count;
          let blueAvg = blueSum / count;
          clusteredAverages[index] = {
              red: redAvg, 
              green: greenAvg, 
              blue: blueAvg, 
              rgb: `${Math.round(redAvg)}, ${Math.round(greenAvg)}, ${Math.round(blueAvg)}`
            };
        });
  
      return clusteredAverages;
    },
    rgbToHexadecimal: (red,green,blue) => {
        let redHex = red.toString(16);
        let greenHex = green.toString(16);
        let blueHex = blue.toString(16);

        if (redHex.length === 1) {
            redHex = '0' + redHex;
        }
        if (greenHex.length === 1) {
            greenHex = '0' + greenHex;
        }
        if (blueHex.length === 1) {
            blueHex = '0' + blueHex;
        }

        return '#' + redHex + greenHex + blueHex;
    }
}