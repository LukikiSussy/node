import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';



const ROOT = "photos";




try {
  const photoRoot = await readdir(ROOT, {withFileTypes: true});
  for (const photoDirent of photoRoot) {

    if(!photoDirent.isDirectory()) {
      continue;
    }

    console.log(`---${photoDirent.name}---`);

    const photos = await readdir(`${ROOT}/${photoDirent.name}`, {withFileTypes: true})


    try {
      const bigDir = await mkdir(`${ROOT}/${photoDirent.name}/big`);
    }
    catch (err) {
    }
    try {
      const smallDir = await mkdir(`${ROOT}/${photoDirent.name}/small`);
    }
    catch (err) {
    }


    for (const photo of photos) {
      const photoPath = `${ROOT}/${photoDirent.name}/${photo.name}`

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

      console.log(photo.name + " hotovo")
    }
    
  }
} 
catch (err) {
console.error(err);
} 