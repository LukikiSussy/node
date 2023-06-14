import sharp from 'sharp';
import { readdir, mkdir, writeFile } from 'node:fs/promises';



const ROOT = "photos";

var photoList = [];




try {
  const photoRoot = await readdir(ROOT, {withFileTypes: true});
  for (const photoDirent of photoRoot) {

    if(!photoDirent.isDirectory()) {
      continue;
    }

    console.log(`---${photoDirent.name}---`);

    const photos = await readdir(`${ROOT}/${photoDirent.name}`, {withFileTypes: true});


    const bigDir = await mkdir(`${ROOT}/${photoDirent.name}/big`, { recursive: true });
    const smallDir = await mkdir(`${ROOT}/${photoDirent.name}/small`, { recursive: true });

    for (const photo of photos) {
      const photoPath = `${ROOT}/${photoDirent.name}/${photo.name}`;

      if(photo.isDirectory()) {
        continue;
      }

      sharp(photoPath)
        .resize(1200, 1200)
        .toFile(`${ROOT}/${photoDirent.name}/big/${photo.name}`, function(err) {
      });

      sharp(photoPath)
        .resize(600, 600)
        .toFile(`${ROOT}/${photoDirent.name}/small/${photo.name}`, function(err) {
      });

      photoList.push(`../${ROOT}/${photoDirent.name}/small/${photo.name}`);

      console.log(`${ROOT}/${photoDirent.name}/small/${photo.name}`);
    }
  }

  var photoString = "";

  for (let i = 0; i < photoList.length; i++) {

    photoString = photoString + `"${photoList[i]}", `;
    
  }

  var photoString = "var photos = [" + photoString + "];";

  const List = writeFile('./html/photoList.js', photoString);

} 
catch (err) {
console.error(err);
} 