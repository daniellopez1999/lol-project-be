import * as fs from 'fs';
import * as path from 'path';
// Define the directory path where item images are stored
const imagesDir = path.resolve(
  __dirname,
  '../assets/dragontail-15.1.1/dragontail-15.1.1/15.1.1/img/champion'
);

// Map to store item images by their ID
const championImagesMap: { [key: string]: string } = {};

// Read all files in the images directory and map item IDs to image paths
fs.readdirSync(imagesDir).forEach((file) => {
  const championName = file.split('.')[0]; // Assuming the filename includes the champion's name
  championImagesMap[championName] = path.join(imagesDir, file);
});
export class ChampionsHelper {
  private static helper = new ChampionsHelper();
  constructor() {}

  public static getImageFromChampion(champion: string): string | undefined {
    console.log(champion);
    const imagePath = championImagesMap[champion];
    console.log({ imagePath });
    if (imagePath) {
      // Read and convert to base64
      const imageBuffer = fs.readFileSync(imagePath);
      return imageBuffer.toString('base64');
    }
    return undefined;
  }
}
